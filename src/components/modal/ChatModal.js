import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
function ChatModal({ conversation, toggleConfirmation }) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("delete", "conversation")}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>
          Delete chat
        </Text>
        <Ionicons
          style={styles.icon}
          color={"red"}
          name="trash-outline"
        ></Ionicons>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("block", "user")}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>Block</Text>
        <Ionicons
          style={styles.icon}
          color={"red"}
          name="remove-circle-outline"
        ></Ionicons>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("report", "user")}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>Report</Text>
        <Ionicons
          style={styles.icon}
          color={"red"}
          name="flag-outline"
        ></Ionicons>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalItemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  icon: {
    fontSize: FONT_SIZE_L,
  },
});
export default ChatModal;
