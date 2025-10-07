import { useRef, useEffect } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Pressable,
  Text,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, FONT_SIZE_XXS } from "../../styles";
import { useAlert } from "../../contexts/AlertContext";
import { useUser } from "../../contexts/UserContext";
const ALERT_WIDTH = 300;
function RevealPhaseAlert({ navigation, type }) {
  const { closePhaseAlert } = useAlert();
  const { user } = useUser();
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  const gradientTranslateY = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 70,
        duration: 1000,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(gradientTranslateY, {
        delay: 350,
        toValue: 1,
        duration: 5000,
        easing: Easing.bezier(0, 0.77, 0.55, 1.01),
        useNativeDriver: false,
      }),
    ]).start();
  }, [gradientTranslateY, translateY]);
  const gradientTranslation = gradientTranslateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50 * 24.5],
  });
  const generateGradientColors = () => {
    let result = [];
    const colorArr = [colors.primary, colors.accent];
    for (let i = 0; i < 28; i++) {
      result.push(colorArr[0]);
      result.push(colorArr[1]);
    }
    return result;
  };
  const dismissAlert = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: 700,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => closePhaseAlert());
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        translateY.setValue(70 + gestureState.dy);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy < -40 || gestureState.dy > 30) {
          dismissAlert();
        } else {
          Animated.spring(translateY, {
            toValue: 70,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.alertContainer,
        {
          transform: [
            { translateY: translateY },
            { translateX: -ALERT_WIDTH / 2 },
          ],
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.gradientView,
          { transform: [{ translateY: gradientTranslation }] },
        ]}
      >
        <AnimatedLinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1.1 }}
          colors={generateGradientColors()}
          style={styles.gradientObject}
        />
      </Animated.View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {type === "matchmaking"
            ? "New pairing found 🎉"
            : "Time to reveal 👀"}
        </Text>
        <View style={styles.contentActions}>
          <Pressable
            style={styles.viewButton}
            onPress={() => {
              dismissAlert();
              navigation.navigate("Chat", {
                conversation: user.currentPair.conversation,
              });
            }}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </Pressable>
          <View style={styles.contentActionsDivider}></View>
          <Pressable onPress={dismissAlert}>
            <Ionicons
              name="close"
              color={colors.white}
              size={FONT_SIZE_M}
            ></Ionicons>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    width: ALERT_WIDTH,
    position: "absolute",
    top: 0,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    left: "50%",
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    borderRadius: 10,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 101,
  },
  contentText: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
  },
  viewButton: {
    width: 70,
    height: 25,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  viewButtonText: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_XXS,
    color: colors.white,
  },
  gradientView: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 99,
    height: 2500,
  },
  gradientObject: {
    height: "100%",
  },
  contentActions: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  contentActionsDivider: {
    width: 1,
    height: 15,
    backgroundColor: colors.white,
  },
});

export default RevealPhaseAlert;
