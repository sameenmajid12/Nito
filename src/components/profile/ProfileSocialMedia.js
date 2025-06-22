import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import ProfileSocialInput from "./ProfileSocialInput";
function ProfileSocialMedia({ editing, handleChange, changes }) {
  return (
    <View style={{ rowGap: 15 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Social media</Text>
      </View>
      <View style={{ rowGap: 5 }}>
        <View style={styles.sideBySide}>
          <ProfileSocialInput
            editing={editing}
            changes={changes}
            socialMedia={"Instagram"}
            setValue={(text) => handleChange("instagram", text)}
          />
          <ProfileSocialInput
            editing={editing}
            changes={changes}
            socialMedia={"Snapchat"}
            setValue={(text) => handleChange("snapchat", text)}
          />
        </View>
        <View style={styles.sideBySide}>
          <ProfileSocialInput
            editing={editing}
            changes={changes}
            socialMedia={"LinkedIn"}
            setValue={(text) => handleChange("linkedin", text)}
          />
          <ProfileSocialInput
            editing={editing}
            changes={changes}
            socialMedia={"Discord"}
            setValue={(text) => handleChange("discord", text)}
          />
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
