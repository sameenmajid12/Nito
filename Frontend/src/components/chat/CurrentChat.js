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
import { getTimeSinceMessage } from "../../utils/Format";
import PairEmptyState from "./PairEmptyState";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";
import { useConversation } from "../../contexts/ConversationContext";
function CurrentChat() {
  const { user } = useUser();
  const { countdowns } = usePhaseTimer();
  const { openConversation, isCurrentConvoDeleted } = useConversation();
  const conversation = user.currentPair.conversation;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const formatLastMessage = (message) => {
    if (!message) {

    }
    if (message.sender === user._id) {
      return "Message sent";
    }
    if (message.type === "image") {
      return "Image received";
    }
    if (message.length > 50) {
      return message.text?.slice(0, 20) + "...";
    } else {
      return message?.text;
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
      {(user.currentPair.conversation && !isCurrentConvoDeleted) ? (
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
                  numberOfLines={conversation.lastMessage?.text ? 1 : 2}
                  ellipsizeMode="tail"
                >
                  {conversation?.lastMessage
                    ? `${formatLastMessage(conversation?.lastMessage)}`
                    : "You have 30 minutes, say hi and see if there’s a match!"}
                </Text>
                {conversation?.lastMessage && (
                  <Text
                    style={[
                      { color: isRead ? colors.textLight : colors.textPrimary },
                      styles.messageTime,
                    ]}
                  >
                    {`(${getTimeSinceMessage(
                      new Date(conversation?.lastMessage?.createdAt)
                    )})`}
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
                openConversation(user.currentPair.conversation, true)
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
            Similar tags:{" "}
            <Text style={styles.interests}>
              {Array.isArray(
                user?.currentPair?.[`${otherUserNum}SimilarTags`]
              ) &&
                user?.currentPair?.[`${otherUserNum}SimilarTags`]?.map(
                  (tag, i) =>
                    `${tag}${i ===
                      user?.currentPair?.[`${otherUserNum}SimilarTags`].length -
                      1
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
