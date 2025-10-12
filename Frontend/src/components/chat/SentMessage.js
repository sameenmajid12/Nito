import { View, Text, StyleSheet, Animated, Pressable, Vibration  } from "react-native";
import { useRef, useState } from "react";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
function SentMessage({ text, isFirstByUser, isLastByUser, isLastMessage, openMessageOptions, id }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const holdTimeout = useRef(null);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.8,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();

    holdTimeout.current = setTimeout(() => {
      openMessageOptions(id);
      handlePressOut();
    }, 500);
  };

  const handlePressOut = () => {
    clearTimeout(holdTimeout.current);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <View>
      {isFirstByUser && <Text style={styles.name}>You</Text>}
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.sentMessage,
            isFirstByUser && styles.first,
            isLastByUser && styles.last,
            {
              marginBottom: isLastMessage ? 40 : isLastByUser ? 20 : 0,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  sentMessage: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
    backgroundColor: colors.white70,
    borderRadius: 20,
    maxWidth: "70%",
    marginBottom: 1,
    shadowColor: colors.primary,
    shadowRadius: 4,
    shadowOpacity: 0.075,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  last: {
    shadowRadius: 4,
    shadowOpacity: 0.075,
    shadowOffset: { width: 0, height: 4 },
  },
  name: {
    alignSelf: "flex-end",
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
  },
});
export default SentMessage;
