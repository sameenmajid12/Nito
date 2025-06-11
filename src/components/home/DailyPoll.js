import { Pressable, View, Text, StyleSheet } from "react-native";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XS,
} from "../../styles";

function DailyPoll() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily poll</Text>
        <Text style={styles.question}>Would you rather eat at...</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Show options</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.accent55,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  header: {},
  headerText: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  question: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 30,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-Bold",
    color: colors.accent70,
  },
});
export default DailyPoll;
