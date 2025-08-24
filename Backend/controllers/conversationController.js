const express = require("express");
const conversationRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Conversation = require("../models/ConversationModel");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
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
conversationRouter.get(
  "/with/:otherUserId",
  verifyToken,
  async (req, res) => {
    try {
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
  }
);

module.exports = { conversationRouter };
