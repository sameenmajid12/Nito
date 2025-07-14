const express = require("express");
const app = express();
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.js");
const verifyToken = require("../middleware/verifyToken.js");
authRouter.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const newUserInfo = req.body;
    if (
      !newUserInfo.password ||
      !newUserInfo.fullname ||
      !newUserInfo.email ||
      !newUserInfo.username
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "Profile picture missing" });
    }
    const existingUser = await User.findOne({ email: newUserInfo.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email is already used for another account!" });
    }
    const fileUploadParams = {
      Bucket: "nito-s3-image-bucket",
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    await s3.send(new PutObjectCommand(fileUploadParams));

    const fileUrl = `https://${fileUploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.originalname}`;
    const encryptedPassword = await bcrypt.hash(newUserInfo.password, 10);
    newUserInfo.password = encryptedPassword;
    newUserInfo.profilePic = fileUrl;
    newUserInfo.tags = JSON.parse(newUserInfo.tags);
    newUserInfo.school = JSON.parse(newUserInfo.school);

    const user = await User.create(newUserInfo);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    if (!accessToken || !refreshToken) {
      await User.deleteOne({ username: newUserInfo.username });
      return res.status(500).json({ message: "Token generation failed" });
    }
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log("Loggin in..");
    const userInfo = req.body;
    const user = await User.findOne({
      email: userInfo.email,
      school: userInfo.school._id,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(
      userInfo.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(403)
        .json({ message: "Incorrect password, please try again" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/refresh-token", async (req, res) => {
  console.log("Refreshing token...");
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    const newAccessToken = jwt.sign(
      { _id: decoded._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired refresh token" });
  }
});

authRouter.get("/test-token", verifyToken, (_, res) => {
  res.status(200).json({ message: "Token valid" });
});


module.exports = { authRouter };
