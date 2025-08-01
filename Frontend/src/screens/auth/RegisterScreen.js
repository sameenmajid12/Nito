import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Pressable,
  Keyboard,
  Easing,
  TouchableOpacity,
} from "react-native";
import { colors, FONT_SIZE_M, textStyles } from "../../styles";
import Button from "../../components/common/Button";
import DecorationShapes from "../../components/auth/DecorationShapes";
import { useEffect, useState, useRef } from "react";
import Logo from "../../components/common/Logo";
import SchoolSelector from "../../components/auth/SchoolSelector";
import { useRegistration } from "../../contexts/RegistrationContext";
function RegisterScreen({ navigation }) {
  const { updateRegistrationData } = useRegistration();
  const initialSchoolState = {
    name: "Select School",
    _id: null,
    emailDomain: null,
    image: null,
  };
  const [school, setSchool] = useState(initialSchoolState);
  const [schoolDropDown, setSchoolDropDown] = useState(false);
  const [formError, setFormError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const INITIAL_PADDING_TOP = 250;
  const KEYBOARD_ACTIVE_PADDING_TOP = 110;
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
  const continueRegistration = () => {
    if (school._id) {
      updateRegistrationData({
        school: school,
      });
      navigation.replace("Register1");
    } else {
      setFormError("Please enter your school before continuing");
      return;
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <DecorationShapes />

        <Animated.View
          style={[
            styles.pageContentContainer,
            { paddingTop: animatedPageContentPaddingTop },
          ]}
        >
          <Logo style={{ marginBottom: 10 }} width={150} height={80} />
          <Text style={[textStyles.h3, { marginBottom: 20 }]}>
            Start chatting anonymously.
          </Text>
          <SchoolSelector
            school={school}
            setSchool={setSchool}
            dropDownVisible={schoolDropDown}
            setDropDownVisible={setSchoolDropDown}
            errorText={formError}
          />
          <Button
            title="Register"
            style={{ width: "80%", height: 45, marginTop: 10 }}
            onPress={continueRegistration}
          />
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.whyNito}>Why use Nito?</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <Text style={styles.accountAlreadyText}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={styles.accountAlreadyAction}>Login</Text>
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
    flex: 1,
    zIndex: 11,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  accountAlreadyText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
    color: colors.textPrimary,
  },
  accountAlreadyAction: {
    color: colors.primary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
  },
  whyNito: {
    fontFamily: "Nunito-Bold",
    color: colors.primary,
    marginTop: 15,
  },
});

export default RegisterScreen;
