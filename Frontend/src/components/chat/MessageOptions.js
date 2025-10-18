import { Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XL } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useModal } from "../../contexts/ModalContext";
function MessageOptions({ message, conversation, copyToClipboard, saveImageMessage }) {
  const optionsOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(optionsOpacity, {
      toValue: 1,
      duration: 350,
      delay: 0,
      useNativeDriver: true,
      easing: Easing.easeInOut
    }).start()
  }, []);

  const { openModal } = useModal();
  return (
    <Animated.View style={[styles.mainWrapper, { opacity: optionsOpacity }, message.type === "image" ? styles.imageOptionsWrapper : styles.textOptionsWrapper]}>
      {message.type === "text" ? <TouchableOpacity onPress={() => copyToClipboard(message.text)} style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} size={FONT_SIZE_XL} name="clipboard-outline"></Ionicons>
        <Text style={styles.option}>Copy</Text>
      </TouchableOpacity> : <TouchableOpacity onPress={() => saveImageMessage()} style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} size={FONT_SIZE_XL} name="save-outline"></Ionicons>
        <Text style={styles.option}>Save</Text>
      </TouchableOpacity>}

      <TouchableOpacity onPress={() => openModal({ message, conversation }, "messageModal")} style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} color={"red"} size={FONT_SIZE_XL} name="trash-outline"></Ionicons>
        <Text style={[styles.option, { color: "red" }]}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.white70,
    rowGap: 20,
    paddingLeft: 15,
    paddingRight: 25
  },
  imageOptionsWrapper: {
    borderRadius: 15, paddingVertical: 20,
  },
  textOptionsWrapper: {
    paddingVertical: 20,
    borderRadius: 15
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10
  },
  option: {
    fontFamily: "Nunito-SemiBold", fontSize: FONT_SIZE_S,
    textAlign: "left"
  }
})
export default MessageOptions;