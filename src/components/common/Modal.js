import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Pressable, Text } from "react-native";
import { useModal } from "../../contexts/ModalContext";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Image } from "expo-image";
import ConfirmationView from "./ConfirmationView";
import SortConnectionsModal from "../connection/SortConnectionModal";

function Modal({ user, conversation, type, sort, changeSort }) {
  if (
    (type === "chatModal" && !conversation) ||
    (type === "userModal" && !user) ||
    (type === "sortModal" && (!sort || !changeSort))
  ) {
    return;
  }
  const { closeModal } = useModal();
  const slideAnim = useRef(new Animated.Value(600)).current;
  const [confirmationType, setConfirmationType] = useState(null);
  const toggleConfirmation = (type, subject) => {
    if (confirmationType) {
      setConfirmationType(null);
    } else {
      setConfirmationType({ type, subject });
    }
  };
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 60,
      duration: 175,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    if (confirmationType) return;
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 150,
      useNativeDriver: true,
    }).start(() => closeModal());
  };
  const cancelConfirmation = () => {
    setConfirmationType(false);
  };
  return (
    <Pressable onPress={handleClose} style={styles.page}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.mainContainer}>
          {confirmationType ? (
            <ConfirmationView
              confirmationType={confirmationType}
              cancelConfirmation={cancelConfirmation}
            />
          ) : type === "userModal" ? (
            <>
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
                onPress={() => toggleConfirmation("remove", "friend")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Remove connection
                </Text>
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
                onPress={() => toggleConfirmation("block", "user")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Block
                </Text>
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
                onPress={() => toggleConfirmation("report", "user")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Report
                </Text>
                <Ionicons
                  style={styles.icon}
                  color={"red"}
                  name="flag-outline"
                ></Ionicons>
              </Pressable>
            </>
          ) : type === "chatModal" ? (
            <>
              <Pressable
                style={({ pressed }) => [
                  styles.modalItem,
                  pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
                ]}
                onPress={() => toggleConfirmation("delete", "conversation")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Delete chat
                </Text>
                <Ionicons
                  style={styles.icon}
                  color={"red"}
                  name="trash-outline"
                ></Ionicons>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalItem,
                  pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
                ]}
                onPress={() => toggleConfirmation("block", "user")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Block
                </Text>
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
                onPress={() => toggleConfirmation("report", "user")}
              >
                <Text style={[styles.modalItemText, { color: "red" }]}>
                  Report
                </Text>
                <Ionicons
                  style={styles.icon}
                  color={"red"}
                  name="flag-outline"
                ></Ionicons>
              </Pressable>
            </>
          ) : type === "sortModal" ? (
            <SortConnectionsModal sort={sort} changeSort={changeSort} />
          ) : null}
        </View>
        {!confirmationType && type !== "sortModal" && (
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        )}
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
export default Modal;
