const express = require("express");
const app = express();
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { sendVerificationEmail } = require("../utils/sendEmail.js");
const VerificationCode = require("../models/VerificationCodeModel.js");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.js");
const verifyToken = require("../middleware/verifyToken.js");
const { getEmbeddings, computeAverageVector } = require("../utils/vectors.js");
const crypto = require("crypto");
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
    if (newUserInfo.tags && newUserInfo.tags.length > 0) {
      const embeddings = await getEmbeddings(newUserInfo.tags);
      if (!embeddings) {
        return res
          .status(500)
          .json({ message: "Failed to generate embeddings" });
      }
      newUserInfo.vectorTags = newUserInfo.tags.map((tag, i) => ({
        tag,
        embedding: embeddings[i],
      }));
      newUserInfo.vectorTagsAverage = computeAverageVector(
        newUserInfo.vectorTags
      );
    }
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
    if (!userInfo.school._id) {
      return res.status(400).json({ message: "School has to be selected" });
    }
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
authRouter.post("/send-verification", async (req, res) => {
  try {
    console.log("Sending verificaiton email...");
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "No email inserted" });
    }
    const existingVerificationCode = await VerificationCode.findOne({ email });
    if (existingVerificationCode) {
      await VerificationCode.deleteOne({ email });
    }
    await sendVerificationEmail(email);
    res.status(200).json({ message: "Email sent" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error sending email" });
  }
});
authRouter.post("/verify-email", async (req, res) => {
  try {
    console.log("Verifying verification code");
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: "Email or code missing" });
    }
    const verificationCode = await VerificationCode.findOne({ email });
    if (!verificationCode) {
      await sendVerificationEmail(email);
      return res
        .status(404)
        .json({ message: "Verification code not found, new code sent" });
    }
    if (verificationCode.expiresAt < new Date()) {
      await VerificationCode.deleteOne({ email });
      await sendVerificationEmail(email);
      return res
        .status(400)
        .json({ message: "Verification code expired, new code sent" });
    }
    const checkCode = await bcrypt.compare(code, verificationCode.code);
    if (!checkCode) {
      return res.status(400).json({ message: "Incorrect verification code" });
    }
    await VerificationCode.deleteOne({ email });
    const { type } = req.body;
    if (type === "registration") {
      res.status(200).json({ message: "Email verified" });
    } else if (type === "passwordReset") {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetToken = hashedToken;
      user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
      await user.save();

      res.status(200).json({ resetToken });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});
authRouter.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
authRouter.get("/test-token", verifyToken, (_, res) => {
  res.status(200).json({ message: "Token valid" });
});
authRouter.get("/check-email", async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });
    res.status(200).json({ emailInUse: !!user });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = { authRouter };
