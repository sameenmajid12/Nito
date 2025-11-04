import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 430;

export const scaleSize = (size) => {
  const scaledSize = size * (SCREEN_WIDTH / BASE_WIDTH);
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};