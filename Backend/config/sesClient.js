const { SESClient } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,      
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = sesClient