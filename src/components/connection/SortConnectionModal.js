import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { useModal } from "../../contexts/ModalContext";

function SortConnectionsModal({ sort, changeSort }) {
  const { updateModalData } = useModal();
  const checkSort = (sortParam) => {
    return sortParam === sort;
  };
  const updateSort = (newSort) => {
    changeSort(newSort);
    updateModalData({ sort: newSort });
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sort by</Text>
        <Ionicons name="close-outline" style={styles.close}></Ionicons>
      </View>
      <Pressable style={styles.sortItem} onPress={() => updateSort("newestfirst")}>
        <Text style={styles.sortItemText}>Newest first (Default)</Text>
        {checkSort("newestfirst") ? (
          <Ionicons
            style={styles.radioOn}
            name="radio-button-on-outline"
          ></Ionicons>
        ) : (
          <Ionicons
            style={styles.radioOff}
            name="radio-button-off-outline"
          ></Ionicons>
        )}
      </Pressable>
      <Pressable
        style={styles.sortItem}
        onPress={() => updateSort("oldestfirst")}
      >
        <Text style={styles.sortItemText}>Oldest first</Text>
        {checkSort("oldestfirst") ? (
          <Ionicons
            style={styles.radioOn}
            name="radio-button-on-outline"
          ></Ionicons>
        ) : (
          <Ionicons
            style={styles.radioOff}
            name="radio-button-off-outline"
          ></Ionicons>
        )}
      </Pressable>
      <Pressable
        style={styles.sortItem}
        onPress={() => updateSort("alphabeticalorder")}
      >
        <Text style={styles.sortItemText}>Alphabetical order</Text>
        {checkSort("alphabeticalorder") ? (
          <Ionicons
            style={styles.radioOn}
            name="radio-button-on-outline"
          ></Ionicons>
        ) : (
          <Ionicons
            style={styles.radioOff}
            name="radio-button-off-outline"
          ></Ionicons>
        )}
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  close: {
    fontSize: FONT_SIZE_L,
    position: "absolute",
    top: FONT_SIZE_L / 2,
    right: 20,
  },
  headerText: {
    fontFamily: "Nunito-SemiBold",
  },
  sortItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sortItemText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
  },
  radioOn: {
    color: colors.primary,
    fontSize: FONT_SIZE_L,
  },
  radioOff: {
    color: colors.border,
    fontSize: FONT_SIZE_L,
  },
});
export default SortConnectionsModal;
