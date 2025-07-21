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
  const { user } = useUser();
  const { token } = useAuth();
  const { conversation } = route.params;
  const { socket } = useSocket();
  const [messages, setMessages] = useState(conversation?.messages); // WILL SET IT TO JUST [] WHEN BACKEND IS CREATED
  const [loadingMessages, setLoadingMessages] = useState(false);
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const usersRevealed = true;
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
      }
    };
    if (conversation) {
      getMessages();
    }
  }, [conversation]);
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
        usersRevealed={usersRevealed}
        otherUser={otherUser}
      />

      <GestureDetector gesture={tapGesture}>
        {!loadingMessages ? (
          <MessagesContainer
            messages={messages}
            conversation={conversation}
            usersRevealed={usersRevealed}
            otherUser={otherUser}
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
