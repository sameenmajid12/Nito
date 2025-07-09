const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { authRouter } = require("./controllers/authController.js");
const connectDB = require("./config/db.js");

const corsOptions = {
  origin: "http://192.168.1.173:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

const port = 3002;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", authRouter);
const server = http.createServer(app);

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Connected to 192.168.1.173:${port}`);
  });
});
