const mongoose = require("mongoose");
const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
  optionNum: {
    type: Number,
    required: true,
  },
});
const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [OptionSchema],
  totalVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  date: { type: Date, required: true, unique: true, default: () => new Date() },
});

module.exports = mongoose.model("Poll", PollSchema);
