import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, PRIMARY_ACTIVE_OPACITY } from "../../styles";
function RevealButton({ pairAction, isLoading }) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={PRIMARY_ACTIVE_OPACITY}
      style={styles.button}
      onPress={() => pairAction("reveal")}
    >
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={[colors.primaryDark, colors.accent70]}
        style={styles.gradient}
      >
        {!isLoading ? (
          <Text style={styles.buttonText}>Reveal</Text>
        ) : (
          <ActivityIndicator color={colors.white}></ActivityIndicator>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
  },
});
export default RevealButton;
