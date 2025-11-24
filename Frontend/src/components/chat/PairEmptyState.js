import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { colors, FONT_SIZE_L } from "../../styles";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const PADDING_TOP = SCREEN_WIDTH >= 430 ? 105 : SCREEN_WIDTH >= 400 ? 90 : 75;
function PairEmptyState() {
  const { countdowns } = usePhaseTimer();
  return (
    <View style={styles.mainWrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/images/pairEmptyState.png")}
      ></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.descText}>Next pairing in</Text>
        <Text style={styles.timeText}>{countdowns.untilNextPair}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    paddingTop: PADDING_TOP,
    rowGap: 20,
  },
  image: {
    width: 267.15,
    height: 193,
  },
  textWrapper: {},
  descText: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
  timeText: {
    fontFamily: "Nunito-Bold",
    textAlign: "center",
    fontSize: 48,
    color: colors.primaryDark,
  },
});
export default PairEmptyState;
