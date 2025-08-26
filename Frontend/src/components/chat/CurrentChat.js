import { useState, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XXS,
} from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../contexts/UserContext";
import { getTimeSinceMessage, getTimeUntil } from "../../utils/Format";
import PairEmptyState from "./PairEmptyState";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";
function CurrentChat({ navigation }) {
  const { user } = useUser();
  const { countdowns } = usePhaseTimer();
  const conversation = user.currentConversation;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const formatLastMessage = (message) => {
    if (message.length > 50) {
      return message.slice(0, 50) + "...";
    } else {
      return message;
    }
  };
  const userNum = conversation?.user1._id === user._id ? "user1" : "user2";
  const otherUserNum = userNum === "user1" ? "user2" : "user1";
  const otherUser = conversation?.[otherUserNum];
  const isRead =
    conversation?.lastReadMessages[userNum]?._id ===
      conversation?.lastMessage?._id ||
    conversation?.lastMessage.sender === user._id;
  return (
    <View style={styles.pageContainer}>
      {user.currentConversation ? (
        <>
          <Text style={styles.time}>{countdowns.untilRevealStart}</Text>
          <View style={styles.mainContainer}>
            <Image
              source={require("../../assets/images/anonymous-user.png")}
              style={styles.image}
            ></Image>
            <View>
              <Text style={styles.username}>@{otherUser.username}</Text>
              <View style={styles.lastMessageWrapper}>
                <Text
                  style={[
                    styles.lastMessage,
                    { color: isRead ? colors.textLight : colors.textPrimary },
                  ]}
                >
                  {conversation?.lastMessage?.text
                    ? conversation?.lastMessage?.sender === otherUser._id
                      ? `${formatLastMessage(conversation?.lastMessage?.text)}`
                      : `Message sent`
                    : "You have 30 minutes, say hi and see if there’s a match!"}
                </Text>
                {conversation?.lastMessage && (
                  <Text
                    style={[
                      { color: isRead ? colors.textLight : colors.textPrimary },
                      styles.messageTime,
                    ]}
                  >
                    {getTimeSinceMessage(
                      new Date(conversation?.lastMessage?.createdAt)
                    )}
                  </Text>
                )}

                {!isRead && (
                  <Ionicons
                    name="ellipse"
                    color={colors.accent70}
                    size={FONT_SIZE_XXS}
                  ></Ionicons>
                )}
              </View>
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
              style={[
                styles.buttonContainer,
                { transform: [{ scale: scaleAnim }] },
              ]}
              onPress={() =>
                navigation.navigate("Chat", {
                  conversation: user.currentConversation,
                })
              }
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
              {Array.isArray(user?.currentConversation?.similarTags) &&
                user?.currentConversation?.similarTags?.map(
                  (tag, i) =>
                    `${tag}${
                      i === user.currentConversation.similarTags?.length - 1
                        ? ""
                        : ", "
                    }`
                )}
            </Text>
          </Text>
        </>
      ) : (
        <PairEmptyState />
      )}
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
  lastMessageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  messageTime: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_S,
    marginLeft: 3,
    marginRight: 1,
  },
});
export default CurrentChat;
