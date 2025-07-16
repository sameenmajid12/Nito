import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";
function ConnectionChats({ enterChat }) {
  const { user } = useUser();
  const chats = [
    {
      fullname: "SZA",
      profilePic: require("../../assets/images/sza.webp"),
      lastMessage:
        "If you could teleport anywhere right now, where would you go?",
      time: "4:15PM",
    },
    {
      fullname: "Ilia Topuria",
      profilePic: require("../../assets/images/ilia.jpg"),
      lastMessage:
        "I j got a 42 on the DSA exam I should prob stick to fighting",
      time: "11:22AM",
    },
    {
      fullname: "Mike Ross",
      profilePic: require("../../assets/images/mike.webp"),
      lastMessage:
        "You ever notice how our prof talks about negligence like it’s a personality trait?",
      time: "11:08PM",
    },
    {
      fullname: "Daniel Cormier",
      profilePic: require("../../assets/images/dc.jpg"),
      lastMessage: "Yeah, it was great meeting you!",
      time: "9:35AM",
    },{
      fullname: "Harvey Specter",
      profilePic: require("../../assets/images/harvey.jpg"),
      lastMessage: "I was more focused on getting out of that lecture than what case we were reviewing",
      time: "9:35AM",
    },
  ];
  function truncateMessage(message, maxLength) {
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength - 3) + "...";
  }
  return (
    <View style={styles.chatListContainer}>
      <Text style={styles.containerHeader}>Your connections</Text>
      {chats.map((chat, index) => (
        <Pressable
          onPress={() => enterChat(chat)}
          key={index}
          style={[styles.chat, index === 0 ? styles.currentChat : ""]}
        >
          <Image style={styles.chatProfilePic} source={chat.profilePic}></Image>
          <View style={styles.chatDetails}>
            <Text style={styles.chatName}>{chat.fullname}</Text>
            <Text style={styles.chatLastMessage}>
              {truncateMessage(chat.lastMessage, 60)}
            </Text>
          </View>
          <Text style={styles.chatLastMessageTime}>{chat.time}</Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  chatListContainer: {
    marginTop: 25,
    rowGap: 5,
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
    borderBottomColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  currentChat: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
    fontFamily: "Nunito-Medium",
    color: colors.textLight,
    fontSize: FONT_SIZE_XS,
  },
  chatLastMessageTime: {
    position: "absolute",
    right: 10,
    top: 10,
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_S,
  },
});
export default ConnectionChats;
