const express = require("express");
const PhaseTimer = require("../models/PhaseTimerModel");
const phaseTimerRouter = express.Router();

phaseTimerRouter.get("/", async (req, res) => {
  try {
    console.log("Getting updated phase times");
    const times = await PhaseTimer.findOne({key:"globalTimers"});
    console.log(times);
    if (!times) {
      return res.status(404).json({ message: "App state times not found" });
    }
    res.status(200).json({ times });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { phaseTimerRouter };
