const mongoose = require("mongoose");

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
      type: String,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    bio: {
      type: String,
    },
    year: {
      type: Number,
      min: 2026,
      max: 2036,
    },
    major: {
      type: String,
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
    votedPolls: [
      {
        _id: false,
        poll: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Poll",
        },
        selectedOptionNum: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ school: 1 });

module.exports = mongoose.model("User", userSchema);
