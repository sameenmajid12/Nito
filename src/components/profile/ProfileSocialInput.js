import { Image } from "expo-image";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XS, FONT_SIZE_XXS } from "../../styles";
import { useUser } from "../../contexts/UserContext";

function ProfileSocialInput({ socialMedia, editing, changes, setValue }) {
  const { user } = useUser();
  const placeholder =
    socialMedia === "Instagram" || socialMedia === "Snapchat"
      ? "Username"
      : socialMedia === "LinkedIn"
      ? "Profile URL"
      : socialMedia === "Discord"
      ? "Tag"
      : "";
  const image =
    socialMedia === "Instagram"
      ? require("../../assets/images/instagram.webp")
      : socialMedia === "Snapchat"
      ? require("../../assets/images/snapchat.webp")
      : socialMedia === "LinkedIn"
      ? require("../../assets/images/linkedin.webp")
      : socialMedia === "Discord"
      ? require("../../assets/images/discord.webp")
      : "";

  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.label, editing ? {color:colors.primary}:{color:colors.textPrimary70}]}>{socialMedia}</Text>
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
              ? changes[socialMedia.toLowerCase()] ??
                user.socialMedia[socialMedia.toLowerCase()]
              : user.socialMedia[socialMedia.toLowerCase()]
          }
          onChangeText={setValue}
          spellCheck={false}
        ></TextInput>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, maxWidth: "50%" },
  label: {
    color: colors.textPrimary70,
    fontFamily: "Nunito-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight:10
  },
  input: {
    fontSize: FONT_SIZE_S,
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    flex: 1,
  },
});
export default ProfileSocialInput;
