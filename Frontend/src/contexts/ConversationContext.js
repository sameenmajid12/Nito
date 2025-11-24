import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@env";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useAlert } from "./AlertContext";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";
const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState(null);
  const [current, setCurrent] = useState(false);
  const { user, setUser } = useUser();
  const { token } = useAuth();
  const { addAlert } = useAlert();
  const navigation = useNavigation();
  const [isCurrentConvoDeleted, setIsCurrentConvoDeleted] = useState(false);

  const openConversation = (conversation, curr) => {
    setConversation(conversation);
    setCurrent(curr);
    navigation.navigate("Chat");
  }
  useEffect(() => {
    if (!user || !user?.currentPair.conversation) return;
    const currentConvoLastMessageDate = user.currentPair.conversation?.lastMessage?.createdAt;
    const currentConvoUserNum = user.currentPair.conversation?.user1?._id === user._id ? "user1" : "user2";
    const currentConvoDeletionDate = user.currentPair.conversation[`${currentConvoUserNum}DeletionDate`];
    setIsCurrentConvoDeleted(currentConvoLastMessageDate && currentConvoDeletionDate ?
      new Date(currentConvoLastMessageDate) < new Date(currentConvoDeletionDate) :
      currentConvoDeletionDate ? true : false);
  }, [user?.currentPair]);

  const getConversation = async (otherUser) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversation/with/${otherUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.conversation;
    } catch (e) {
      addAlert("error", "Convo not found");
    }
  };
  const deleteConversation = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/conversation/delete`, { conversationId: conversation._id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { conversation: updatedConversation } = response.data;
      setUser((prev) => ({
        ...prev,
        [current ? "currentPair" : "savedConversations"]: current
          ? {
            ...prev.currentPair,
            conversation: updatedConversation,
          }
          : prev.savedConversations.map((c) =>
            c._id === updatedConversation._id ? updatedConversation : c
          ),
      }));
      addAlert("success", "Conversation deleted");
      navigation.goBack();
      setConversation(null);
    }
    catch (e) {
      addAlert("error", "Error deleting conversation");
    }
  }
  const openConversationWithUser = async (userToMessage) => {
    const conversation = await getConversation(userToMessage);
    if (conversation) {
      openConversation(conversation, false);
    }
  };
  return (
    <ConversationContext.Provider value={{ conversation, setConversation, deleteConversation, setCurrent, current, getConversation, openConversation, openConversationWithUser, isCurrentConvoDeleted }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
