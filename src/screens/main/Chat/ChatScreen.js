import { SafeAreaView, ScrollView, StyleSheet, Keyboard } from "react-native";
import { colors } from "../../../styles";
import MessageInput from "../../../components/chat/MessageInput";
import { useState, useEffect } from "react";
import ChatHeader from "../../../components/chat/ChatHeader";
import MessagesContainer from "../../../components/chat/MessagesContainer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
function ChatScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  return (
    <SafeAreaView style={styles.page}>
      <ChatHeader navigation={navigation} />

      <GestureDetector gesture={tapGesture}>
        <MessagesContainer />
      </GestureDetector>

      <MessageInput message={message} setMessage={setMessage}></MessageInput>
    </SafeAreaView>
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
