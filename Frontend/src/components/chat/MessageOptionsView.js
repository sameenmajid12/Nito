import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import MessageOptions from "./MessageOptions";
import { colors } from "../../styles";
import { BlurView } from "expo-blur";
function MessageOptionsView({ selectedImage, selectedMessage, closeMessageOptions, copyToClipboard, saveImageMessage, optionsBackgroundOpacity, conversation }) {
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: 1000, opacity: optionsBackgroundOpacity }]}>
      <TouchableWithoutFeedback onPress={closeMessageOptions}>
        <BlurView
          intensity={70}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      </TouchableWithoutFeedback>

      <View style={[styles.overlayContent, { bottom: selectedMessage.message.type === "text" ? 120 : 240 }, selectedMessage.byUser ? { right: 20, alignItems: "flex-end" } : { left: 20, alignItems: "flex-start" }]}>
        <View style={selectedMessage.message.type === "text" && styles.selectedMessage}>
          {selectedMessage.message.text ?
            <Text style={styles.selectedText}>{selectedMessage.message.text}</Text> :
            <View style={styles.selectedImageWrapper}>
              <Image style={{
                width: selectedMessage.message.imageDimensions.width,
                height: selectedMessage.message.imageDimensions.height
              }}
                source={{ uri: selectedImage }}
              />
              </View>}
        </View>
        <MessageOptions
          type={selectedMessage.message.text ? "text" : "image"}
          image={selectedImage} message={selectedMessage.message}
          conversation={conversation} copyToClipboard={copyToClipboard}
          saveImageMessage={saveImageMessage}
          isByUser={selectedMessage.byUser}
        />
      </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  overlayContent: {
    position: "absolute",
    bottom: 120,
    alignItems: "flex-end",
  },
  selectedMessage: {
    maxWidth: "90%",
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
  selectedImageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15
  },
  selectedText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
})
export default MessageOptionsView;