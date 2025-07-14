import { View, StyleSheet } from "react-native";
import ProfileSectionHeader from "./ProfileSectionHeader";
import Input from "../common/Input";
import { colors, FONT_SIZE_S } from "../../styles";
import ProfileSocialMedia from "./ProfileSocialMedia";
import { useUser } from "../../contexts/UserContext";
function ProfileAboutMe({
  editing,
  changesMade,
  changes,
  setChanges,
  setChangesMade,
}) {
  const { user } = useUser();
  const handleChange = (field, value) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [field]: value,
    }));
    if (!changesMade) {
      setChangesMade(true);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"About me"} />
      <View style={styles.bodyContainer}>
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
        <View style={styles.majorYearContainer}>
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
        </View>
        <ProfileSocialMedia
          editing={editing}
          handleChange={handleChange}
          changes={changes}
        />
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
