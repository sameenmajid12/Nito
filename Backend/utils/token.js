const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
