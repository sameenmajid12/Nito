const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  lastReadMessages: {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  user1Revealed: { type: Boolean, default: false },
  user2Revealed: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["active", "matched", "ended"],
    default: "active",
  },
  startTime: { type: Date, required: true, default: Date.now },
  matchTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

conversationSchema.index({ user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model("Conversation", conversationSchema);
