import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "@env";
import { useAuth } from "../contexts/AuthContext";

function useMessages(conversationId) {
  const { token } = useAuth();
  const [messages, setMessages] = useState(null);
  const [isLoadingMessages, setIsLoadingMessage] = useState(false);

  const getMessages = useCallback(async () => {
    if (!conversationId) return;
    setIsLoadingMessage(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        const { conversationMessages } = response.data;
        setMessages(conversationMessages);
      
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMessage(false);
    }
  }, [conversationId, token]);

  useEffect(() => {
    getMessages();
    return () => setMessages(null);
  }, [getMessages]);

  return { messages, isLoadingMessages };
}

export default useMessages;
