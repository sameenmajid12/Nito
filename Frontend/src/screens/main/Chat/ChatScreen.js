import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  View,
} from "react-native";
import { colors } from "../../../styles";
import MessageInput from "../../../components/chat/MessageInput";
import { useState, useEffect } from "react";
import ChatHeader from "../../../components/chat/ChatHeader";
import MessagesContainer from "../../../components/chat/MessagesContainer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useUser } from "../../../contexts/UserContext";
import useMessages from "../../../hooks/useMessages";
function ChatScreen({ navigation, route }) {
  const { user } = useUser();
  const [conversation, setConversation] = useState(route.params.conversation);
  const {
    messages,
    isLoadingInitial,
    setNewMessage,
    newMessage,
    sendMessage,
    hasMore,
    loadOlderMessages,
    isLoadingMore,
    setIsLoadingMore,
  } = useMessages(conversation);
  const [showTime, setShowTime] = useState(false);
  const toggleTime = () => {
    setShowTime((prev) => !prev);
  };
  const hideTime = () => {
    if (showTime) {
      setShowTime(false);
    }
  };
  const mainGesture = Gesture.Pan().onStart((event) => {
    if (Math.abs(event.translationY) > Math.abs(event.translationX)) {
      return;
    }
    Keyboard.dismiss();
    hideTime();
  });
  const sideGesture = Gesture.Tap().onTouchesDown(() => {
    Keyboard.dismiss();
    hideTime();
  });
  const isMatch = conversation.status === "matched";
  const isRevealing = conversation.status === "revealing";
  const isCurrent = conversation.status === "current";
  const otherUser =
    conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1;

  useEffect(() => {
    if (messages.length > 0) {
      setConversation((prev) => ({
        ...prev,
        lastMessage: messages[0],
      }));
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.page}>
      <ChatHeader
        navigation={navigation}
        conversation={conversation}
        isMatch={isMatch}
        isCurrent={isCurrent}
        otherUser={otherUser}
        showTime={showTime}
        toggleTime={toggleTime}
      />
      <View style={styles.gestureWrapper}>
        <GestureDetector gesture={sideGesture}>
          <View style={{ width: 25 }}></View>
        </GestureDetector>
        <GestureDetector gesture={mainGesture}>
          {!isLoadingInitial ? (
            <MessagesContainer
              messages={messages}
              conversation={conversation}
              setConversation={setConversation}
              isMatch={isMatch}
              otherUser={otherUser}
              isRevealing={isRevealing}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              loadOlderMessages={loadOlderMessages}
              setIsLoadingMore={setIsLoadingMore}
            />
          ) : (
            <View style={styles.loadingScreen}>
              <ActivityIndicator
                color={colors.primary}
                size="large"
                style={styles.loader}
              />
            </View>
          )}
        </GestureDetector>
      </View>

      <MessageInput
        message={newMessage}
        setMessage={setNewMessage}
        sendMessage={sendMessage}
        disabled={!isMatch && !isCurrent}
      ></MessageInput>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    alignSelf: "center",
    marginBottom: 100,
  },
  gestureWrapper: { flex: 1, flexDirection: "row" },
  loadingScreen: { flex: 1, justifyContent: "flex-end" },
});
export default ChatScreen;
