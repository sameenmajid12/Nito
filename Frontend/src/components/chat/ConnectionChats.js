import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";
function ConnectionChats({ enterChat }) {
  const { user } = useUser();
  function truncateMessage(message, maxLength, name) {
    if (!message) {
      return `Send a message to ${name}!`;
    }
    if (message.text.length <= maxLength) return message.text;
    return message?.text.slice(0, maxLength - 3) + "...";
  }
  return (
    <View style={styles.chatListContainer}>
      <Text style={styles.containerHeader}>Your connections</Text>
      {user?.savedConversations.map((chat, index) => {
        const userNum = chat.user1._id === user._id ? "user1" : "user2";
        const isRead =
          chat.lastReadMessages[userNum]?._id === chat.lastMessage?._id ||
          chat.lastMessage?.sender === user._id;
        const formatter = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const formattedLastMessageTime = chat.lastMessage
          ? formatter.format(new Date(chat.lastMessage.createdAt))
          : null;
        const otherUser = chat.user1._id === user._id ? chat.user2 : chat.user1;
        return (
          <Pressable
            onPress={() => enterChat(chat)}
            key={index}
            style={({ pressed }) => [
              styles.chat,
              index === 0 && styles.topChat,
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
              style={styles.chatProfilePic}
              source={otherUser.profilePic}
            ></Image>
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{otherUser.fullname}</Text>
              <Text
                style={[
                  styles.chatLastMessage,
                  isRead
                    ? { color: colors.textLight, fontFamily: "Nunito-Medium" }
                    : {
                        color: colors.textPrimary,
                        fontFamily: "Nunito-SemiBold",
                      },
                ]}
              >
                {truncateMessage(chat.lastMessage, 60, otherUser.fullname)}
              </Text>
            </View>
            <Text
              style={[
                styles.chatLastMessageTime,
                isRead
                  ? { color: colors.textLight }
                  : { color: colors.textPrimary },
              ]}
            >
              {formattedLastMessageTime}
            </Text>
            {!isRead && <View style={styles.unreadIndicator}></View>}
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  chatListContainer: {
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
  chat: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  topChat: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  chatProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  chatDetails: {
    rowGap: 2,
  },
  chatName: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
  },
  chatLastMessage: {
    color: colors.textLight,
    fontSize: FONT_SIZE_XS,
  },
  chatLastMessageTime: {
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
