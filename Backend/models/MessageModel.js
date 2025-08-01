const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["image", "text"], default: "text" },
    text: { type: String, trim: true },
    image: {
      filename: String,
      fileUrl: String,
    },
    clientId: {
      type: String,
      required: false,
      unique: false,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
