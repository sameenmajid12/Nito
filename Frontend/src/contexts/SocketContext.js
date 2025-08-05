import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "@env";
import { useUser } from "../contexts/UserContext";
import { useAlert } from "./AlertContext";
const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef();
  const { user, setUser } = useUser();
  const { openRevealPhaseAlert } = useAlert();
  useEffect(() => {
    if (!user || !user._id) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    if (socketRef.current) return;

    const newSocket = io(API_BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = newSocket;
    setSocket(newSocket);
    const registerUser = () => {
      newSocket.emit("register", user._id);
    };
    const handleReceiveMessage = (message) => {
      console.log("Received message");
      if (message.conversation === user.currentConversation?._id.toString()) {
        console.log("Received message for currentConversation");
        setUser((prev) => ({
          ...prev,
          currentConversation: {
            ...prev.currentConversation,
            lastMessage: message,
          },
        }));
        return;
      }
      const updatedConversations = [...user.savedConversations];
      let conversationFoundAndUpdated = false;
      const conversationIndex = updatedConversations.findIndex(
        (conv) => conv._id === message.conversation
      );
      if (conversationIndex !== -1) {
        const conversationToUpdate = {
          ...updatedConversations[conversationIndex],
        };
        conversationToUpdate.lastMessage = message;
        updatedConversations.splice(conversationIndex, 1);
        updatedConversations.unshift(conversationToUpdate);
        conversationFoundAndUpdated = true;
      }
      if (conversationFoundAndUpdated) {
        setUser((prev) => ({
          ...prev,
          savedConversations: updatedConversations,
        }));
      }
    };
    const handleRevealPhaseStarted = () => {
      setUser((prev) => ({
        ...prev,
        currentConversation: {
          ...prev.currentConversation,
          status: "revealing",
        },
      }));
      openRevealPhaseAlert();
    };
    newSocket.on("connect", registerUser);
    newSocket.on("receiveMessage", handleReceiveMessage);
    newSocket.on("revealPhaseStarted", handleRevealPhaseStarted);
    newSocket.on("match-revealed");
    newSocket.on("match-skipped");
    newSocket.on("new-match");
    newSocket.on("typing");
    newSocket.on("read");
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
    };
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
