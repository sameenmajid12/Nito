import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Keyboard,
  Easing,
  Pressable,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../styles";
import { useEffect, useRef, useState } from "react";
import MessageInputImage from "./MessageInputImage";
const ICON_SIZE = 36;
const MIN_INPUT_HEIGHT = 45;
const INITIAL_BOTTOM_VALUE = 0;
function MessageInput({
  message,
  setMessage,
  sendMessage,
  disabled,
  sendImageMessage,
  conversationId,
  receiverId,
  image,
  setImage,
  imageRenderDimensions,
  setImageRenderDimensions,
}) {
  const messageInputTranslateY = useRef(
    new Animated.Value(INITIAL_BOTTOM_VALUE)
  ).current;
  const [modalVisible, setModalVisible] = useState(false);
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
  const pickImage = async () => {
    Keyboard.dismiss();
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const pickedImage = result.assets[0];
      const { uri, width, height } = pickedImage;
      const name = `photo_${Date.now()}.jpg`;
      const type = pickedImage.mimeType;
      const scaleForRender = 150 / Math.max(width, height);
      setImageRenderDimensions({
        width: width * scaleForRender,
        height: height * scaleForRender,
      });
      setImage({ name, type, uri, width, height });
    }
  };
  const closeImage = () => {
    setTimeout(() => {
      setImage(null);
      setImageRenderDimensions({ width: 0, height: 0 });
    }, 50);
  };
  const handleSendMessage = async () => {
    if (!image && !message) {
      return;
    }
    if (image) {
      closeImage();
      await sendImageMessage(image, conversationId, receiverId);
    }
    if (message) {
      sendMessage();
    }
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        { transform: [{ translateY: messageInputTranslateY }] },
      ]}
    >
      {image && (
        <MessageInputImage
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          uri={image.uri}
          imageRenderDimensions={imageRenderDimensions}
          closeImage={closeImage}
        />
      )}

      <Animated.View
        style={[styles.inputContainer, image && styles.inputContainerWithImage]}
      >
        <Pressable onPress={pickImage}>
          <Ionicons
            color={colors.primary}
            size={ICON_SIZE}
            name="add-circle"
          ></Ionicons>
        </Pressable>
        <View style={styles.inputContainerRight}>
          <TextInput
            editable={!disabled}
            value={message}
            onChangeText={setMessage}
            style={styles.messageInput}
            placeholder={!disabled ? "Enter message" : "Conversation has ended"}
            multiline={true}
            placeholderTextColor={colors.textPlaceholder}
          ></TextInput>

          <Pressable onPress={handleSendMessage}>
            <Ionicons
              size={ICON_SIZE}
              color={!image && !message ? colors.primary50 : colors.primary}
              name="arrow-up-circle"
            ></Ionicons>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 85,
    marginBottom: 0,
    position: "absolute",
    bottom: 0,
    right: 25,
    left: 25,
    justifyContent: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputContainer: {
    backgroundColor: colors.background,
    maxHeight: 60,
    borderWidth: 1,
    borderColor: colors.borderLight,
    minHeight: MIN_INPUT_HEIGHT,
    borderRadius: MIN_INPUT_HEIGHT / 2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    columnGap: 5,
    transform: [{ translateY: -10 }],
  },
  attachmentIcon: {
    fontSize: ICON_SIZE,
    color: colors.primary,
  },

  sendIcon: {
    fontSize: ICON_SIZE,
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
  inputContainerWithImage: { borderTopRightRadius: 0, borderTopLeftRadius: 0 },
});

export default MessageInput;
