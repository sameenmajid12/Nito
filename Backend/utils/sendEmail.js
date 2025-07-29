const sesClient = require("../config/sesClient");
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const VerificationCode = require("../models/VerificationCodeModel");
const bcrypt = require("bcrypt");
const sendVerificationEmail = async (toAddress) => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  console.log("Using ses to send email verificaiton...");
  const command = new SendEmailCommand({
    Source: "noreply@nito-app.com",
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Subject: {
        Data: "Your verification code",
      },
      Body: {
        Text: {
          Data: `Your code is ${code}`,
        },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    const encryptedVerificationCode = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await VerificationCode.deleteMany({ email: toAddress });
    await VerificationCode.create({
      email: toAddress,
      code: encryptedVerificationCode,
      expiresAt,
    });
    return response;
  } catch (e) {
    console.error("Failed to send email:", e);
    throw e;
  }
};
module.exports = sendVerificationEmail;
