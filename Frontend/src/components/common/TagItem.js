import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { colors, FONT_SIZE_S } from "../../styles";
import { scaleSize } from "../../styles";
function TagItem({ myTag, tag, removeTag, addTag, index }) {
  const iconNameForMyTag = myTag && !removeTag ? "checkmark" : "close";
  return (
    <View
      key={index}
      style={[
        styles.tagContainer,
        { backgroundColor: myTag ? colors.accent70 : colors.primary50 },
      ]}
    >
      <Text style={styles.tagText}>{tag}</Text>
      {myTag ? (
        <Pressable onPress={() => (removeTag ? removeTag(index) : {})}>
          <Ionicons
            size={20}
            color={colors.white}
            name={iconNameForMyTag}
          ></Ionicons>
        </Pressable>
      ) : (
        <Pressable onPress={() => addTag(tag)}>
          <Ionicons name="add" size={20} color={colors.white}></Ionicons>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tagContainer: {
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(15),
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderRadius: 999,
  },
  tagText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});
export default TagItem;
