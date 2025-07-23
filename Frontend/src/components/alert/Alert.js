import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_S } from "../../styles";
const ALERT_WIDTH = 200;
function Alert({ state, message, _id, closeAlert }) {
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 70,
      duration: 400,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();
    const timeout = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -70,
        duration: 300,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start(() => {
        closeAlert(_id);
      });
    }, 4700);
    return () => {
      clearTimeout(timeout);
    };
  }, [_id]);
  const iconName =
    state === "info"
      ? "information-circle-outline"
      : state === "error"
      ? "remove-circle-outline"
      : state === "success"
      ? "checkmark-circle-outline"
      : state === "warning"
      ? "warning-outline"
      : "";
  const backgroundColor =
    state === "info"
      ? "#3F97FD"
      : state === "error"
      ? "#F95958"
      : state === "success"
      ? "#40CC4D"
      : state === "warning"
      ? "#FFC353"
      : "";
  return (
    <Animated.View
      style={[
        styles.alertContainer,
        {
          transform: [
            { translateY: translateY },
            { translateX: -ALERT_WIDTH / 2 },
          ],
        },
        { backgroundColor: backgroundColor },
      ]}
    >
      <View style={styles.containerLeft}>
        <Ionicons
          size={FONT_SIZE_L}
          color={colors.white}
          name={iconName}
        ></Ionicons>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Pressable onPress={() => closeAlert(_id)}>
        <Ionicons
          size={FONT_SIZE_L}
          color={colors.white}
          name="close-outline"
        ></Ionicons>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  alertContainer: {
    width: ALERT_WIDTH,
    position: "absolute",
    top: 0,
    padding: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    left: "50%",
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
  },
  containerLeft: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  messageText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});
export default Alert;
