import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";
import { formatLastMessageTime } from "../../utils/Format";
function ConnectionChats({ navigation }) {
  const { user } = useUser();
  function truncateMessage(message, maxLength, name) {
    if (!message) {
      return `Send a message to ${name}!`;
    }
    if (message.text.length <= maxLength) return message.text;
    return message?.text.slice(0, maxLength - 3) + "...";
  }
  return (
    <View style={styles.conversationListContainer}>
      <Text style={styles.containerHeader}>Your connections</Text>
      {user?.savedConversations?.map((conversation, index) => {
        const userNum = conversation?.user1?._id === user._id ? "user1" : "user2";
        const isRead =
          conversation.lastReadMessages[userNum]?._id === conversation.lastMessage?._id ||
          conversation.lastMessage?.sender === user._id;
        const otherUser = conversation.user1?._id === user._id ? conversation.user2 : conversation.user1;
        return (
          <Pressable
            onPress={() => navigation.navigate("Chat", { conversation })}
            key={index}
            style={({ pressed }) => [
              styles.conversation,
              index === 0 && styles.topconversation,
              pressed
                ? {
                    backgroundColor: colors.black5,
                    borderBottomColor: colors.borderHover,
                    borderTopColor: index === 0 ? colors.borderHover : null,
                  }
                : {
                    backgroundColor: colors.background,
                    borderBottomColor: colors.borderLight,
                  },
            ]}
          >
            <Image
              style={styles.conversationProfilePic}
              source={otherUser.profilePic}
            ></Image>
            <View style={styles.conversationDetails}>
              <Text style={styles.conversationName}>{otherUser.fullname}</Text>
              <Text
                style={[
                  styles.conversationLastMessage,
                  isRead
                    ? { color: colors.textLight, fontFamily: "Nunito-Medium" }
                    : {
                        color: colors.textPrimary,
                        fontFamily: "Nunito-SemiBold",
                      },
                ]}
              >
                {truncateMessage(conversation.lastMessage, 60, otherUser.fullname)}
              </Text>
            </View>
            <Text
              style={[
                styles.conversationLastMessageTime,
                isRead
                  ? { color: colors.textLight }
                  : { color: colors.textPrimary },
              ]}
            >
              {conversation.lastMessage &&
                formatLastMessageTime(new Date(conversation.lastMessage.createdAt))}
            </Text>
            {!isRead && <View style={styles.unreadIndicator}></View>}
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  conversationListContainer: {
    marginTop: 25,
    rowGap: 0,
    width: "100%",
  },
  containerHeader: {
    color: colors.textLight,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    paddingLeft: 20,
  },
  conversation: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  topconversation: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  conversationProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  conversationDetails: {
    rowGap: 2,
  },
  conversationName: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
  },
  conversationLastMessage: {
    color: colors.textLight,
    fontSize: FONT_SIZE_XS,
  },
  conversationLastMessageTime: {
    position: "absolute",
    right: 10,
    top: 10,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_S,
  },
  unreadIndicator: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.primary,
    position: "absolute",
    right: 10,
    top: 37,
  },
});
export default ConnectionChats;
