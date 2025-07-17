import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "@env";
import { useUser } from "../contexts/UserContext";
const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    if (!user || !user._id) return;
    const newSocket = io(API_BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    newSocket.emit("register", user._id);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
