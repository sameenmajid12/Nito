import { View, StyleSheet } from "react-native";
import { colors } from "../../styles";
import { FONT_SIZE_S } from "../../styles";
import TagItem from "./TagItem";
function TagContainer({ tags, setTags }) {
  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };
  return tags.length > 0 ? (
    <View style={styles.tagsContentWrapper}>
      {tags.map((tag, index) => (
        <TagItem
          tag={tag}
          index={index}
          removeTag={removeTag}
          myTag={true}
          key={tag}
        ></TagItem>
      ))}
    </View>
  ) : (
    <View style={{ flex: 1 }}></View>
  );
}
const styles = StyleSheet.create({
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
export default TagContainer;
