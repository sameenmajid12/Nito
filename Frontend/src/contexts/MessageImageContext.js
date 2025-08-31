import { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "@env";
import axios from "axios";
import { useAuth } from "./AuthContext";
const MessageImageContext = createContext();

export const MessageImageProvider = ({ children }) => {
  const [imageUrls, setImageUrls] = useState({});
  const { token } = useAuth();
  const getUrl = async (messageId) => {
    if (imageUrls[messageId]) {
      return imageUrls[messageId];
    }
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversation/message/${messageId}/presignedUrl`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { url } = response.data;
      setImageUrls((prev) => ({ ...prev, [messageId]: url }));
      return url;
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <MessageImageContext.Provider value={{ imageUrls, getUrl }}>
      {children}
    </MessageImageContext.Provider>
  );
};

export const useImageCache = () => useContext(MessageImageContext);
