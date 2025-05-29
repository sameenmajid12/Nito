import { StyleSheet } from "react-native";
import { Image } from "expo-image";
function Logo({ style, resizeMode }) {
  return (
    <Image
      contentFit={resizeMode || "contain"}
      style={[styles.logo, style]}
      source={require("../../assets/images/logo.png")}
    ></Image>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 65,
  },
});
export default Logo;
