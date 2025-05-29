import { Image } from "expo-image";
function Logo({ resizeMode, width, height, style }) {
  return (
    <Image
      contentFit={resizeMode || "contain"}
      style={[style, {width:width, height:height}]}
      source={require("../../assets/images/logo.png")}
    ></Image>
  );
}
export default Logo;
