import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Pressable, Text } from "react-native";
import { useModal } from "../../contexts/ModalContext";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Image } from "expo-image";
import ConfirmationView from "./ConfirmationView";
import SortConnectionsModal from "./SortConnectionModal";
import DailyPollModal from "./DailyPollModal";
import UserModal from "./UserModal";
import ChatModal from "./ChatModal";

function Modal({ user, conversation, type, sort, changeSort, pollData }) {
  console.log(type);
  console.log(pollData);
  if (
    (type === "chatModal" && !conversation) ||
    (type === "userModal" && !user) ||
    (type === "sortModal" && (!sort || !changeSort)) ||
    (type === "pollModal" && !pollData)
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
    }).start(({ finished }) => {
      if (finished) {
        closeModal();
      }
    });
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
          type==="pollModal"?{right:10, left:10}:{right:20, left:20}
        ]}
      >
        <View style={[styles.mainContainer, type==="pollModal"?{borderRadius:20}:{borderRadius:15}]}>
          {confirmationType ? (
            <ConfirmationView
              confirmationType={confirmationType}
              cancelConfirmation={cancelConfirmation}
            />
          ) : type === "userModal" ? (
            <UserModal user={user} toggleConfirmation={toggleConfirmation} />
          ) : type === "chatModal" ? (
            <ChatModal
              conversation={conversation}
              toggleConfirmation={toggleConfirmation}
            />
          ) : type === "sortModal" ? (
            <SortConnectionsModal
              sort={sort}
              changeSort={changeSort}
              handleClose={handleClose}
            />
          ) : type === "pollModal" ? (
            <DailyPollModal data={pollData} handleClose={handleClose} />
          ) : null}
        </View>
        {!confirmationType && type !== "sortModal" && type !== "pollModal" && (
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

    bottom: 100,
    rowGap: 10,
  },
  mainContainer: {
    width: "100%",
    backgroundColor: colors.background,
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
});
export default Modal;
