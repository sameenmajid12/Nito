import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  View,
} from "react-native";
import { colors, FONT_SIZE_M, PRIMARY_ACTIVE_OPACITY } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
function Button({
  title,
  onPress,
  disabled,
  isLoading,
  variant,
  buttonStyle,
  textStyle,
  textIcon,
}) {
  if (!variant) {
    variant = "primary";
  }
  const buttonBGColor = useRef(new Animated.Value(0)).current;

  const animateBackground = (isPressed) => {
    Animated.timing(buttonBGColor, {
      toValue: isPressed ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const backgroundColorInterpolation = buttonBGColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, "#F0E2FF"],
  });
  const innerComponent = isLoading ? (
    <ActivityIndicator
      color={variant === "primary" ? colors.white : colors.purple}
    />
  ) : (
    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}>
      <Text
        style={[
          variant === "primary"
            ? styles.buttonTextPrimary
            : variant === "secondary"
            ? styles.buttonTextSecondary
            : textStyle,
        ]}
      >
        {title}
      </Text>
      {textIcon && (
        <Ionicons
          name={textIcon}
          color={variant === "primary" ? colors.white : colors.primaryDark}
          size={FONT_SIZE_M}
        />
      )}
    </View>
  );
  return variant !== "secondary" ? (
    <TouchableOpacity
      activeOpacity={PRIMARY_ACTIVE_OPACITY}
      style={[
        buttonStyle,
        variant === "primary" ? styles.primaryButton : styles.customButton,
      ]}
      onPress={onPress}
      disabled={disabled || false}
    >
      {innerComponent}
    </TouchableOpacity>
  ) : (
    <Pressable
      onPressIn={() => animateBackground(true)}
      onPressOut={() => animateBackground(false)}
      style={[buttonStyle, styles.secondayButton]}
      onPress={onPress}
    >
      <Animated.View
        style={[
          { backgroundColor: backgroundColorInterpolation },
          styles.secondayButtonInner,
        ]}
      >
        {innerComponent}
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: "0.25",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  secondayButton: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  secondayButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextPrimary: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
  },
  buttonTextSecondary: {
    fontFamily: "Nunito-Medium",
    color: colors.primaryDark,
  },
});

export default Button;
