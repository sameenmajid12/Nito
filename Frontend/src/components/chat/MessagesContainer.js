import {
  Animated,
  FlatList,
  Keyboard,
  Easing,
  ActivityIndicator,
} from "react-native";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import { useEffect, useRef } from "react";
import { colors, FONT_SIZE_XXL } from "../../styles";
import ChatRevealing from "./ChatRevealing";
import { useUser } from "../../contexts/UserContext";
import ChatBeginning from "./ChatBeginning";
import ImageMessage from "./ImageMessage";
import { useState } from "react";
const INITIAL_BOTTOM_PADDING = 40;
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
  hideTime,
  imageHeight,
}) {
  const flatListRef = useRef(null);
  const { user } = useUser();
  const containerBottomPadding = useRef(
    new Animated.Value(INITIAL_BOTTOM_PADDING)
  ).current;
  const [prevImageHeight, setPrevImageHeight] = useState(0);
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        const { endCoordinates, duration } = e;
        Animated.timing(containerBottomPadding, {
          toValue:
            endCoordinates.height + 20 + (imageHeight ? imageHeight + 20 : 0),
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
          toValue: imageHeight ? imageHeight + 60 : INITIAL_BOTTOM_PADDING,
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
  }, [imageHeight]);
  useEffect(() => {
    if (isLoadingMore) {
      setIsLoadingMore(false);
    } else {
      scrollToBottom();
    }
  }, [messages]);
  useEffect(() => {
    if (imageHeight !== 0) {
      setPrevImageHeight(imageHeight);
      Animated.timing(containerBottomPadding, {
        toValue: imageHeight + 60,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(containerBottomPadding, {
        toValue: Math.max(
          INITIAL_BOTTOM_PADDING,
          containerBottomPadding.__getValue() - (prevImageHeight + 20)
        ),
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [imageHeight]);
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
    if (item.type === "image") {
      return (
        <ImageMessage
          message={item}
          isByUser={isByUser(item)}
          first={first}
          last={last}
          isMatch={isMatch}
          otherUser={otherUser}
          lastItem={index === 0}
        />
      );
    }
    return isByUser(item) ? (
      <SentMessage
        key={item._id}
        text={item.text}
        first={first}
        last={last}
        lastItem={index === 0}
      />
    ) : (
      <ReceivedMessage
        key={item._id}
        text={item.text}
        first={first}
        last={last}
        isMatch={isMatch}
        otherUser={otherUser}
        lastItem={index === 0}
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
          flexGrow: 1,
          justifyContent: "flex-end",
          paddingRight: 25,
        }}
        keyboardShouldPersistTaps="handled"
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
        onScrollBeginDrag={hideTime}
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
