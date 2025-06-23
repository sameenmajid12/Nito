import { SafeAreaView, ScrollView, StyleSheet, Keyboard } from "react-native";
import { colors } from "../../../styles";
import MessageInput from "../../../components/chat/MessageInput";
import { useState, useEffect } from "react";
import ChatHeader from "../../../components/chat/ChatHeader";
import MessagesContainer from "../../../components/chat/MessagesContainer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
function ChatScreen({ navigation }) {
  const [message, setMessage] = useState("");
 const tapGesture = Gesture.Tap()
  .onTouchesDown(() => Keyboard.dismiss());

  return (
    <GestureDetector gesture={tapGesture}>
      <SafeAreaView style={styles.page}>
        <ChatHeader />
        <MessagesContainer />
        <MessageInput message={message} setMessage={setMessage}></MessageInput>
      </SafeAreaView>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainChat: {
    flex: 1,
  },
});
export default ChatScreen;
