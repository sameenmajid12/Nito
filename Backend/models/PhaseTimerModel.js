const mongoose = require("mongoose");

const phaseTimerSchema = new mongoose.Schema({
  key: { type: String, required: true },
  revealPhaseStart: { type: Date, required: true },
  revealPhaseEnd: { type: Date, required: true },
  nextPairing: { type: Date, required: true },
});

module.exports = mongoose.model("PhaseTimer", phaseTimerSchema);
