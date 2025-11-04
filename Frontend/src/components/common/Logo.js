  import { Image } from "expo-image";
  import { scaleSize } from "../../styles";
  function Logo({ resizeMode, width, height, style }) {
    return (
      <Image
        contentFit={resizeMode || "contain"}
        style={[style, {width:scaleSize(width), height:scaleSize(height)}]}
        source={require("../../assets/images/logo.png")}
      ></Image>
    );
  }
  export default Logo;
