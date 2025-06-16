import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_XXL } from "../../styles";
function ProfileTagInput({ error, newTag, setNewTag, addTag }) {
  return (
    <View style={styles.mainContainer}>
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
  );
}
const styles = StyleSheet.create({
  mainContainer:{
    marginBottom:20
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
  errorMessage: {
    color: "red",
    fontFamily: "Nunito-SemiBold",
  },
});
export default ProfileTagInput;
