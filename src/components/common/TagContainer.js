import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles";
import { FONT_SIZE_S } from "../../styles";
function TagConainer({  tags, setTags }) {
  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };
  return tags.length > 0 ? (
    <ScrollView style={styles.tagsScrollView}>
      <View style={styles.tagsContentWrapper}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagItem}>
            <Text style={styles.tagsText}>{tag}</Text>
            <Pressable onPress={() => removeTag(index)}>
              <Ionicons size={20} color={colors.white} name="close"></Ionicons>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  ) : (
    <View style={{ flex: 1 }}></View>
  );
}
const styles = StyleSheet.create({
  tagsMainContainer: {
    flex: 1,
    rowGap: 10,
    marginTop: 10,
  },
  tagsScrollView: {
  },
  tagsContentWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 5,
    rowGap: 5,
    width: "100%",
  },
  tagHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tagHeaderText: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    padding: 3,
  },
  tagItem: {
    backgroundColor: colors.accent70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderRadius: 999,
  },
  tagsText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});
export default TagConainer;
