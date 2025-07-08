const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailDomain: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("School", schoolSchema);
