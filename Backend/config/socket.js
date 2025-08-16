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

    socket.on("revealPhaseStarted", () => {
      console.log("Reveal phase started");
      io.emit("revealPhaseStarted");
    });

    socket.on("revealPhaseFinalized", () => {
      console.log("Received revealPhaseFinalized from lambda")
      socket.broadcast.emit("revealPhaseFinalized");
    }); 

    socket.on("pairAction", async ({ conversationId, userId, action }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit("errorMessage", {
            error: "Conversation not found",
          });
        }
        const userInConversation =
          conversation.user1.toString() === userId ? "user1" : "user2";

        conversation[`${userInConversation}Revealed`] =
          action === "reveal" ? true : false;
        await conversation.save();
        const receiverId =
          userInConversation === "user1"
            ? conversation.user2
            : conversation.user1;
        await conversation.populate([
          { path: "user1", select: "username" },
          { path: "user2", select: "username" },
          { path: "lastMessage" },
          { path: "lastReadMessages.user1", model: "Message" },
          { path: "lastReadMessages.user2", model: "Message" },
        ]);
        const receiverSocket = socketUsers[receiverId];
        if (receiverSocket) {
          io.to(receiverSocket).emit(
            "otherUserPairActionComplete",
            conversation
          );
        }
        socket.emit("pairActionComplete", conversation);
      } catch (e) {
        socket.emit("errorMessage", { error: e.message });
      }
    });

    socket.on("undoPairAction", async ({ conversationId, userId }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit("errorMessage", {
            error: "Conversation not found",
          });
        }
        const userInConversation =
          conversation.user1.toString() === userId ? "user1" : "user2";
        conversation[`${userInConversation}Revealed`] = null;
        await conversation.save();
        socket.emit("undoPairActionComplete");
      } catch (e) {
        socket.emit("errorMessage", { error: e.message });
      }
    });

    socket.on(
      "sendMessage",
      async ({ receiverId, conversationId, text, clientId }) => {
        try {
          console.log(`Sending message...`);
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
            clientId,
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
      }
    );

    socket.on(
      "markConversationAsRead",
      async ({ conversationId, receiverId }) => {
        try {
          console.log("Conversation being marked as read..");
          const conversation = await Conversation.findById(conversationId);
          if (!conversation) {
            throw new Error("Conversation not found");
          }
          const userNum =
            socket.userId === conversation.user1.toString() ? "user1" : "user2";
          conversation.lastReadMessages[userNum] = conversation.lastMessage;
          await conversation.save();
          const receiverSocket = socketUsers[receiverId];
          if (receiverSocket) {
            io.to(receiverSocket).emit("readReceipt", conversationId);
          }
        } catch (e) {
          console.error("Error sending message:", e);
          socket.emit("errorMessage", { error: e.message });
        }
      }
    );

    socket.on("disconnect", () => {
      if (socketUsers[socket.userId]) {
        console.log(`Disconnecting user with socket ID ${socket.userId}`);
        delete socketUsers[socket.userId];
      }
    });
  });
};

module.exports = initializeSocketIo;
