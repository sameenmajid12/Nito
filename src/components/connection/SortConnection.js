import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE_XL, FONT_SIZE_M, colors } from "../../styles";
import { useModal } from "../../contexts/ModalContext";
function SortConnection({ sortState, setSortState }) {
  const { openModal } = useModal();
  const changeSort = (newSort) => {
    setSortState(newSort);
  };
  const sortLabel = sortState === "newestfirst" ? "Default" : sortState === "oldestfirst" ? "Oldest first" : "A-Z"
  return (
    <View style={styles.sortContainer}>
      <View style={styles.sortContainerSections}>
        <Ionicons size={FONT_SIZE_XL} name="people-outline"></Ionicons>
        <Text style={styles.sortText}>Your connections</Text>
      </View>
      <Pressable
        onPress={() => openModal({ sort: sortState, changeSort }, "sortModal")}
        style={styles.sortContainerSections}
      >
        <Text style={styles.sortText}>Sort by</Text>
        <Text style={styles.sortSelectedValue}>{sortLabel}</Text>
        <Ionicons
          color={colors.primary}
          size={FONT_SIZE_M}
          name="caret-down"
        ></Ionicons>
      </Pressable>
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
export default SortConnection;
