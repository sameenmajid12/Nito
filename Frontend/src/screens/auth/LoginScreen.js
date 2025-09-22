import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Pressable,
  Easing,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  FONT_SIZE_M,
  TEXT_ACTIVE_OPACITY,
  textStyles,
} from "../../styles";
import Button from "../../components/common/Button";
import DecorationShapes from "../../components/auth/DecorationShapes";
import Input from "../../components/common/Input";
import { useEffect, useRef, useState } from "react";
import Logo from "../../components/common/Logo";
import SchoolSelector from "../../components/auth/SchoolSelector";
import ErrorMessage from "../../components/common/ErrorMessage";
import { useAuth } from "../../contexts/AuthContext";

const INITIAL_PADDING_TOP = 180;
const KEYBOARD_ACTIVE_PADDING_TOP = 80;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const initialSchoolState = {
    name: "Select School",
    image: null,
    emailDomain: null,
  };
  const [school, setSchool] = useState(initialSchoolState);
  const [schoolDropDown, setSchoolDropDown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialFormErrors = { email: null, password: null, school: null };
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const { login, isLoadingLogin, authError } = useAuth();
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
      () => {
        Animated.timing(animatedPageContentPaddingTop, {
          toValue: KEYBOARD_ACTIVE_PADDING_TOP,
          duration: 250,
          useNativeDriver: false,
          easing: Easing.bezier(0, 0, 0.2, 1),
        }).start();
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        Animated.timing(animatedPageContentPaddingTop, {
          toValue: INITIAL_PADDING_TOP,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.bezier(0, 0, 0.2, 1),
        }).start();
      }
    );

    return () => {
      keybaordWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [fadeAnim]);
  const validateInput = () => {
    setFormErrors(initialFormErrors);
    let errorsFound = false;
    if (email === "") {
      setFormErrors((prev) => ({ ...prev, email: "Please enter your email" }));
      errorsFound = true;
    }
    if (password === "") {
      setFormErrors((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));
      errorsFound = true;
    }
    if (
      school.image === null ||
      school.name === null ||
      school.emailDomain === null
    ) {
      setFormErrors((prev) => ({
        ...prev,
        school: "Please enter your school",
      }));
      errorsFound = true;
    }
    const escapedDomain = school.emailDomain.replace(/\./g, "\\.");
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${escapedDomain}$`);
    if (!emailRegex.test(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: `Please enter a ${school.name} email`,
      }));
      errorsFound = true;
    }
    return errorsFound;
  };
  const loginUser = async () => {
    const errorsFound = validateInput();
    if (!errorsFound) {
      const loginData = {
        email,
        password,
        school,
      };
      login(loginData);
    }
  };
  return (
    <>
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
            <SchoolSelector
              school={school}
              setSchool={setSchool}
              dropDownVisible={schoolDropDown}
              setDropDownVisible={setSchoolDropDown}
              errorText={formErrors.school}
            />
            <Input
              label={"Email"}
              placeholder={"Enter email"}
              value={email}
              setValue={setEmail}
              errorText={formErrors.email}
              containerStyle={[styles.containerStyle, { marginBottom: 15 }]}
              inputStyle={styles.inputStyle}
            ></Input>
            <Input
              label={"Password"}
              placeholder={"Enter password"}
              value={password}
              setValue={setPassword}
              secure={!passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              errorText={formErrors.password}
              containerStyle={[styles.containerStyle, { marginBottom: 25 }]}
              inputStyle={styles.inputStyle}
            ></Input>

            <Button
              onPress={loginUser}
              title="Login"
              buttonStyle={styles.buttonStyle}
              isLoading={isLoadingLogin}
            />
            {authError && (
              <ErrorMessage
                message={"Incorrect email or password. Please try again"}
                style={{ marginTop: 10 }}
              />
            )}
            <TouchableOpacity
              activeOpacity={TEXT_ACTIVE_OPACITY}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={[
                  styles.forgotPassword,
                  authError ? { marginTop: 10 } : { marginTop: 15 },
                ]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <TouchableOpacity
                activeOpacity={TEXT_ACTIVE_OPACITY}
                onPress={() => navigation.replace("Register")}
              >
                <Text style={styles.noAccountAction}>Register</Text>
              </TouchableOpacity>
            </View>
            {schoolDropDown && (
              <Pressable
                onPress={() => setSchoolDropDown(false)}
                style={styles.overlay}
              ></Pressable>
            )}
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  pageContentContainer: {
    width: "100%",
    alignItems: "center",
    zIndex: 11,
    flex: 1,
  },
  noAccountText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
    color: colors.textPrimary,
  },
  noAccountAction: {
    color: colors.primary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
  },
  forgotPassword: {
    fontFamily: "Nunito-Bold",
    color: colors.primary,
  },
  containerStyle: {
    width: "80%",
  },
  inputStyle: { borderRadius: 10, paddingHorizontal: 18 },
  buttonStyle: { width: "80%", height: 45, marginTop: 10, borderRadius: 10 },
});

export default LoginScreen;
