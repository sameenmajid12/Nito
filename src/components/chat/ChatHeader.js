import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_XL, FONT_SIZE_XXL } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useModal } from "../../contexts/ModalContext";

function ChatHeader({ navigation, usersRevealed, otherUser, conversation }) {
  const name = usersRevealed ? otherUser.fullName : otherUser.username;
  const image = usersRevealed
    ? require("../../assets/images/mike.webp")
    : require("../../assets/images/anonymous-user.png");
  const { openModal } = useModal();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons style={styles.icons} name="chevron-back"></Ionicons>
        </Pressable>
        <Image style={styles.receiverProfilePic} source={image}></Image>
        <Text style={styles.receiverName}>{name}</Text>
      </View>
      <View style={styles.headerRight}>
        <Ionicons style={styles.timeIcon} name="time-outline"></Ionicons>
        <TouchableOpacity onPress={()=>openModal(conversation, "chatModal")}>
          <Ionicons style={styles.icons} name="ellipsis-horizontal"></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
  },
  icons: {
    fontSize: FONT_SIZE_XL,
    color: colors.textPrimary,
  },
  timeIcon: {
    fontSize: FONT_SIZE_XXL,
    color: colors.textPrimary,
  },
  receiverName: {
    fontSize: FONT_SIZE_M,
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
  },
  receiverProfilePic: {
    width: 35,
    height: 35,
    borderRadius: 999,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
export default ChatHeader;
