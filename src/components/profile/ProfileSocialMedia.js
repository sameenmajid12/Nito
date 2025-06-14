import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import SocialInput from "./SocialInput";
function ProfileSocialMedia() {
  return (
    <View style={{rowGap:15}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Social media</Text>
      </View>
      <View style={{rowGap:5}}>
        <View style={styles.sideBySide}>
          <SocialInput socialMedia={"Instagram"} />
          <SocialInput socialMedia={"Snapchat"} />
        </View>
        <View style={styles.sideBySide}>
          <SocialInput socialMedia={"LinkedIn"} />
          <SocialInput socialMedia={"Discord"} />
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
