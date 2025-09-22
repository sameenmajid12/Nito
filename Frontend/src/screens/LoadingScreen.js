import { Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/common/Logo";
import { colors } from "../styles";
import { useEffect, useRef } from "react";

function LoadingScreen() {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const fadeInOut = Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.75,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(fadeInOut, {
      iterations: -1,
    }).start();

    return () => {
      opacityAnim.stopAnimation();
    };
  }, [opacityAnim]);
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ opacity: opacityAnim }}>
        <Logo style={{ marginBottom: 100 }} width={150} height={75}></Logo>
      </Animated.View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoadingScreen;
