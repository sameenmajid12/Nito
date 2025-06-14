import { View, StyleSheet } from "react-native";
import ProfileSectionHeader from "./ProfileSectionHeader";
import Input from "../common/Input";
import { colors, FONT_SIZE_S } from "../../styles";
import ProfileSocialMedia from "./ProfileSocialMedia";
function ProfileAboutMe() {
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"About me"} />
      <View style={styles.bodyContainer}>
        <Input
          label={"Bio"}
          containerStyle={{ width: "100%" }}
          inputStyle={[styles.input, { minHeight: 80 }]}
          labelStyle={{ color: colors.textPrimary70 }}
          placeholder={"Write a short bio to share with your connections!"}
          textAlignVertical={true}
        ></Input>
        <View style={styles.majorYearContainer}>
          <Input
            containerStyle={{ flex: 1, maxWidth: "48%" }}
            inputStyle={styles.input}
            labelStyle={{ color: colors.textPrimary70 }}
            label={"Year"}
            placeholder={"Enter class year"}
          ></Input>
          <Input
            containerStyle={{ flex: 1 }}
            labelStyle={{ color: colors.textPrimary70 }}
            label={"Major"}
            inputStyle={styles.input}
            placeholder={"Enter major"}
          ></Input>
        </View>
        <ProfileSocialMedia />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    rowGap: 20,
  },
  bodyContainer: {
    rowGap: 0,
  },
  input: {
    textAlignVertical: "top",
    padding: 12,
    fontSize: FONT_SIZE_S,
    borderRadius: 12,
  },
  majorYearContainer: { flexDirection: "row", width: "100%", columnGap: 10 },
});
export default ProfileAboutMe;
