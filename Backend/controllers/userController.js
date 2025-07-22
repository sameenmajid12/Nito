const express = require("express");
const userRouter = express.Router();
const User = require("../models/UserModel");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
userRouter.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("Getting user...");
    const userId = req.user._id;
    const user = await User.findById(userId).populate([
      "school",
      { path: "revealedUsers", select: "fullname profilePic username" },
      {
        path: "savedConversations",
        populate: [
          { path: "user1", select: "fullname profilePic username" },
          { path: "user2", select: "fullname profilePic username" },
          { path: "lastMessage" },
          {
            path: "lastReadMessages",
            populate: [
              { path: "user1", model: "Message" },
              { path: "user2", model: "Message" },
            ],
          },
        ],
      },
      {
        path: "currentConversation",
        populate: [
          { path: "user1", select: "username" },
          { path: "user2", select: "username" },
          { path: "lastMessage" },
          { path: "lastReadMessages.user1", model: "Message" },
          { path: "lastReadMessages.user2", model: "Message" },
        ],
      },
      ,
    ]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...safeUser } = user._doc;
    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.get("/:userId", verifyToken, async (req, res, next) => {
  try {
    const { userId: userToRetreieveId } = req.params;
    const userId = req.user._id;
    const user = await User.findById(userId).select("revealedUsers").lean();
    if (!user || !user.revealedUsers) {
      return res.status(404).json({ message: "User not found" });
    }
    const targetObjectId = new mongoose.Types.ObjectId(userToRetreieveId);

    const isRevealed = user.revealedUsers.some(
      (revealedUserId) =>
        revealedUserId && revealedUserId.equals(targetObjectId)
    );

    if (!isRevealed) {
      return res
        .status(403)
        .json({ message: "User is not a connection or not revealed" });
    }
    const userToRetrieve = await User.findById(userToRetreieveId).select(
      "fullname user profilePic socialMedia revealedUsers bio year major tags username"
    );
    if (!userToRetrieve) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userToRetrieve });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch("/update", verifyToken, async (req, res, next) => {
  try {
    console.log("Updating user...");
    const userId = req.user._id;
    if (req.body.password && req.body.password.length > 8) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      new: true,
    }).populate([
      "school",
      { path: "revealedUsers", select: "fullname profilePic username" },
      {
        path: "savedConversations",
        populate: [
          { path: "user1", select: "fullname profilePic username" },
          { path: "user2", select: "fullname profilePic username" },
          { path: "lastMessage" },
          { path: "lastReadMessages.user1", model: "Message" },
          { path: "lastReadMessages.user2", model: "Message" },
        ],
      },
      {
        path: "currentConversation",
        populate: [
          { path: "user1", select: "username" },
          { path: "user2", select: "username" },
          { path: "lastMessage" },
          { path: "lastReadMessages.user1", model: "Message" },
          { path: "lastReadMessages.user2", model: "Message" },
        ],
      },
      ,
    ]);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating the user: ", error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Input" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch("/remove-connection", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { connectionId } = req.body;
    const user = await User.findById(userId);
    const connection = await User.findById(connectionId);
    if (!user || !connection) {
      res.status(404).json({ message: "User not found" });
    }
    user.connections = user.connections.filter((c) => !c.equals(connectionId));
    connection.connections = connection.connections.filter(
      (c) => !c.equals(userId)
    );
    await user.save();
    await connection.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch(
  "/update-profilePic",
  verifyToken,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      console.log("Updating profile picture");
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const fileUploadParams = {
        Bucket: "nito-s3-image-bucket",
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(fileUploadParams));
      const newFileUrl = `https://${fileUploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.originalname}`;
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.profilePic = newFileUrl;
      await user.save();
      res.status(200).json({ profilePic: newFileUrl });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

userRouter.patch("/remove-connection", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { userToRemoveUsername } = req.body;
    const user = await User.findById(userId).populate(["connections"]);
    const userToRemove = await User.findOne({ username: userToRemoveUsername });
    if (!user || !userToRemove) {
      return res.status(404).json({ message: "User not found" });
    }
    user.connections = user.connections.filter(
      (connection) => !connection._id.equals(userToRemove._id)
    );
    userToRemove.connections = userToRemove.connections.filter(
      (connection) => !connection._id.equals(user._id)
    );
    await user.save();
    await userToRemove.save();
    res.status(200).json({ connections: user.connections });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/block", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { userToBlockUsername } = req.body;
    const user = await User.findById(userId);
    const userToBlock = await User.findOne({ username: userToBlockUsername });
    if (!user || !userToBlock) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.blockedUsers.some((id) => id.equals(userToBlock._id))) {
      return res.status(400).json({ message: "User already blocked" });
    }
    user.blockedUsers.push(userToBlock._id);
    await user.save();
    res.status(200).json({ blockedUsers: user.blockedUsers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { userRouter };
