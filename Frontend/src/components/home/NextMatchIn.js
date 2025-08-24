import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";
function NextMatchIn() {
  const { countdowns } = usePhaseTimer();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Next match in</Text>
        <Ionicons
          size={36}
          color={colors.primary}
          name="time-outline"
        ></Ionicons>
      </View>
      <Text style={styles.mainText}>{countdowns.untilNextPair}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: colors.primary50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    rowGap: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  headerText: {
    color: colors.primary70,
    fontFamily: "Nunito-Bold",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "Nunito-Bold",
    color: colors.primary,
    fontSize: 30,
  },
});
export default NextMatchIn;
