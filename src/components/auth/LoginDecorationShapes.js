import { StyleSheet } from "react-native";
import { Image } from "expo-image";
function LoginDecorationShapes(){
  return(
    <>
    <Image
        contentFit="contain"
        source={require("../../assets/images/loginShape1.png")}
        style={[styles.shape1]}
      ></Image>
      <Image
        contentFit="contain"
        source={require("../../assets/images/loginShape2.png")}
        style={styles.shape2}
      ></Image>
      <Image
        contentFit="contain"
        source={require("../../assets/images/loginShape3.png")}
        style={styles.shape3}
      ></Image>
      <Image
        contentFit="contain"
        source={require("../../assets/images/loginShape4.png")}
        style={styles.shape4}
      ></Image>
      </>
  )
}
const styles = StyleSheet.create({
    shape1: {
    position: "absolute",
    width: 100,
    height:100,
    top: 80,
    right: 50,
    zIndex:10
  },
  shape2: {
    position: "absolute",
    width: 123,
    height:100,
    top:20,
    right:-15
  },
  shape3:{
    position:"absolute",
    width:80,
    height:80,
    bottom:120,
    left:40
  },
  shape4:{
    position:'absolute',
    width:150,
    height:150,
    bottom:40,
    left:-70
  }
})
export default LoginDecorationShapes;