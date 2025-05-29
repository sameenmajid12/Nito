import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Logo from "../../components/common/Logo";
import { colors, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

function AccountCreatedScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current; 

  const CIRCLE_BASE_SIZE = 220;
  const ICONS_SIZE = 150; 

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 250 / 220, 
          duration: 1500,
          useNativeDriver: true,
          easing: Animated.easing,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 1500,
          useNativeDriver: true,
          easing: Animated.easing,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageContainer}>
        <Logo width={75} height={50} style={{ marginBottom: "40%" }}></Logo>
        <View style={styles.mainContainer}>
          <View style={styles.circlesWrapper}>
            <Animated.View
              style={[
                styles.outerCirclePulsing,
                {
                  transform: [
                    { translateX: -CIRCLE_BASE_SIZE / 2 },
                    { translateY: -CIRCLE_BASE_SIZE / 2 },
                    { scale: scaleAnim }, 
                  ],
                },
              ]}
            />
            <View style={styles.innerCircleFixed}>
              <Ionicons
                name="checkmark-outline"
                size={ICONS_SIZE}
                color={colors.white}
              ></Ionicons>
            </View>
          </View>

          <Text style={styles.createdText}>
            Congrats! Your account has been created successfully.
          </Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.button}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={FONT_SIZE_M}
                color={colors.white}
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageContainer: {
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  mainContainer: {
    alignItems: "center",
    rowGap: 20,
  },
  circlesWrapper: {
    width: 250, 
    height: 250, 
    position: "relative", 
  },
  outerCirclePulsing: {
    backgroundColor: colors.accent40,
    width: 220,
    height: 220, 
    borderRadius: 999,
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  innerCircleFixed: {
    backgroundColor: colors.accent,
    width: 200, 
    height: 200, 
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 1,
  },
  checkmark: {},
  createdText: {
    fontSize: 20,
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
    lineHeight: 24,
    textAlign: "center",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 99,
  },
  buttonText: {
    fontSize: FONT_SIZE_M,
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
  },
});

export default AccountCreatedScreen;
