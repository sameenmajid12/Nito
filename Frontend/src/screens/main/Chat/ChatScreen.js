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
function ChatScreen({ navigation, route }) {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { token } = useAuth();
  const { conversation } = route.params;
  const [messages, setMessages] = useState(conversation?.messages); // WILL SET IT TO JUST [] WHEN BACKEND IS CREATED
  const [loadingMessages, setLoadingMessages] = useState(false);
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const usersRevealed = true;
  const otherUser =
    conversation.user1.id === user.id ? conversation.user2 : conversation.user1;
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
          console.log(conversationMessages);
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
