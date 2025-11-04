import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { scaleSize } from "../../styles";
function DecorationShapes({ variant }) {
  const shapes =
    variant === "login" ? (
      <>
        <Image
          contentFit="contain"
          source={require("../../assets/images/loginShape1.png")}
          style={[styles.loginShape1]}
        ></Image>
        <Image
          contentFit="contain"
          source={require("../../assets/images/loginShape2.png")}
          style={styles.loginShape2}
        ></Image>
      </>
    ) : (
      <>
        <Image
        contentFit="contain"
          source={require("../../assets/images/registerShape1.png")}
          style={styles.registerShape1}
        ></Image>
        <Image
          source={require("../../assets/images/registerShape2.png")}
          contentFit="contain"
          style={styles.registerShape2}
        ></Image>
      </>
    );
  return shapes;
}
const styles = StyleSheet.create({
  loginShape1: {
    position: "absolute",
    width: scaleSize(180),
    height: scaleSize(150),
    bottom: 30,
    left: -50,
    zIndex: 10,
  },
  loginShape2: {
    position: "absolute",
    width: scaleSize(180),
    height: scaleSize(150),
    top: 20,
    right: -30,
    zIndex:10
  },
  registerShape1: {
    position: "absolute",
    width: scaleSize(180),
    height: scaleSize(150),
    top:30,
    right: -20,
    zIndex:10
  },
  registerShape2: {
    position: "absolute",
    width: scaleSize(180),
    height: scaleSize(150),
    bottom: 60,
    left: -30,
    zIndex:10
  },
});
export default DecorationShapes;
