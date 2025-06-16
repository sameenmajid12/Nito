import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { colors, FONT_SIZE_XXL } from "../../../styles";
import { Ionicons } from "@expo/vector-icons";
import {
  FONT_SIZE_M,
  FONT_SIZE_L,
  FONT_SIZE_XL,
  FONT_SIZE_S,
} from "../../../styles";
import { useState } from "react";
import TagConainer from "../../../components/common/TagContainer";
function ProfileTagsScreen() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(["Poop", "Loop", "Doop"]);
  const [error, setError] = useState({ value: false, message: "" });
  const addTag = () => {
    if (newTag.length > 15) {
      setError({ value: true, message: "Tag is too long" });
      return;
    } else if (tags.length > 15) {
      setError({ value: true, message: "Too many tags" });
      return;
    }
      if (newTag.trim().length === 0) return;
    setError({ value: false, message: "" });
    setTags((prev) => [...prev, newTag]);
    setNewTag("");
  };
  const clear = () => {
    setTags([]);
  };
  const save = () => {};
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Ionicons
          size={FONT_SIZE_L}
          color={colors.textPrimary}
          name="chevron-back"
        ></Ionicons>
        <Text style={styles.headerText}>Tags</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.pageHeader}>Selected tags</Text>
          <Text style={styles.pageSubheader}>
            These are used to match you with students that similar interests
          </Text>
        </View>
        <View>
          <View
            style={[
              styles.inputContainer,
              error.value
                ? { borderColor: "red" }
                : { borderColor: colors.borderLight },
            ]}
          >
            <TextInput
              value={newTag}
              onChangeText={setNewTag}
              style={styles.input}
              placeholder="Add new tag"
            ></TextInput>
            <Pressable onPress={addTag}>
              <Ionicons
                style={[
                  styles.addIcon,
                  newTag === ""
                    ? { color: colors.primary50 }
                    : { color: colors.primary },
                ]}
                name="add-circle"
              ></Ionicons>
            </Pressable>
          </View>
          {error.value ? (
            <Text style={styles.errorMessage}>{error.message}</Text>
          ) : null}
        </View>
        <TagConainer tags={tags} setTags={setTags} />
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={clear}
            style={[styles.clearButton, styles.button]}
          >
            <Text style={styles.clearText}>Clear all</Text>
          </Pressable>
          <Pressable style={[styles.saveButton, styles.button]}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
  },
  contentContainer: {
    padding: 30,
    rowGap: 20,
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
    height: "100%",
  },
  addIcon: {
    fontSize: FONT_SIZE_XXL,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  button: {
    width: 100,
    height: 35,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    borderWidth: 1,
    borderColor: colors.blue,
  },
  clearText: {
    color: colors.blue,
    fontFamily: "Nunito-SemiBold",
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Nunito-SemiBold",
  },
});
export default ProfileTagsScreen;
