import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Keyboard,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  FONT_SIZE_XL,
  TEXT_ACTIVE_OPACITY,
} from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import Button from "../common/Button";

function ForgotPasswordLayout({
  confirm,
  header,
  subheader,
  buttonText,
  inputComponent,
  isLoading,
  navigation,
  buttonDisabled,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: -e.endCoordinates.height + 30,
        duration: e.duration,
        easing: Easing.bezier(0, 0, 0.2, 1),

        useNativeDriver: true,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: true,
        easing: Easing.bezier(0, 0, 0.2, 1),
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={TEXT_ACTIVE_OPACITY}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={FONT_SIZE_XL}
            color={colors.textPrimary}
          ></Ionicons>
        </TouchableOpacity>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.subheader}>{subheader}</Text>
        </View>
        {inputComponent}
        <View style={{ flex: 1 }} />
        <Button title={buttonText} disabled={buttonDisabled} buttonStyle={[
            styles.button,
            { transform: [{ translateY: keyboardOffset }] },
          ]} onPress={confirm} height={45}></Button>
        
      </Animated.View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 35,
    paddingTop: 55,
    paddingBottom: 25,
    rowGap: 20,
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  header: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_XL,
    textAlign: "center",
    color: colors.textPrimary,
  },
  subheader: {
    textAlign: "center",
    fontFamily: "Nunito-Medium",
    color: colors.textLight,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 10,
  },
  active: {
    backgroundColor:colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  disabled:{
    backgroundColor:colors.primary50
  },
  continueButtonText: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
  },
});
export default ForgotPasswordLayout;
