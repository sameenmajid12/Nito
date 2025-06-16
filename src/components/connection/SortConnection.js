import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE_XL, FONT_SIZE_M, colors } from "../../styles";
function Sort({currSort, setCurrSort}) {
  return (
    <View style={styles.sortContainer}>
      <View style={styles.sortContainerSections}>
        <Ionicons size={FONT_SIZE_XL} name="people-outline"></Ionicons>
        <Text style={styles.sortText}>Your connections</Text>
      </View>
      <View style={styles.sortContainerSections}>
        <Text style={styles.sortText}>Sort by</Text>
        <Text style={styles.sortSelectedValue}>Default</Text>
        <Ionicons
          color={colors.primary}
          size={FONT_SIZE_M}
          name="caret-down"
        ></Ionicons>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortContainerSections: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  sortText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
  },
  sortSelectedValue: {
    fontFamily: "Nunito-Bold",
    color: colors.primary,
  },
});
export default Sort;
