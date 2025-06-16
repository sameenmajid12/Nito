import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
function TextHeader({ text, navigation }) {
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.header}>
      <Ionicons
        size={FONT_SIZE_L}
        color={colors.textPrimary}
        name="chevron-back"
      ></Ionicons>
      <Text style={styles.headerText}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
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
});
export default TextHeader;
