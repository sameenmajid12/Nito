const express = require("express");
const userRouter = express.Router();
const User = require("../models/UserModel");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const Conversation = require("../models/ConversationModel");
const { getEmbeddings, computeAverageVector } = require("../utils/vectors");
userRouter.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("Getting user...");
    const userId = req.user._id;
    const user = await User.findById(userId).populate([
      "school",
      {
        path: "revealedUsers",
        populate: { path: "user", select: "fullname profilePic username" },
      },
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
    const { password, vectorTags, vectorTagsAverage, ...safeUser } = user._doc;
    safeUser.revealedUsers.sort(
      (a, b) => new Date(b.matchTime) - new Date(a.matchTime)
    );

    safeUser.savedConversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt
        ? new Date(a.lastMessage.createdAt)
        : 0;
      const bTime = b.lastMessage?.createdAt
        ? new Date(b.lastMessage.createdAt)
        : 0;
      return bTime - aTime;
    });
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
      (revealed) => revealed.user && revealed.user.equals(targetObjectId)
    );
    if (!isRevealed) {
      return res
        .status(403)
        .json({ message: "User is not a connection or not revealed" });
    }
    const userToRetrieve = await User.findById(userToRetreieveId).select(
      "fullname user profilePic socialMedia revealedUsers bio year major tags username votedPolls"
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
userRouter.get("/me/reveal-finalized", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(`User id in reveal finalized ${userId}`);
    const updatedUserFields = await User.findById(userId)
      .select(
        "revealedUsers lastPairStatus archivedConversations savedConversations currentConversation"
      )
      .populate([
        {
          path: "revealedUsers",
          options: { sort: { matchTime: 1 } },
          populate: { path: "user", select: "fullname profilePic username" },
        },
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
      ]);
    if (!updatedUserFields) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ updatedUserFields });
  } catch (e) {
    console.error(e);
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
      {
        path: "revealedUsers",
        populate: { path: "user", select: "fullname profilePic username" },
      },
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
    const { password, vectorTags, vectorTagsAverage, ...safeUser } =
      updatedUser._doc;
    safeUser.revealedUsers.sort(
      (a, b) => new Date(b.matchTime) - new Date(a.matchTime)
    );

    safeUser.savedConversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt
        ? new Date(a.lastMessage.createdAt)
        : 0;
      const bTime = b.lastMessage?.createdAt
        ? new Date(b.lastMessage.createdAt)
        : 0;
      return bTime - aTime;
    });

    res.status(200).json({ updatedUser: safeUser });
  } catch (error) {
    console.error("Error updating the user: ", error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Input" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch("/update-tags", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { tags: newTags } = req.body;
    const user = await User.findById(userId).select("tags vectorTags vectorTagsAverage");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const removedTags = user.tags.filter((t) => !newTags.includes(t));
    const addedTags = newTags.filter((t) => !user.tags.includes(t));
    if (removedTags.length > 0) {
      user.vectorTags = user.vectorTags.filter(
        (t) => !removedTags.includes(t.tag)
      );
    }
    if (addedTags.length > 0) {
      const tagEmbeddings = await getEmbeddings(addedTags);
      if (tagEmbeddings) {
        addedTags.forEach((tag, i) => {
          user.vectorTags.push({ tag, embedding: tagEmbeddings[i] });
        });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    user.tags = newTags;
    user.vectorTagsAverage = computeAverageVector(user.vectorTags);
    await user.save();
    return res.status(200).json({ updatedTags: user.tags });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch("/remove-connection", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { userToRemoveId } = req.body;
    const user = await User.findById(userId);
    const connection = await User.findById(userToRemoveId);
    if (!user || !connection) {
      res.status(404).json({ message: "User not found" });
    }

    user.revealedUsers = user.revealedUsers.filter(
      (r) => !r.user.equals(connection._id)
    );
    connection.revealedUsers = connection.revealedUsers.filter(
      (r) => !r.user.equals(user._id)
    );
    const conversation = await Conversation.findOne({
      $or: [
        { user1: user._id, user2: connection._id },
        { user1: connection._id, user2: user._id },
      ],
    });
    if (conversation) {
      user.savedConversations = user.savedConversations.filter(
        (c) => !c.equals(conversation._id)
      );
      user.archivedConversations.push(conversation._id);
      connection.savedConversations = connection.savedConversations.filter(
        (c) => !c.equals(conversation._id)
      );
      connection.archivedConversations.push(conversation._id);
    }
    await user.save();
    await connection.save();
    res.status(200).json({
      savedConversations: user.savedConversations,
      revealedUsers: user.revealedUsers,
      archivedConversations: user.archivedConversations,
    });
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

userRouter.delete("/unblock", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { userToUnblockUsername } = req.body;
    const user = await User.findById(userId);
    const userToUnblock = await User.findOne({
      username: userToUnblockUsername,
    });
    if (!user || !userToUnblock) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.blockedUsers.some((id) => id.equals(userToUnblock._id))) {
      return res.status(400).json({ message: "User is not blocked" });
    }
    user.blockedUsers = user.blockedUsers.filter(
      (b) => !b.equals(userToUnblock._id)
    );
    await user.save();
    res.status(200).json({ blockedUsers: user.blockedUsers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.post("/verify-password", verifyToken, async (req, res, next) => {
  try {
    console.log("Verifying password..");
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Password verified successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.put("/pair-status/viewed", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.lastPairStatus) {
      return res.status(400).json({ message: "No last pair status to update" });
    }
    user.lastPairStatus.viewed = true;
    await user.save();
    res.status(200).json({ updatedLastPairStatus: user.lastPairStatus });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { userRouter };
