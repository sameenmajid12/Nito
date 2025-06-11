import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../../styles";
import { FONT_SIZE_XL } from "../../styles";
function MessageInput({message, setMessage}) {
  
  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={10}>
      <View style={styles.inputContainer}>
        <Ionicons style={styles.attachmentIcon} name="add-circle"></Ionicons>
        {message === "" ? <Ionicons style={styles.voiceIcon} name="mic"></Ionicons>:<Ionicons style={styles.sendIcon} name="arrow-up-circle"></Ionicons>}
        <TextInput
        value={message}
        onChangeText={setMessage}
          style={styles.messageInput}
          placeholder="Enter message"
          multiline={true}
          placeholderTextColor={colors.textPlaceholder}
        ></TextInput>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 25,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 45,
    borderRadius: 22.5,
    flexDirection: "row",
    alignItems: "center",
  },
  attachmentIcon: {
    position: "absolute",
    fontSize: 36,
    color: colors.primary,
    bottom: 22,
    transform: [{ translateY: (36 / 2) }],
    left: 5,
  },
  voiceIcon: {
    position: "absolute",
    fontSize: FONT_SIZE_XL,
    right: 10,
    bottom: 22,
    transform: [{ translateY: (FONT_SIZE_XL / 2) }],
    color: colors.primary,
  },
  sendIcon:{
    position:"absolute",
    right:5,
    fontSize:36,
    bottom:22,
    transform:[
      {translateY:18}
    ],
    color:colors.primary
  },
  messageInput: {
    paddingHorizontal: 50,

    flex: 1,
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
    paddingVertical:10
  },
});
export default MessageInput;
