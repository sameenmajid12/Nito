import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../styles";
function RevealButton() {
  return (
    <Pressable style={styles.button}>
      <LinearGradient
        start={{ x: 0.25, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={[colors.primaryDark, colors.accent70]}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>Reveal</Text>
      </LinearGradient>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient:{
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:999
  },
  buttonText:{
    color:colors.white,
    fontFamily:"Nunito-Bold",
  }
});
export default RevealButton;
