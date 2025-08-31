const express = require("express");
const conversationRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Conversation = require("../models/ConversationModel");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
const { getIo, getSocketUsers } = require("../config/socket");
const upload = require("../middleware/uploadImage");
const s3 = require("../config/s3Client");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
conversationRouter.get(
  "/:conversationId/messages",
  verifyToken,
  async (req, res) => {
    try {
      console.log("Getting messages");
      const { conversationId } = req.params;
      const { _id: userId } = req.user;
      const { limit, before } = req.query;
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      if (
        !conversation.user1.equals(userId) &&
        !conversation.user2.equals(userId)
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to retrieve messages" });
      }
      const query = { conversation: conversationId };
      if (before.length > 0) {
        query.createdAt = { $lt: new Date(before) };
      }
      const messages = await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(Math.min(Number(limit) || 20, 50));
      res.status(200).json({ conversationMessages: messages || [] });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
conversationRouter.get("/with/:otherUserId", verifyToken, async (req, res) => {
  try {
    console.log("Getting conversation with user")
    const userId = req.user._id;
    const { otherUserId } = req.params;
    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);
    if (!user || !otherUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let conversation = await Conversation.findOne({
      $or: [
        { user1: user._id, user2: otherUser._id },
        { user1: otherUser._id, user2: user._id },
      ],
    });
    if (!conversation) {
      conversation = await Conversation.create({
        user1: user._id,
        user2: otherUser._id,
        status: "matched",
        user1Revealed: true,
        user2Revealed: true,
      });
    }
    await conversation.populate([
      { path: "user1", select: "profilePic fullname username" },
      { path: "user2", select: "profilePic fullname username" },
    ]);
    res.status(200).json({ conversation });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

conversationRouter.post(
  "/:conversationId/uploadImage",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Uploading image message to s3");
      const userId = req.user._id;
      const sender = await User.findById(userId);
      const { receiverId, clientId } = req.body;
      const { conversationId } = req.params;
      const receiver = await User.findById(receiverId);
      const conversation = await Conversation.findById(conversationId);
      if (!sender || !receiver) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: "Image missing" });
      }
      const fileKey = `${uuidv4()}-${req.file.originalname}`;
      const fileUploadParams = {
        Bucket: process.env.MESSAGE_IMAGE_BUCKET,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(fileUploadParams));
      const dimensions = JSON.parse(req.body.dimensions);

      const messageObject = await Message.create({
        clientId,
        sender: sender._id,
        receiver: receiver._id,
        conversation: conversation._id,
        type: "image",
        imageKey: fileKey,
        imageDimensions: {
          width: dimensions.width,
          height: dimensions.height,
        },
      });
      const io = getIo();
      const socketUsers = getSocketUsers();
      const receiverSocket = socketUsers[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", messageObject);
      }
      const senderSocket = socketUsers[userId];
      if (senderSocket) {
        io.to(senderSocket).emit("receiveMessage", messageObject);
      }
      res.sendStatus(201);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
conversationRouter.get(
  "/message/:messageId/presignedUrl",
  verifyToken,
  async (req, res) => {
    try {
      console.log("Getting presigned url for image");
      const { messageId } = req.params;
      const message = await Message.findById(messageId);
      const userId = req.user._id;
      if (!message || message.type !== "image") {
        return res.status(404).json({ message: "Image not found" });
      }
      const conversation = await Conversation.findById(message.conversation);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      if (
        !conversation.user1.equals(userId) &&
        !conversation.user2.equals(userId)
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.MESSAGE_IMAGE_BUCKET,
          Key: message.imageKey,
        }),
        { expiresIn: 7200 }
      );
      res.status(200).json({ url });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
module.exports = { conversationRouter };
