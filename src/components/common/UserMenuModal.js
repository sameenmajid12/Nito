import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import { useModal } from "../../contexts/ModalContext";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Image } from "expo-image";

function UserMenuModal({ user }) {
  const { closeModal } = useModal();
  const slideAnim = useRef(new Animated.Value(600)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 60,
      duration: 175,
      useNativeDriver: true,
    }).start();
  }, []);
  const containerRef = useRef(null);
  return (
    <Pressable onPress={closeModal} style={styles.page}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.mainContainer}>
          <View style={styles.modalItem}>
            <View style={styles.userDetails}>
              <Image
                style={styles.userProfilePic}
                source={require("../../assets/images/mike.webp")}
              ></Image>
              <Text style={styles.modalItemText}>Mike Ross</Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" }, 
            ]}
          >
            <Text style={styles.modalItemText}>Send message</Text>
            <Ionicons
              style={styles.icon}
              name="chevron-forward-outline"
            ></Ionicons>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" }, 
            ]}
          >
            <Text style={styles.modalItemText}>View profile</Text>
            <Ionicons
              style={styles.icon}
              name="chevron-forward-outline"
            ></Ionicons>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" }, 
            ]}
          >
            <Text style={[styles.modalItemText, {color:"red"}]}>Remove connection</Text>
            <Ionicons
              style={styles.icon}
              name="person-remove-outline"
              color={"red"}
            ></Ionicons>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" }, 
            ]}
          >
            <Text style={[styles.modalItemText, {color:"red"}]}>Block</Text>
            <Ionicons
              style={styles.icon}
              color={"red"}
              name="remove-circle-outline"
            ></Ionicons>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
          >
            <Text style={[styles.modalItemText,{color:"red"}]}>Report</Text>
            <Ionicons
              style={styles.icon}
              color={"red"}
              name="flag-outline"
            ></Ionicons>
          </Pressable>
        </View>
        <Pressable style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  page: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 400,
  },
  animatedContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    rowGap: 10,
  },
  mainContainer: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalItemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  closeButton: {
    width: "100%",
    backgroundColor: colors.background,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  closeButtonText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  userProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  icon: {
    fontSize: FONT_SIZE_L,
  },
});
export default UserMenuModal;
