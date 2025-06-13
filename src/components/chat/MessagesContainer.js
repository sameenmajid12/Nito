import {
  Animated,
  ScrollView,
  StyleSheet,
  Keyboard,
  Easing,
  View,
} from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { colors } from "../../styles";
const INITIAL_BOTTOM_PADDING = 60;
const KEYBOARD_ACTIVE_BOTTOM_PADDING = 400;
function MessagesContainer({ messages }) {
  const scrollViewRef = useRef(null);
  const containerBottomPadding = useRef(
    new Animated.Value(INITIAL_BOTTOM_PADDING)
  ).current;
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        Animated.timing(containerBottomPadding, {
          toValue: KEYBOARD_ACTIVE_BOTTOM_PADDING,
          duration: 0,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      (e) => {
        const { duration } = e;
        Animated.timing(containerBottomPadding, {
          toValue: INITIAL_BOTTOM_PADDING,
          duration: duration,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  useEffect(() => {
    scrollToBottom(false);
  }, []);
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);
  const scrollToBottom = (animated) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated });
    }
  };
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        onContentSizeChange={() => scrollToBottom(true)}
        style={[styles.mainContainer]}
        contentContainerStyle={{}}
        ref={scrollViewRef}
      >
        <Animated.View
          style={{
            height: containerBottomPadding,
            backgroundColor: colors.background,
          }}
        ></Animated.View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 25,
  },
});
export default MessagesContainer;
