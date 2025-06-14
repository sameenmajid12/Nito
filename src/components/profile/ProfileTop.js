import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { FONT_SIZE_S, colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function ProfileTop() {
  return (
    <View style={styles.profileTop}>
      <Image
        source={require("../../assets/images/mike.webp")}
        style={styles.profilePicture}
      ></Image>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.fullname}>Mike Ross</Text>
        <Text style={styles.username}>@user21284912</Text>
      </View>
      <Pressable style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
        <Ionicons
          name="create-outline"
          size={FONT_SIZE_S}
          color={colors.primary}
        ></Ionicons>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  profileTop: {
    alignItems: "center",
    rowGap: 15,
  },
  fullname: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
  username: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
    color: colors.textLight,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 999,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    columnGap: 5,
    position: "absolute",
    right: 0,
    borderRadius: 5,
  },
  editText: {
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
});
export default ProfileTop;
