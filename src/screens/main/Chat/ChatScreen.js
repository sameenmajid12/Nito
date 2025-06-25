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
function ChatScreen({ navigation, route }) {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { conversation } = route.params;
  const [messages, setMessages] = useState(conversation?.messages); // WILL SET IT TO JUST [] WHEN BACKEND IS CREATED
  const [loadingMessages, setLoadingMessages] = useState(true);
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const usersRevealed =
    conversation.user1Revealed && conversation.user2Revealed;
  const otherUser =
    conversation.user1.id === user.id ? conversation.user2 : conversation.user1;
  useEffect(() => {
    if (conversation) {
      //API CALL TO GET MESSAGES BUT FOR NOW IM GOING TO PLACE MESSAGES IN THE DUMMY CONVERSATIONS FOR TESTING
    }
  }, []);
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
