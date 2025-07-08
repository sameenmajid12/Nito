const mongoose = require("mongoose");

const profilePicSchema = new mongoose.Schema({
  filename: String,
  fileUrl: String,
  userId: String,
  timestamp: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    profilePic: {
      type: profilePicSchema,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    tags: {
      type: [String],
      default: [],
    },
    socialMedia: {
      instagram: { type: String, default: "" },
      snapchat: { type: String, default: "" },
      discord: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    revealedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    blockedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    currentConversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    savedConversations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Conversation",
      default: [],
    },

    archivedConversations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Conversation",
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ school: 1 });

module.exports = mongoose.model("User", userSchema);
