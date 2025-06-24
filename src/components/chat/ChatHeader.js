import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
  SIZES,
} from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
function ChatHeader({ navigation }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Pressable onPress={()=>navigation.goBack()}>
          <Ionicons style={styles.icons} name="chevron-back"></Ionicons>
        </Pressable>
        <Image
          style={styles.receiverProfilePic}
          source={require("../../assets/images/mike.webp")}
        ></Image>
        <Text style={styles.receiverName}>Mike Ross</Text>
      </View>
      <View style={styles.headerRight}>
        <Ionicons style={styles.timeIcon} name="time-outline"></Ionicons>
        <Ionicons style={styles.icons} name="ellipsis-horizontal"></Ionicons>
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
    fontSize: FONT_SIZE_L,
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
  },
  receiverProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
export default ChatHeader;
