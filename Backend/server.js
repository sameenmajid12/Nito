require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { authRouter } = require("./controllers/authController.js");
const { schoolRouter } = require("./controllers/schoolController.js");
const { userRouter } = require("./controllers/userController.js");
const {
  conversationRouter,
} = require("./controllers/conversationController.js");
const { pollRouter } = require("./controllers/pollController.js");
const { supportRouter } = require("./controllers/supportController.js");
const initializeSocketIo = require("./config/socket.js");
const connectDB = require("./config/db.js");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

const port = 3002;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", authRouter);
app.use("/school", schoolRouter);
app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/dailypoll", pollRouter);
app.use("/support", supportRouter);
const server = http.createServer(app);
initializeSocketIo(server);
app.get("/", async (req, res, next) => {
  res.json({ message: "Hello from backend" });
});
connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Connected to 192.168.1.173:${port}`);
  });
});
