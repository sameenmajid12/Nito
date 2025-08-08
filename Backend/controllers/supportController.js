const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const supportRouter = express.Router();
const User = require("../models/UserModel");
const { clientSendSupportEmail } = require("../utils/sendEmail");
supportRouter.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Sending support email");
    const userId = req.user._id;
    const { message } = req.body;
    const user = await User.findById(userId).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await clientSendSupportEmail(user.email, message);
    res.status(200).json({ message: "Message sent" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { supportRouter };
