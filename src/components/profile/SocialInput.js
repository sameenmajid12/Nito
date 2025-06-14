import { Image } from "expo-image";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XS, FONT_SIZE_XXS } from "../../styles";

function SocialInput({ socialMedia }) {
  const placeholder =
    (socialMedia === "Instagram" || socialMedia === "Snapchat")
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
      <Text style={styles.label}>{socialMedia}</Text>
      <View style={styles.inputContainer}>
        <Image source={image} width={45} height={45}></Image>
        <TextInput style={styles.input} placeholder={placeholder}></TextInput>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {flex:1, maxWidth:"50%"},
  label: {
    color: colors.textPrimary70,
    fontFamily: "Nunito-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor:colors.borderLight,
    borderWidth:1,
    borderRadius:12
  },
  input:{
    fontSize:FONT_SIZE_S,
    color:colors.textPrimary,
    fontFamily:"Nunito-SemiBold",
    flex:1
  }
});
export default SocialInput;
