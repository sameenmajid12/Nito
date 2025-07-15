import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { FONT_SIZE_M, colors } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
function ConfirmationView({ confirmationType, cancelConfirmation }) {
  const { logout } = useAuth();
  const icon =
    confirmationType.type === "block"
      ? "remove-circle"
      : confirmationType.type === "report"
      ? "warning"
      : confirmationType.type === "delete"
      ? "trash-bin"
      : confirmationType.type === "remove"
      ? "close-circle"
      : confirmationType.type === "logout"
      ? "log-out"
      : "";
  const subheader =
    confirmationType.type === "block"
      ? "This action will stop all interaction between you and the user."
      : confirmationType.type === "report"
      ? "If we find this user is violating our guidelines, appropriate action will be taken."
      : confirmationType.type === "delete"
      ? "This will delete the conversation from your chat list. It won't be removed for the other person."
      : confirmationType.type === "remove"
      ? "This action will remove your connection. You cannot connect with this user again."
      : confirmationType.type === "logout"
      ? "You’ll need to sign in again to access your account."
      : "";
  const handleConfirmation = () => {
    switch (confirmationType.type) {
      case "block":
        console.log("Blocking user");
        break;
      case "report":
        console.log("Reporting user");
        break;
      case "delete":
        console.log("Deleting user");
        break;
      case "remove":
        console.log("Removing connections");
        break;
      case "logout":
        logout();
        break;
    }
  };
  const scaleAnimNo = useRef(new Animated.Value(1)).current;
  const scaleAnimYes = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.confirmationContainer}>
      <Ionicons name={icon} size={64} color={"red"} />
      <View style={styles.confirmationText}>
        <Text style={styles.confirmationTextHeader}>
          Are you sure you want to {confirmationType.type}
          {" "}
          {confirmationType.type === "logout"
            ? ""
            : `this ${confirmationType.subject}`}
          ?
        </Text>
        <Text style={styles.confirmationTextSubheader}>{subheader}</Text>
      </View>

      <View style={styles.confirmationButtonsContainer}>
        <TouchableOpacity
          style={[styles.yesButton, { transform: [{ scale: scaleAnimYes }] }]}
          onPressIn={() => {
            Animated.spring(scaleAnimYes, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(scaleAnimYes, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
          activeOpacity={0.75}
          onPress={handleConfirmation}
        >
          <Text style={styles.yesButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.noButton, { transform: [{ scale: scaleAnimNo }] }]}
          onPressIn={() => {
            Animated.spring(scaleAnimNo, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(scaleAnimNo, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
          onPress={cancelConfirmation}
        >
          <Text style={styles.noButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  confirmationContainer: {
    alignItems: "center",
    padding: 25,
    rowGap: 20,
  },
  confirmationText: {
    alignItems: "center",
  },
  confirmationTextHeader: {
    color: "red",
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    fontSize: FONT_SIZE_M,
  },
  confirmationTextSubheader: {
    color: colors.textLight,
    textAlign: "center",
    fontFamily: "Nunito-Medium",
  },
  confirmationButtonsContainer: {
    flexDirection: "row",
    columnGap: 20,
  },
  yesButton: {
    backgroundColor: "red",
    width: 130,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noButton: {
    width: 130,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noButtonText: {
    color: "red",
    fontFamily: "Nunito-Medium",
  },
  yesButtonText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
});
export default ConfirmationView;
