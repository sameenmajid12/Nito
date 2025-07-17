import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "@env";
import { useUser } from "../contexts/UserContext";
const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef();
  const { user } = useUser();
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
    newSocket.on("connect", registerUser);
    newSocket.on("receivedMessage");
    newSocket.on("start-reveal");
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
