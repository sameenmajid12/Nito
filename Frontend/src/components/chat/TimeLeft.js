import { View, Text, Animated, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { colors, FONT_SIZE_XXL } from "../../styles";
function TimeLeft({ time, showTime, toggleTime }) {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };
    const fadeOut = () => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    };
    if (showTime) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [showTime]);
  return (
    <View style={styles.sectionWrapper}>
      <Pressable onPress={toggleTime}>
        <Ionicons
          name="time-outline"
          color={showTime ? colors.accent70 : colors.textPrimary}
          size={FONT_SIZE_XXL}
        ></Ionicons>
      </Pressable>
      <Animated.View style={[styles.timeContainer, { opacity: opacityAnim }]}>
        <Text style={styles.timeText}>{time}</Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  timeContainer: {
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.accent70,
    position: "absolute",
    zIndex: 100,
    right: 0,
    top: 40,
    minWidth: 120,
    flexDirection: "row",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
  },
});
export default TimeLeft;
