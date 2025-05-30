import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Platform, // <-- Import Platform
  Keyboard, // <-- Import Keyboard API
  ScrollView, // <-- Import ScrollView (if your content can overflow)
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, textStyles } from "../../styles";
import Button from "../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import DecorationShapes from "../../components/auth/DecorationShapes";
import Input from "../../components/common/Input";
import { useEffect, useRef, useState } from "react";
import Logo from "../../components/common/Logo";
import SchoolSelector from "../../components/auth/SchoolSelector";

const INITIAL_PADDING_TOP = 195;
const KEYBOARD_ACTIVE_PADDING_TOP = 130;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState({ name: "Select School", img: null });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animatedPageContentPaddingTop = useRef(
    new Animated.Value(INITIAL_PADDING_TOP)
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    const keybaordWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        Animated.timing(animatedPageContentPaddingTop, {
          toValue: KEYBOARD_ACTIVE_PADDING_TOP,
          duration: e.duration,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      (e) => {
        Animated.timing(animatedPageContentPaddingTop, {
          toValue: INITIAL_PADDING_TOP,
          duration: e.duration,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keybaordWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [fadeAnim]);

  const emailInputContainerStyle = { marginBottom: 15 };
  const passwordInputContainerStyle = { marginBottom: 25 };

  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <DecorationShapes variant={"login"} />
        <Animated.View
          style={[
            styles.pageContentContainer,
            { paddingTop: animatedPageContentPaddingTop },
          ]}
        >
          <Logo style={{ marginBottom: 10 }} width={150} height={80} />
          <Text style={[textStyles.h3, { marginBottom: 10 }]}>
            Chat freely. Chat anonymously.
          </Text>
          <SchoolSelector school={school} setSchool={setSchool} />
          <Input
            label={"Email"}
            placeholder={"Enter email"}
            containerStyle={emailInputContainerStyle}
            value={email}
            setValue={setEmail}
          ></Input>
          <Input
            label={"Password"}
            placeholder={"Enter password"}
            containerStyle={passwordInputContainerStyle}
            value={password}
            setValue={setPassword}
            secure={!passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          ></Input>

          <Button title="Login" style={{ width: "80%", height: 45 }} />
        </Animated.View>

        <View style={{ flex: 1 }} />
        <Text style={styles.noAccountText}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.replace("Register")}
            style={{ color: colors.primary, fontFamily: "Nunito-Bold" }}
          >
            Register
          </Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  pageContentContainer: {
    width: "100%",
    alignItems: "center",
  },
  noAccountText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
    color: colors.textPrimary,
  },
});

export default LoginScreen;
