import { LinearGradient } from "expo-linear-gradient";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XXL } from "../../styles";
function YouHaveAMatch() {
  return (
    <View
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      }}
    >
      <LinearGradient
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.9 }}
        colors={[colors.accent70, colors.primary]}
      >
        <Text style={styles.mainHeader}>You have a match!</Text>
        <Text style={styles.subHeader}>
          Dont lose this opportunity to make a new friend
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Chat now</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 30,
    paddingBottom: 25,
  },
  mainHeader: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_XXL,
  },
  subHeader: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
  button: {
    backgroundColor: colors.white,
    width: 150,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
    color: colors.primary,
  },
});
export default YouHaveAMatch;
