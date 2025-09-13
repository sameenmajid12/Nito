import { Image } from "expo-image";
import { TextInput, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function ProfileSocialInput({ platform, editing, changes, setValue, user, openSocialLink, isUser }) {
  const placeholder =
    platform === "Instagram" || platform === "Snapchat" || platform === "Discord"
      ? "Username"
      : platform === "LinkedIn"
        ? "Profile URL"
        : "";
  const image =
    platform === "Instagram"
      ? require("../../assets/images/instagram.webp")
      : platform === "Snapchat"
        ? require("../../assets/images/snapchat.webp")
        : platform === "LinkedIn"
          ? require("../../assets/images/linkedin.webp")
          : platform === "Discord"
            ? require("../../assets/images/discord.webp")
            : "";

  return (
    <TouchableWithoutFeedback onPress={() => openSocialLink(platform.toLowerCase(), user.socialMedia[platform.toLowerCase()])} >
      <View style={styles.mainContainer}>
        <View style={styles.labelWrapper}>
          <Text
            style={[
              styles.label,
              editing ? { color: colors.primary } : { color: colors.textPrimary70 },
            ]}
          >
            {platform}
          </Text>
          {((isUser && user.socialMedia[platform.toLowerCase()]) || !isUser) && <Ionicons name="link" color={colors.accent70} size={FONT_SIZE_M}></Ionicons>}
        </View>
        <View
          style={[
            styles.inputContainer,
            editing
              ? { borderColor: colors.primary70 }
              : { borderColor: colors.borderLight },
          ]}
        >
          <Image source={image} width={45} height={45}></Image>
          
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            editable={editing}
            value={
              editing
                ? changes[platform.toLowerCase()] ??
                user.socialMedia[platform.toLowerCase()]
                : user.socialMedia[platform.toLowerCase()]
            }
            onChangeText={setValue}
            spellCheck={false}
          ></TextInput>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, maxWidth: "50%" },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3
  },
  label: {
    color: colors.textPrimary70,
    fontFamily: "Nunito-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 10,
  },
  input: {
    fontSize: FONT_SIZE_S,
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    flex: 1,
  },
});
export default ProfileSocialInput;
