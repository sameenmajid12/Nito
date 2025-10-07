import { StyleSheet, View, Text } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_XL } from "../../styles";
import { getTimeUntil } from "../../utils/Format";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";
function WaitingForPair() {
  const { countdowns } = usePhaseTimer();
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.decorationLine}></View>
      <View style={styles.textWrapper}>
        <Text style={styles.header}>Waiting for pair...</Text>
        <Text style={styles.subheader}>Next in {countdowns.untilNextPair}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.primary70,
    padding: 20,
    paddingVertical: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginBottom: 5,
  },
  decorationLine: {
    width: 3,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 999,
  },
  textWrapper: {
    justifyContent: "center",
    rowGap: 5,
  },
  header: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
    fontSize: FONT_SIZE_XL,
  },
  subheader: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white70,
    fontSize: FONT_SIZE_M,
  },
});
export default WaitingForPair;
