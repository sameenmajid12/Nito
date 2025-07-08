import { useState, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../contexts/UserContext";

function CurrentChat({ enterChat }) {
  const { user } = useUser();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!user?.currentMatch?.endTime) return 0;
    const diff = Math.floor(
      (new Date(user.currentMatch.endTime) - Date.now()) / 1000
    );
    return diff > 0 ? diff : 0;
  });
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const diff = Math.floor(
        (new Date(user.currentMatch.endTime) - Date.now()) / 1000
      );
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [user?.currentMatch?.endTime]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${seconds} second${
      seconds !== 1 ? "s" : ""
    }`;
  };
  const formatTimestamp = (timestamp) => {
    const secondsAgo = Math.floor((Date.now() - new Date(timestamp)) / 1000);

    if (secondsAgo < 60) return "now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;

    const days = Math.floor(secondsAgo / 86400);
    return `${days}d ago`;
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.time}>
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}{" "}
      </Text>
      <View style={styles.mainContainer}>
        <Image
          source={require("../../assets/images/anonymous-user.png")}
          style={styles.image}
        ></Image>
        <View>
          <Text style={styles.username}>user924810421</Text>
          <Text style={styles.lastMessage}>
            {user?.currentMatch?.lastMessage?.text
              ? `${user.currentMatch.lastMessage.text}... (${formatTimestamp(
                  user.currentMatch.lastMessage.timestamp
                )})`
              : "You have 30 minutes, say hi and see if there’s a match!"}
          </Text>
        </View>
        <TouchableOpacity
          onPressIn={() => {
            Animated.spring(scaleAnim, {
              toValue: 0.95,
              useNativeDriver: true,
              speed: 50,
              bounciness: 5,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
              speed: 20,
              bounciness: 15,
            }).start();
          }}
          style={[styles.buttonContainer, {transform:[{scale:scaleAnim}]}]}
          onPress={() => enterChat(user.currentMatch)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Chat now</Text>
          <Ionicons
            name="arrow-forward"
            size={FONT_SIZE_S}
            color={colors.white}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>
        You both like:{" "}
        <Text style={styles.interests}>
          {Array.isArray(user?.currentMatch?.similarTags) &&
            user.currentMatch.similarTags.map(
              (tag, i) =>
                `${tag}${
                  i === user.currentMatch.similarTags.length - 1 ? "" : ", "
                }`
            )}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 50,
    rowGap: 10,
    maxWidth: 350,
    alignItems: "center",
  },
  mainContainer: {
    minWidth: 350,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    rowGap: 30,
  },
  topContainer: { justifyContent: "center", alignItems: "center", rowGap: 15 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 999,
  },
  username: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    textAlign: "center",
    color: colors.textPrimary,
  },
  lastMessage: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
  },
  buttonContainer: {
    height: 45,
    width: 250,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 2,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
    fontSize: FONT_SIZE_S,
  },
  infoText: {
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
  },
  interests: {
    color: colors.accent,
    fontFamily: "Nunito-Bold",
  },
  time: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
    color: colors.textPrimary,
  },
});
export default CurrentChat;
