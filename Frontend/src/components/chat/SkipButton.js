import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, TEXT_ACTIVE_OPACITY } from "../../styles";
function SkipButton({ pairAction, isLoading }) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={() => pairAction("skip")}
      activeOpacity={TEXT_ACTIVE_OPACITY}
      style={styles.button}
    >
      {!isLoading ? <Text style={styles.buttonText}>Skip</Text>:<ActivityIndicator color={colors.primaryDark}></ActivityIndicator>}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.blue,
    borderWidth: 1,
    borderRadius: 999,
  },
  buttonText: {
    color: colors.blue,
    fontFamily: "Nunito-Medium",
  },
});
export default SkipButton;
