import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useSocket } from "../contexts/SocketContext";
import { v4 as uuidv4 } from "uuid";
function useMessages(conversation) {
  const { token } = useAuth();
  const { user, setUser } = useUser();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [hasLoadedMessages, setHasLoadedMessages] = useState(false);
  const otherUser =
    conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1;
  const getMessages = async () => {
    setIsLoadingMessage(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversation/${conversation._id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { conversationMessages } = response.data;
        setMessages(conversationMessages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMessage(false);
      setHasLoadedMessages(true);
    }
  };

  useEffect(() => {
    if (conversation && !hasLoadedMessages) {
      getMessages();
    }
  }, [conversation, hasLoadedMessages]);

  useEffect(() => {
    const userNum = user._id === conversation.user1._id ? "user1" : "user2";
    const data = {
      conversationId: conversation._id,
      receiverId: otherUser._id,
    };
    if (
      conversation.lastMessage?._id !==
        conversation.lastReadMessages[userNum]?._id &&
      conversation.lastMessage?.sender !== user._id
    ) {
      socket.emit("markConversationAsRead", data);
      setUser((prev) => {
        if (conversation._id === user.currentConversation?._id) {
          return {
            ...prev,
            currentConversation: {
              ...prev.currentConversation,
              lastReadMessages: {
                ...prev.currentConversation?.lastReadMessages,
                [userNum]: conversation.lastMessage,
              },
            },
          };
        }
        const conversationIndex = prev.savedConversations.findIndex(
          (convo) => convo._id === conversation._id
        );
        if (conversationIndex === -1) return prev;
        const updatedConversation = {
          ...prev.savedConversations[conversationIndex],
          lastReadMessages: {
            ...prev.savedConversations[conversationIndex].lastReadMessages,
            [userNum]: conversation.lastMessage,
          },
        };
        const newConversations = [...prev.savedConversations];
        newConversations[conversationIndex] = updatedConversation;
        return { ...prev, savedConversations: newConversations };
      });
    }
  }, [messages, conversation]);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (message) => {
      if (message.conversation !== conversation._id) {
        return;
      }
      console.log("Received new message for current chat");

      setMessages((prevMessages) => {
        if (prevMessages.some((m) => m._id === message._id)) {
          return prevMessages;
        }
        const indexToReplace = prevMessages.findIndex(
          (m) => m._id === message.clientId
        );
        if (indexToReplace !== -1) {
          const newMessages = [...prevMessages];
          newMessages[indexToReplace] = message;
          return newMessages;
        } else {
          return [...prevMessages, message];
        }
      });
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, conversation]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !user?._id) {
      return;
    }
    const clientId = uuidv4();
    const messageToSend = {
      receiverId: otherUser._id,
      conversationId: conversation._id,
      text: newMessage.trim(),
      clientId,
    };
    const tempMessage = {
      _id: clientId,
      sender: user._id,
      receiver: otherUser._id,
      conversation: conversation._id,
      text: newMessage.trim(),
    };
    socket.emit("sendMessage", messageToSend);
    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setNewMessage("");
  };

  return {
    messages,
    isLoadingMessages,
    setNewMessage,
    newMessage,
    sendMessage,
  };
}

export default useMessages;
