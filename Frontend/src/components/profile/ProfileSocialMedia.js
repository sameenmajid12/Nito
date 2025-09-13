import { StyleSheet, Text, View, Linking } from "react-native";
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
  const openSocialLink = async (platform, data) => {
    console.log(platform);
    console.log(data);
    let appUrl = "";
    let webUrl = "";
    switch (platform) {
      case "instagram":
        appUrl = `instagram://user?username=${data}`;
        webUrl = `https://www.instagram.com/${data}`;
        break;
      case "snapchat":
        appUrl = `snapchat://add/${data}`;
        webUrl = `https://www.snapchat.com/add/${data}`;
        break;
      case "linkedin":
        const username = data.split("linkedin.com/in/")[1];
        appUrl = `linkedin://in/${username}`;
        webUrl = data;
        break;
      case "discord":
        appUrl = `https://discord.com/users/${data}`;
        webUrl = `https://discord.com/users/${data}`;
        break;
      default:
        break;
    }
    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      Linking.openURL(appUrl);
    } else {
      Linking.openURL(webUrl);
    }
  }
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
              platform={"Instagram"}
              setValue={(text) => handleChange("instagram", text)}
              user={user}
              openSocialLink={openSocialLink}
              isUser={isUser}
            />
          )}
          {(isUser || (!isUser && hasSnapchat)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              platform={"Snapchat"}
              setValue={(text) => handleChange("snapchat", text)}
              user={user}
              openSocialLink={openSocialLink}
              isUser={isUser}
            />
          )}
        </View>
        <View style={styles.sideBySide}>
          {(isUser || (!isUser && hasLinkedin)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              platform={"LinkedIn"}
              setValue={(text) => handleChange("linkedin", text)}
              user={user}
              openSocialLink={openSocialLink}
              isUser={isUser}
            />
          )}
          {(isUser || (!isUser && hasDiscord)) && (
            <ProfileSocialInput
              editing={editing}
              changes={changes}
              platform={"Discord"}
              setValue={(text) => handleChange("discord", text)}
              user={user}
              openSocialLink={openSocialLink}
              isUser={isUser}
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
