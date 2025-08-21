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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
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
    revealedUsers: [
      {
        _id: false,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        matchTime: Date,
      },
    ],
    skippedUsers: {
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
      default:null
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
    lastPairStatus: {
      status: {
        type: String,
        enum: ["matched", "skipped"],
        default: null,
      },
      updatedAt: {
        type: Date,
        default: null,
      },
      viewed: {
        type: Boolean,
        default: null,
      },
    },
    notifications: {
      revealPhases: {
        type: Boolean,
        default: true,
      },
      matches: {
        type: Boolean,
        default: true,
      },
      messages: {
        type: Boolean,
        default: true,
      },
      pairings: {
        type: Boolean,
        default: true,
      },
    },
    vectorTags: [
      {
        tag: String,
        embedding: [Number],
      },
    ],
    vectorTagsAverage: {
      type: [Number],
    },
  },
  { timestamps: true }
);

userSchema.index({ school: 1 });

module.exports = mongoose.model("User", userSchema);
