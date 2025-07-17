const { Server } = require("socket.io");
const Message = require("../models/MessageModel");
const Conversation = require("../models/ConversationModel");
const socketUsers = {};
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
      socketUsers[userId] = socket.id;
      socket.userId = userId;
    });
    socket.on("sendMessage", async ({ receiverId, conversationId, text }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit("errorMessage", {
            error: "Conversation not found",
          });
        }
        const message = await Message.create({
          sender: socket.userId,
          receiver: receiverId,
          text,
          conversation: conversationId,
        });
        conversation.lastMessage = message._id;
        await conversation.save();
        const receiverSocket = socketUsers[receiverId];
        if (receiverSocket) {
          io.to(receiverSocket).emit("receiveMessage", message);
        }
        socket.emit("receiveMessage", message);
      } catch (e) {
        console.error("Error sending message:", e);
        socket.emit("errorMessage", { error: e.message });
      }
    });
    socket.on("disconnect", () => {
      console.log(`Disconnecting user with socket ID ${socket.userId}`);
      delete socketUsers[socket.userId];
    });
  });
};

module.exports = initializeSocketIo;
