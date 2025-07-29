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
        Data: "Verification code",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px; margin:auto; padding: 20px; border-radius: 10px;">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="https://nito-s3-image-bucket.s3.us-east-1.amazonaws.com/logo.png" width="64" alt="Logo" style="display: block;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 24px; font-weight: bold; padding-bottom: 15px;">
                    Your verification code
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        ${code
                          .split("")
                          .map(
                            (num, index) => `
                          <td align="center" style="border: 1px solid gray; width: 50px; height: 50px; border-radius: 10px; font-size: 24px; font-weight: bold; vertical-align: middle; text-align: center; margin:5px">
                            ${num}
                          </td>
                          ${index < 4 ? '<td style="width: 10px;"></td>' : ''}
                        `
                          )
                          .join("")}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 14px; color: #555;">
                    Remember to never share this code with anyone
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `,
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
