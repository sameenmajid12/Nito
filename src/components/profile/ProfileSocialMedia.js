import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import ProfileSocialInput from "./ProfileSocialInput";
function ProfileSocialMedia() {
  return (
    <View style={{rowGap:15}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Social media</Text>
      </View>
      <View style={{rowGap:5}}>
        <View style={styles.sideBySide}>
          <ProfileSocialInput socialMedia={"Instagram"} />
          <ProfileSocialInput socialMedia={"Snapchat"} />
        </View>
        <View style={styles.sideBySide}>
          <ProfileSocialInput socialMedia={"LinkedIn"} />
          <ProfileSocialInput socialMedia={"Discord"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: 2,
  },
  headerText: {
    color: colors.textLight,
    fontFamily: "Nunito-SemiBold",
  },
  sideBySide: { flexDirection: "row", columnGap: 10 },
});
export default ProfileSocialMedia;
