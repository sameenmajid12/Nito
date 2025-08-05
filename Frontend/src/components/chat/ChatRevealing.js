import { StyleSheet, Text, View } from "react-native";
import SkipButton from "./SkipButton";
import RevealButton from "./RevealButton";
import { colors, FONT_SIZE_M } from "../../styles";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";

function ChatRevealing({ conversationId }) {
  const { socket } = useSocket();
  const {user} = useUser();
  const pairAction = (action) => {
    socket.emit("pairAction", { conversationId, userId: user._id, action });
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>
        You've reached the end. Curious to see who was behind the screen?
      </Text>
      <View style={styles.buttonContainer}>
        <SkipButton pairAction={pairAction} />
        <View style={styles.divider} />
        <RevealButton pairAction={pairAction} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 15,
    rowGap: 20,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: colors.border,
  },
});
export default ChatRevealing;
