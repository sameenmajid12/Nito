import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_XXL } from "../../styles";
function PairEmptyState() {
  return (
    <View style={styles.mainWrapper}>
      <Image
        style={styles.image}
        source={require("../../assets/images/pairEmptyState.png")}
      ></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.descText}>Next pairing in</Text>
        <Text style={styles.timeText}>17m 12s</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    paddingTop: 75,
    rowGap: 20,
  },
  image: {
    width: 351.97,
    height: 254.28,
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
