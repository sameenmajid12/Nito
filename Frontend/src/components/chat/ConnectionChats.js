import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";
function ConnectionChats({ enterChat }) {
  const { user } = useUser();
  const chats = [1, 2, 3, 4, 5];
  return (
    <View style={styles.chatListContainer}>
      <Text style={styles.containerHeader}>Your connections</Text>
      {chats.map((chat, index) => (
        <Pressable
          onPress={() => enterChat(chat)}
          key={index}
          style={[styles.chat, index === 0 ? styles.currentChat : ""]}
        >
          <Image
            style={styles.chatProfilePic}
            source={require("../../assets/images/mike.webp")}
          ></Image>
          <View style={styles.chatDetails}>
            <Text style={styles.chatName}>Mike Ross</Text>
            <Text style={styles.chatLastMessage}>
              Yeah, it was great talking to you!
            </Text>
          </View>
          <Text style={styles.chatLastMessageTime}>9:30PM</Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  chatListContainer: {
    marginTop: 25,
    rowGap: 5,
    width:"100%"
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
