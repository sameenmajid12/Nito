import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  View,
} from "react-native";
import { colors } from "../../../styles";
import MessageInput from "../../../components/chat/MessageInput";
import { useState, useEffect } from "react";
import ChatHeader from "../../../components/chat/ChatHeader";
import MessagesContainer from "../../../components/chat/MessagesContainer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useUser } from "../../../contexts/UserContext";
import { API_BASE_URL } from "@env";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../../../contexts/SocketContext";
function ChatScreen({ navigation, route }) {
  const [newMessage, setNewMessage] = useState("");
  const { user, setUser } = useUser();
  const { token } = useAuth();
  const [conversation, setConversation] = useState(route.params.conversation);
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [hasLoadedMessages, setHasLoadedMessages] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const toggleTime = () => {
    setShowTime((prev) => !prev);
  };
  const hideTime = () => {
    if (showTime) {
      setShowTime(false);
    }
  };
  const tapGesture = Gesture.Tap().onTouchesDown(() => {
    Keyboard.dismiss();
    hideTime();
  });
  const isMatch = conversation.status === "matched";
  const isRevealing = conversation.status === "revealing";
  const isCurrent = conversation.status === "current";
  const otherUser =
    conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1;
  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
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
        setLoadingMessages(false);
        setHasLoadedMessages(true);
      }
    };
    if (conversation && !hasLoadedMessages) {
      getMessages();
    }
  }, [conversation]);
  useEffect(() => {
    if (messages.length > 0) {
      setConversation((prev) => ({
        ...prev,
        lastMessage: messages[messages.length - 1],
      }));
    }
  }, [messages]);
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
  return (
    <SafeAreaView style={styles.page}>
      <ChatHeader
        navigation={navigation}
        conversation={conversation}
        isMatch={isMatch}
        isCurrent={isCurrent}
        otherUser={otherUser}
        showTime={showTime}
        toggleTime={toggleTime}
      />

      <GestureDetector gesture={tapGesture}>
        {!loadingMessages ? (
          <MessagesContainer
            messages={messages}
            conversation={conversation}
            setConversation={setConversation}
            isMatch={isMatch}
            otherUser={otherUser}
            isRevealing={isRevealing}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <ActivityIndicator
              color={colors.primary}
              size="large"
              style={styles.loader}
            />
          </View>
        )}
      </GestureDetector>

      <MessageInput
        message={newMessage}
        setMessage={setNewMessage}
        sendMessage={sendMessage}
        disabled={!isMatch && !isCurrent}
      ></MessageInput>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    alignSelf: "center",
    marginBottom: 100,
  },
});
export default ChatScreen;
