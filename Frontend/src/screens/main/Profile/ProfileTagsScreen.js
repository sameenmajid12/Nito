import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../styles";
import { FONT_SIZE_M, FONT_SIZE_XL, FONT_SIZE_S } from "../../../styles";
import { useEffect, useState } from "react";
import TagContainer from "../../../components/common/TagContainer";
import ProfileTagInput from "../../../components/profile/ProfileTagInput";
import TextHeader from "../../../components/common/TextHeader";
import { useUser } from "../../../contexts/UserContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
function ProfileTagsScreen({ navigation }) {
  const { user, updateTags } = useUser();
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(user.tags);
  const [error, setError] = useState("");
  const [changesMade, setChangesMade] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  useEffect(() => {
    if (
      !tags.every((val, i) => val === user.tags[i]) ||
      user.tags.length !== tags.length
    ) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  }, [tags]);
  const addTag = () => {
    const cleanTag = newTag.trim();
    if (newTag.length > 15) {
      setError("Tag is too long");
      return;
    } else if (tags.length > 15) {
      setError("Too many tags");
      return;
    } else if (tags.includes(cleanTag)) {
      setError("Tag already exists");
      return;
    } else if (cleanTag.length === 0) return;
    setError("");
    setTags((prev) => [...prev, cleanTag]);
    setNewTag("");
  };

  const reset = () => {
    setTags(user.tags);
  };
  const save = async () => {
    if (!changesMade) return;
    else if (tags.length === 0) {
      setError("Please keep at least one tag for better matches!");
    } else {
      setIsLoadingUpdate(true);
      await updateTags(tags);
      setChangesMade(false);
      setIsLoadingUpdate(false);
    }
  };
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  return (
    <GestureDetector gesture={tapGesture}>
      <SafeAreaView style={styles.page}>
        <TextHeader navigation={navigation} text={"Tags"} />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.pageHeader}>Selected tags</Text>
            <Text style={styles.pageSubheader}>
              These are used to match you with students that similar interests
            </Text>
          </View>
          <ProfileTagInput
            error={error}
            newTag={newTag}
            setNewTag={setNewTag}
            addTag={addTag}
          />
          <TagContainer tags={tags} setTags={setTags} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={reset}
              style={[
                changesMade ? styles.clearActive : styles.clearDisabled,
                styles.button,
              ]}
              disabled={!changesMade}
            >
              <Text
                style={
                  changesMade
                    ? styles.clearActiveText
                    : styles.clearDisabledText
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                changesMade ? styles.saveActive : styles.saveDisabled,
                styles.button,
              ]}
              disabled={!changesMade}
              onPress={save}
            >
              {!isLoadingUpdate ? <Text style={styles.saveText}>Save</Text> : <ActivityIndicator color={colors.white}></ActivityIndicator>}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    columnGap: 5,
    height: 41,
  },
  headerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  pageHeader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XL,
    textAlign: "center",
    color: colors.textPrimary,
  },
  pageSubheader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 20,
  },
  contentContainer: {
    padding: 30,
  },

  buttonContainer: {
    flexDirection: "row",
    columnGap: 5,
    marginTop: 10,
  },
  button: {
    width: 100,
    height: 35,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  clearActive: {
    borderWidth: 1,
    borderColor: colors.blue,
  },
  clearDisabled: {
    borderWidth: 1,
    borderColor: colors.blue50,
  },
  clearActiveText: {
    color: colors.blue,
    fontFamily: "Nunito-SemiBold",
  },
  clearDisabledText: {
    color: colors.blue50,
    fontFamily: "Nunito-SemiBold",
  },
  saveActive: {
    backgroundColor: colors.primary,
  },
  saveDisabled: {
    backgroundColor: colors.primary70,
  },
  saveText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
});
export default ProfileTagsScreen;
