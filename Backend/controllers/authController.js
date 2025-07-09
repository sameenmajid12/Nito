const express = require("express");
const app = express();
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

authRouter.post(
  "/register",
  upload.single("profilePic"),
  async (req, res, next) => {
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
      const existingUser =
        (await User.find({ email: newUserInfo.email }).length) > 0;
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
      res.status(201).json(user);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { authRouter };
