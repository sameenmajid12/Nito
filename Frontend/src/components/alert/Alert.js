import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  PanResponder,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_XS } from "../../styles";

const ALERT_WIDTH = 200;

function Alert({ state, message, _id, closeAlert }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 70,
      duration: 400,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start();

   const timeout = setTimeout(() => closeAlert(), 4700);

    return () => clearTimeout(timeout);
  }, []);

  const dismissAlert = () => {
    Animated.timing(translateY, {
      toValue: -200,
      duration: 200,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start(() => closeAlert(_id));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        translateY.setValue(70 + gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState.dy);
        if (gestureState.dy < -40) {
          dismissAlert();
        } else {
          Animated.spring(translateY, {
            toValue: 70,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

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
      ? colors.accent70
      : state === "warning"
      ? "#FFC353"
      : "";

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.alertContainer,
        {
          transform: [{ translateY }, { translateX: -ALERT_WIDTH / 2 }],
          backgroundColor,
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.containerLeft}>
        <Ionicons size={FONT_SIZE_L} color={colors.white} name={iconName} />
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <Pressable onPress={dismissAlert}>
        <Ionicons size={FONT_SIZE_L} color={colors.white} name="close-outline" />
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
  },
  containerLeft: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  messageText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XS,
  },
});

export default Alert;
