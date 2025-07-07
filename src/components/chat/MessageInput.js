import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Keyboard,
  Easing,
} from "react-native";
import { colors } from "../../styles";
import { FONT_SIZE_XL } from "../../styles";
import { useEffect, useRef } from "react";
const ICON_SIZE = 36;
const MIN_INPUT_HEIGHT = 45;
const INITIAL_BOTTOM_VALUE = 0;

function MessageInput({ message, setMessage }) {
  const messageInputTranslateY = useRef(
    new Animated.Value(INITIAL_BOTTOM_VALUE)
  ).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        const { duration, endCoordinates } = e;
        Animated.timing(messageInputTranslateY, {
          toValue: -(endCoordinates.height - 20),
          duration: duration,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      (e) => {
        const { duration } = e;
        Animated.timing(messageInputTranslateY, {
          toValue: INITIAL_BOTTOM_VALUE,
          duration: duration,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <Animated.View style={[styles.mainContainer, {transform:[{translateY:messageInputTranslateY}]}]}>
      <Animated.View
        style={[
          styles.inputContainer,
        ]}
      >
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
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    minHeight: 85,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent:"flex-start"
  },
  inputContainer: {
    backgroundColor: colors.background,
    maxHeight:60,
    marginHorizontal: 25,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: MIN_INPUT_HEIGHT,
    borderRadius: MIN_INPUT_HEIGHT / 2,
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
