import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Pressable,
  Animated,
} from "react-native";
import { colors, FONT_SIZE_XL, FONT_SIZE_XS } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";
import RegistrationFormFields from "../../components/auth/RegistrationFormFields";
function YourDetailsScreen({ navigation }) {
  const { updateRegistrationData, registrationData, initialRegistrationState } = useRegistration();

  //USER INFORMATION STATE
  const school = registrationData.school;
  const [formData, setFormData] = useState({
    fullname: registrationData.fullname || "",
    username: registrationData.username || "",
    email: registrationData.email || "",
    password: registrationData.password || "",
    retypePassword: registrationData.password || "",
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState(registrationData.image || null);

  //FORM ERRORS
  const initialFormErrors = {
    fullname: null,
    username: null,
    email: null,
    password: null,
    retypePassword: null,
  };
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  //ANIMATIONS
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keybaordWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: 225,
        });
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: 225,
        });
        setKeyboardVisible(false);
      }
    );
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
    }).start();
    return () => {
      keybaordWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  //USER INPUT VALIDATION
  const validateFields = () => {
    let currentErrors = { ...initialFormErrors };
    let errorsFound = false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const rutgersEmailRegex = /^[a-zA-Z0-9.-]+@scarletmail\.rutgers\.edu$/;

    if (formData.fullname === "") {
      currentErrors.fullname = "Please enter your full name";
      errorsFound = true;
    }
    if (formData.username === "") {
      currentErrors.username = "Please enter your username";
      errorsFound = true;
    }

    //CHECK IF EMAIL IS EMPTY OR IF IT IS A VALID RUTGERS EMAIL
    if (formData.email === "") {
      currentErrors.email = "Please enter your school email";
      errorsFound = true;
    } else if (!rutgersEmailRegex.test(formData.email)) {
      currentErrors.email = "Email must end with @scarletmail.rutgers.edu";
      errorsFound = true;
    }

    //CHECK IF PASSWORD IS EMPTY OR CONTAINS THE REQUIRED CHARACTER
    if (formData.password === "") {
      currentErrors.password = "Please enter a password for your account.";
      errorsFound = true;
    } else if (!passwordRegex.test(formData.password)) {
      currentErrors.password =
        "Password must be at least 8 chars, contain one uppercase, one lowercase, and one number.";
      errorsFound = true;
    }
    if (
      formData.retypePassword !== formData.password ||
      formData.retypePassword === ""
    ) {
      currentErrors.retypePassword = "Passwords don't match";
      errorsFound = true;
    }

    setFormErrors(currentErrors);
    return errorsFound;
  };

  //MAIN REGISTRATION FUNCTION
  const continueRegistration = () => {
    const errorsFound = validateFields();
    if (!errorsFound) {
      updateRegistrationData({
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profilePic: image
      });
      navigation.replace("Register2");
    }
  };

  const navigateBack = () => {
    navigation.replace("Register");
    updateRegistrationData(initialRegistrationState)
  };

  return (
    <SafeAreaView style={styles.page}>
      <Animated.View
        style={{
          paddingHorizontal: 40,
          paddingVertical: 20,
          opacity: fadeAnim,
        }}
      >
        {/*HIDE PROFILE PICTURE AND BACK BUTTON WHEN KEYBOARD IS VISIBLE*/}
        {!keyboardVisible && (
          <Pressable onPress={navigateBack} style={styles.headerContainer}>
            <Ionicons size={24} name="chevron-back-outline"></Ionicons>
            <Text
              style={{
                color: colors.textPrimary,
                fontFamily: "Nunito-SemiBold",
                fontSize: FONT_SIZE_XL,
              }}
            >
              Your details
            </Text>
          </Pressable>
        )}
        <RegistrationFormFields
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          image={image}
          setImage={setImage}
          keyboardVisible={keyboardVisible}
        />
        <Button
          onPress={continueRegistration}
          title={"Continue"}
          style={{
            width: "100%",
            height: 45,
            marginTop: 10,
            marginBottom: 15,
          }}
        ></Button>
        <Text
          style={{
            fontSize: FONT_SIZE_XS,
            fontFamily: "Nunito-SemiBold",
            textAlign: "center",
          }}
        >
          Note: Your name and profile picture cannot be seen by other users
          unless you choose to reveal yourself after a chat
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

//STYLES
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
});

export default YourDetailsScreen;
