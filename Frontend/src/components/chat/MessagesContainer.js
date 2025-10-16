import {
  Animated,
  FlatList,
  Keyboard,
  Easing,
  ActivityIndicator,
  StyleSheet,
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
  openMessageOptions
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

  const renderItem = ({ item, index }) => {
    const isByUser = item.sender === user._id;
    const isFirstByUser = messages[index + 1]?.sender !== item.sender;
    const isLastByUser = messages[index - 1]?.sender !== item.sender;
    if (item.type === "image") {
      return (
        <ImageMessage
          message={item}
          isByUser={isByUser}
          isFirstByUser={isFirstByUser}
          isLastByUser={isLastByUser}
          isMatch={isMatch}
          otherUser={otherUser}
          isLastMessage={index === 0}
          openMessageOptions={openMessageOptions}
        />
      );
    }
    if (isByUser) {
      return (
        <SentMessage
          key={item._id}
          message={item}
          isFirstByUser={isFirstByUser}
          isLastByUser={isLastByUser}
          isLastMessage={index === 0}
          openMessageOptions={openMessageOptions}
        />
      );
    } else {
      return (
        <ReceivedMessage
          key={item._id}
          text={item.text}
          isFirstByUser={isFirstByUser}
          isLastByUser={isLastByUser}
          isMatch={isMatch}
          otherUser={otherUser}
          isLastMessage={index === 0}
        />
      );
    }
  };
  return (
    <Animated.View style={{ flex: 1, paddingBottom: containerBottomPadding }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentContainer}
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
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingRight: 25,
  },
  
});
export default MessagesContainer;
