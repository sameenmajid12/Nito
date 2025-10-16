import {
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../styles";
import MessageInput from "../../../components/chat/MessageInput";
import { useState, useEffect, useRef } from "react";
import ChatHeader from "../../../components/chat/ChatHeader";
import MessagesContainer from "../../../components/chat/MessagesContainer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useUser } from "../../../contexts/UserContext";
import useMessages from "../../../hooks/useMessages";
import { useSocket } from "../../../contexts/SocketContext";
import { useConversation } from "../../../contexts/ConversationContext";
import { BlurView } from "expo-blur";
import MessageOptions from "../../../components/chat/MessageOptions";
import { Image } from "expo-image";
import { useImageCache } from "../../../contexts/MessageImageContext";
function ChatScreen({ navigation }) {
  const { user } = useUser();
  const { conversation, setConversation } = useConversation();
  const { socket } = useSocket();
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
    sendImageMessage,
    newMessageImage,
    setNewMessageImage,
    newMessageImageDimensions,
    setNewMessageImageDimensions,
    selectedMessage,
    openMessageOptions,
    closeMessageOptions,
    optionsBackgroundOpacity,
    copyToClipboard
  } = useMessages(conversation);
  const [selectedImage, setSelectedImage] = useState(null);
  const { getUrl } = useImageCache();
  useEffect(() => {
    console.log(selectedMessage?.text);
    const getSelectedImage = async () => {
      const imageUrl = await getUrl(selectedMessage._id);
      if (!imageUrl) {
        closeMessageOptions();
        return;
      }
      setSelectedImage(imageUrl);
    }
    if (selectedMessage?.type === "image") {
      getSelectedImage();
    }
  }, [selectedMessage]);
  useEffect(() => {
    const handleRevealPhaseStartedInChat = () => {
      if (conversation._id === user.currentPair.conversation._id) {
        setConversation((prev) => ({
          ...prev,
          status: "revealing",
        }));
      }
    };
    socket.on("revealPhaseStarted", handleRevealPhaseStartedInChat);
    return () => {
      socket.off("revealPhaseStarted", handleRevealPhaseStartedInChat);
    };
  }, [socket]);
  const [showTime, setShowTime] = useState(false);
  const toggleTime = () => {
    setShowTime((prev) => !prev);
  };
  const hideTime = () => {
    if (showTime) {
      setShowTime(false);
    }
  };
  const mainGesture = Gesture.Tap().onTouchesDown(() => {
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
              hideTime={hideTime}
              imageHeight={newMessageImageDimensions.height}
              openMessageOptions={openMessageOptions}
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
        sendImageMessage={sendImageMessage}
        conversationId={conversation._id}
        receiverId={otherUser._id}
        image={newMessageImage}
        setImage={setNewMessageImage}
        imageRenderDimensions={newMessageImageDimensions}
        setImageRenderDimensions={setNewMessageImageDimensions}
      ></MessageInput>
      {selectedMessage && (
        <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 1000, opacity: optionsBackgroundOpacity }]}>
          <TouchableWithoutFeedback onPress={closeMessageOptions}>
            <BlurView
              intensity={70}
              tint="dark"
              style={StyleSheet.absoluteFillObject}
            />
          </TouchableWithoutFeedback>

          <View style={[styles.overlayContent, {bottom:selectedMessage.type==="text"?120:240}]}>
            <View style={selectedMessage.type === "text" && styles.selectedMessage}>
              {selectedMessage.text ?
                <Text style={styles.selectedText}>{selectedMessage.text}</Text> :
                <View style={styles.selectedImageWrapper}>
                  <Image style={{
                    width: selectedMessage?.imageDimensions.width,
                    height: selectedMessage?.imageDimensions.height
                  }}
                    source={{ uri: selectedImage }}
                  /></View>}

            </View>
            <MessageOptions type={selectedMessage.text ? "text" : "image"} message={selectedMessage} conversation={conversation} copyToClipboard={copyToClipboard} />
          </View>
        </Animated.View>
      )}
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
  overlayContent: {
    position: "absolute",
    bottom: 120,
    right: 20,
    alignItems: "flex-end",
  },
  selectedMessage: {
    maxWidth:"90%",
    backgroundColor: colors.white70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowRadius: 4,
    shadowOpacity: 0.075,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedImageWrapper:{
    borderRadius:10,
    overflow:'hidden',
    marginBottom:15
  },
  selectedText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
});
export default ChatScreen;
