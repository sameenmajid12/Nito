import {
  Animated,
  ScrollView,
  StyleSheet,
  Keyboard,
  Easing,
  Text,
} from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useEffect, useRef } from "react";
import { colors } from "../../styles";
import ChatRevealing from "./ChatRevealing";
import { useUser } from "../../contexts/UserContext";
import ChatBeginnning from "./ChatBeginning";
const INITIAL_BOTTOM_PADDING = 50;
function MessagesContainer({ messages, isMatch, otherUser, isRevealing, conversation, setConversation }) {
  const scrollViewRef = useRef(null);
  const { user } = useUser();
  const containerBottomPadding = useRef(
    new Animated.Value(INITIAL_BOTTOM_PADDING)
  ).current;
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        Animated.timing(containerBottomPadding, {
          toValue: e.endCoordinates.height + 40,
          duration: 0, //Feels delayed if higher duration used because of padding view having to increase in height
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
  const isByUser = (message) => {
    return message.sender === user._id;
  };
  return (
    <ScrollView
      onContentSizeChange={() => scrollToBottom(true)}
      style={[styles.mainContainer]}
      contentContainerStyle={{}}
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          backgroundColor: colors.background,
          marginBottom: containerBottomPadding,
        }}
      >
        <ChatBeginnning user={otherUser} isMatch={isMatch} />
        {messages?.length > 0 &&
          messages.map((message, i) => {
            const first = messages[i - 1]?.sender !== message.sender;
            const last = messages[i + 1]?.sender !== message.sender;
            return isByUser(message) ? (
              <SentMessage
                key={message._id}
                text={message.text}
                first={first}
                last={last}
              />
            ) : (
              <ReceivedMessage
                key={message._id}
                text={message.text}
                first={first}
                last={last}
                isMatch={isMatch}
                otherUser={otherUser}
              />
            );
          })}
          {isRevealing && <ChatRevealing conversation={conversation} setConversation={setConversation}/>}
      </Animated.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingRight:25
  },
});
export default MessagesContainer;
