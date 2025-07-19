import { View, StyleSheet } from "react-native";
import ProfileSectionHeader from "./ProfileSectionHeader";
import Input from "../common/Input";
import { colors, FONT_SIZE_S } from "../../styles";
import ProfileSocialMedia from "./ProfileSocialMedia";
function ProfileAboutMe({
  editing = false,
  changesMade,
  changes,
  setChanges,
  setChangesMade,
  user,
  isUser,
}) {
  const handleChange = (field, value) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [field]: value,
    }));
    if (!changesMade) {
      setChangesMade(true);
    }
  };
  const hasBio = !isUser && user.bio?.length > 0;
  const hasYear = !isUser && user.year;
  const hasMajor = !isUser && user.major?.length > 0;
  return (
    <View style={styles.sectionWrapper}>
      <ProfileSectionHeader header={"About me"} />
      <View style={styles.contentContainer}>
        {(isUser || (!isUser && hasBio)) && (
          <Input
            label={"Bio"}
            containerStyle={{ width: "100%" }}
            inputStyle={[styles.input, { minHeight: 80 }]}
            labelStyle={
              editing
                ? { color: colors.primary }
                : { color: colors.textPrimary70 }
            }
            placeholder={"Write a short bio to share with your connections!"}
            textAlignVertical={true}
            editable={editing}
            value={editing ? changes.bio ?? user.bio : user.bio}
            setValue={(text) => handleChange("bio", text)}
          ></Input>
        )}
        <View style={styles.majorYearContainer}>
          {(isUser || (!isUser && hasYear)) && (
            <Input
              containerStyle={{ flex: 1, maxWidth: "48%" }}
              inputStyle={styles.input}
              labelStyle={
                editing
                  ? { color: colors.primary }
                  : { color: colors.textPrimary70 }
              }
              label={"Year"}
              placeholder={"Enter class year"}
              editable={editing}
              value={
                editing
                  ? String(changes.year ?? user.year ?? "")
                  : String(user.year ?? "")
              }
              setValue={(text) => handleChange("year", text)}
            ></Input>
          )}
          {(isUser || (!isUser && hasMajor)) && (
            <Input
              containerStyle={{ flex: 1 }}
              labelStyle={
                editing
                  ? { color: colors.primary }
                  : { color: colors.textPrimary70 }
              }
              label={"Major"}
              inputStyle={styles.input}
              placeholder={"Enter major"}
              editable={editing}
              value={editing ? changes.major ?? user.major : user.major}
              setValue={(text) => handleChange("major", text)}
            ></Input>
          )}
        </View>
        <ProfileSocialMedia
          editing={editing}
          handleChange={handleChange}
          changes={changes}
          isUser={isUser}
          user={user}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionWrapper: {
    rowGap: 20,
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
