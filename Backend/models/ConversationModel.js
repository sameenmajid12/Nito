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
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  user1Revealed: { type: Boolean, default: null },
  user2Revealed: { type: Boolean, default: null },
  status: {
    type: String,
    enum: ["current", "revealing", "matched", "archived"],
    default: "current",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  startTime: { type: Date, required: true, default: Date.now },
  revealTime: { type: Date, required: true, default: () => new Date(Date.now() + 30 * 60 * 1000) },
  endTime: { type: Date, required: true,  default: () => new Date(Date.now() + 35 * 60 * 1000) },
  similarTags: { type: [String], default: [] },
});

conversationSchema.index({ user1: 1, user2: 1 }, { unique: true });
conversationSchema.index({ status: 1 });
module.exports = mongoose.model("Conversation", conversationSchema);
