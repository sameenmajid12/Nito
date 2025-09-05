import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import ProfileSocialInput from "./ProfileSocialInput";
import ProfileSectionHeader from "./ProfileSectionHeader";
function ProfileSocialMedia({ editing, handleChange, changes, user, isUser, hasAboutSection }) {
  const hasInstagram = !isUser && user.socialMedia?.instagram;
  const hasSnapchat = !isUser && user.socialMedia?.snapchat;
  const hasLinkedin = !isUser && user.socialMedia?.linkedin;
  const hasDiscord = !isUser && user.socialMedia?.discord;
  const hasSocials = (hasInstagram || hasSnapchat || hasLinkedin || hasDiscord) || isUser
  if (!hasSocials) return;
  return (
    <View style={styles.sectionWrapper}>
      <View style={[styles.headerContainer, { borderBottomWidth: hasAboutSection ? 1 : 0 }]}>
        {hasAboutSection ? <Text style={styles.headerText}>Social media</Text> : <ProfileSectionHeader header={"Social media"} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.sideBySide}>
          {(isUser || (!isUser && hasInstagram)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              socialMedia={"Instagram"}
              setValue={(text) => handleChange("instagram", text)}
              user={user}
            />
          )}
          {(isUser || (!isUser && hasSnapchat)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              socialMedia={"Snapchat"}
              setValue={(text) => handleChange("snapchat", text)}
              user={user}
            />
          )}
        </View>
        <View style={styles.sideBySide}>
          {(isUser || (!isUser && hasLinkedin)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              socialMedia={"LinkedIn"}
              setValue={(text) => handleChange("linkedin", text)}
              user={user}
            />
          )}
          {(isUser || (!isUser && hasDiscord)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              socialMedia={"Discord"}
              setValue={(text) => handleChange("discord", text)}
              user={user}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    rowGap: 15
  },
  contentContainer: {
    rowGap: 5
  },
  headerContainer: {
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
