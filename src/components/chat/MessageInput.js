import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../../styles";
import { FONT_SIZE_XL } from "../../styles";
const ICON_SIZE = 36;
const MIN_INPUT_HEIGHT = 45;
function MessageInput({ message, setMessage }) {
  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={10}>
      <View style={styles.inputContainer}>
        <Ionicons style={styles.attachmentIcon} name="add-circle"></Ionicons>
        <View style={styles.inputContainerRight}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.messageInput}
            placeholder="Enter message"
            multiline={true}
            placeholderTextColor={colors.textPlaceholder}
          ></TextInput>
          {message === "" ? (
            <Ionicons style={styles.voiceIcon} name="mic"></Ionicons>
          ) : (
            <Ionicons style={styles.sendIcon} name="arrow-up-circle"></Ionicons>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 25,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: MIN_INPUT_HEIGHT,
    borderRadius: MIN_INPUT_HEIGHT/2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 10,
    columnGap: 5,
  },
  attachmentIcon: {
    fontSize: ICON_SIZE,
    color: colors.primary,
  },
  voiceIcon: {
    fontSize: FONT_SIZE_XL,
    color: colors.primary,
  },
  sendIcon: {
    fontSize: ICON_SIZE,
    color: colors.primary,
  },
  messageInput: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
    paddingVertical: 10,
    flex: 1,
  },
  inputContainerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
export default MessageInput;
