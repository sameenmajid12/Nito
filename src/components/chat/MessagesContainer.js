import { ScrollView, StyleSheet } from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { Image } from "expo-image";

function MessagesContainer({messages}) {
  return (
    <ScrollView style={styles.mainContainer}>
      {messages?messages.map((message)=>{return}):null}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 25,
  },
});
export default MessagesContainer;
