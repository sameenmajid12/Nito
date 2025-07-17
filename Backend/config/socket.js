const { Server } = require("socket.io");
const users = {};
const initializeSocketIo = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
  });
  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
      users[userId] = socket.id;
      socket.userId = userId;
    });
    socket.on("disconnect", () => {
      console.log(`Disconnecting user with socket ID ${socket.userId}`)
      delete users[socket.userId];
    });
  });
};

module.exports = initializeSocketIo;
