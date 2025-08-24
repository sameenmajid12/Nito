import {
  Animated,
  FlatList,
  StyleSheet,
  Keyboard,
  Easing,
  Text,
  ActivityIndicator,
} from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useEffect, useRef } from "react";
import { colors, FONT_SIZE_XL, FONT_SIZE_XXL } from "../../styles";
import ChatRevealing from "./ChatRevealing";
import { useUser } from "../../contexts/UserContext";
import ChatBeginning from "./ChatBeginning";
const INITIAL_BOTTOM_PADDING = 50;
function MessagesContainer({
  messages,
  isMatch,
  otherUser,
  isRevealing,
  conversation,
  setConversation,
  hasMore,
  loadOlderMessages,
  isLoadingMore,
  setIsLoadingMore,
}) {
  const flatListRef = useRef(null);
  const { user } = useUser();
  const containerBottomPadding = useRef(
    new Animated.Value(INITIAL_BOTTOM_PADDING)
  ).current;
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        const {endCoordinates, duration } = e;
        Animated.timing(containerBottomPadding, {
          toValue: endCoordinates.height + 40,
          duration: duration,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: false,
        }).start();
        scrollToBottom();
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
    if (isLoadingMore) {
      setIsLoadingMore(false);
    } else {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = (animated = true) => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToOffset({ offset: 0, animated });
    }
  };
  const isByUser = (message) => {
    return message.sender === user._id;
  };
  const renderItem = ({ item, index }) => {
    const first = messages[index + 1]?.sender !== item.sender;
    const last = messages[index - 1]?.sender !== item.sender;

    return isByUser(item) ? (
      <SentMessage key={item._id} text={item.text} first={first} last={last} />
    ) : (
      <ReceivedMessage
        key={item._id}
        text={item.text}
        first={first}
        last={last}
        isMatch={isMatch}
        otherUser={otherUser}
      />
    );
  };
  return (
    <Animated.View style={{ flex: 1, paddingBottom: containerBottomPadding }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          paddingRight: 25,
        }}
        inverted
        onEndReached={() => loadOlderMessages()}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          isRevealing ? (
            <ChatRevealing
              conversation={conversation}
              setConversation={setConversation}
            />
          ) : null
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator
              color={colors.primary}
              size={FONT_SIZE_XXL}
              style={{ marginVertical: 30 }}
            />
          ) : !hasMore ? (
            <ChatBeginning user={otherUser} isMatch={isMatch} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
}
export default MessagesContainer;
