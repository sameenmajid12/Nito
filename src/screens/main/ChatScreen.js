import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../styles";
import MessageInput from "../../components/chat/MessageInput";
import { useState } from "react";
import ChatHeader from "../../components/chat/ChatHeader";
function ChatScreen() {
  const [message, setMessage] = useState("");
  return (
    <SafeAreaView style={styles.page}>
      <ChatHeader/>
      <ScrollView style={styles.mainChat}>

      </ScrollView>
      <MessageInput message={message} setMessage={setMessage}></MessageInput>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainChat:{
    flex:1,
  },
  
});
export default ChatScreen;
