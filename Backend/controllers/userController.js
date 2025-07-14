const express = require("express");
const userRouter = express.Router();
const User = require("../models/UserModel");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
userRouter.get("/me", verifyToken, async (req, res) => {
  try {
    console.log("Getting user...");
    const userId = req.user._id;
    const user = await User.findById(userId).populate(["school"]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...safeUser } = user._doc;
    res.status(200).json({ user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
userRouter.patch("/update", verifyToken, async (req, res, next) => {
  try {
    console.log("Updating user...");
    const userId = req.user._id;
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      new: true,
    }).populate(["school"]);
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

module.exports = { userRouter };
