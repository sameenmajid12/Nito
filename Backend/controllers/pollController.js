const express = require("express");
const pollRouter = express.Router();
const Poll = require("../models/PollModel");
const User = require("../models/UserModel");
const verifyToken = require("../middleware/verifyToken");

pollRouter.get("/", async (req, res, next) => {
  try {
    console.log("Getting daily poll...");

    const poll = await Poll.findOne().sort({ date: -1 });
    if (!poll) {
      return res.status(404).json({ message: "No poll found for today" });
    }
    res.status(200).json({ poll });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});
pollRouter.post("/vote/:pollId", verifyToken, async (req, res, next) => {
  try {
    console.log("Voting on poll..")
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { pollId } = req.params;
    const { selectedOptionNum } = req.body;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const hasVoted =
      user.votedPolls.length > 0
        ? user.votedPolls.some((vote) => vote.poll === pollId)
        : false;
    if (hasVoted) {
      return res
        .status(400)
        .json({ message: "User has already voted on this poll" });
    }
    if (selectedOptionNum < 0 || selectedOptionNum >= poll.options.length) {
      return res.status(400).json({ message: "Invalid option selected" });
    }
    user.votedPolls.push({ poll: poll._id, selectedOptionNum });
    poll.options[selectedOptionNum].votes++;
    poll.totalVotes++;
    await Promise.all([user.save(), poll.save()]);
    res
      .status(200)
      .json({ updatedUserVotes: user.votedPolls, updatedPoll: poll });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = { pollRouter };
