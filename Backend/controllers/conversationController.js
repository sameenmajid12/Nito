const express = require("express");
const conversationRouter = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Conversation = require("../models/ConversationModel");
const Message = require("../models/MessageModel");
conversationRouter.get(
  "/:conversationId/messages",
  verifyToken,
  async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { _id: userId } = req.user;
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
      const messages = await Message.find({
        conversation: conversationId,
      }).sort({ createdAt: 1 });
      res.status(200).json({ conversationMessages: messages || [] });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { conversationRouter };
