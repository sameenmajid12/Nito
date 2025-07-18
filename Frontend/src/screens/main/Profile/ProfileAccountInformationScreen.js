import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation,
} from "react-native";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XL,
} from "../../../styles";
import ProfileAccountInfoInput from "../../../components/profile/ProfileAccountInfoInput";
import { useState, useEffect } from "react";
import TextHeader from "../../../components/common/TextHeader";
import { useUser } from "../../../contexts/UserContext";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

function ProfileAccountInformationScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const [changesMade, setChangesMade] = useState(false);
  const [infoValues, setInfoValues] = useState({
    fullName: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: "", //for changing password, user password is not shown on the frontend
    retypePassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    retypePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
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

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const validateInput = (field, value) => {
    let errorMessage = "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const escapedDomain = user.school.emailDomain?.replace(/\./g, "\\.");
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${escapedDomain}$`);

    if (field === "email") {
      if (value.trim().length === 0) {
        errorMessage = "Email is required.";
      } else if (!emailRegex.test(value)) {
        errorMessage = `Email must end with @${user.school.emailDomain}`;
      }
    } else if (field === "fullName") {
      if (value.trim().length === 0) {
        errorMessage = "Full name cannot be empty.";
      }
    } else if (field === "phoneNumber" && value && !/^\d+$/.test(value)) {
      errorMessage = "Phone number must be numeric.";
    } else if (field === "password" && !passwordRegex.test(value)) {
      errorMessage =
        "Password must be at least 8 chars, contain one uppercase, one lowercase, and one number.";
    } else if (field === "retypePassword" && value !== infoValues.password) {
      errorMessage = "Password do not match";
    }
    return errorMessage;
  };

  const handleChange = (field, value) => {
    const errorMessage = validateInput(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
    setInfoValues((prev) => {
      const newValues = { ...prev, [field]: value };
      const hasChanges =
        newValues.fullName !== user.fullName ||
        newValues.email !== user.email ||
        newValues.phoneNumber !== user.phoneNumber ||
        newValues.password !== "";
      const currentErrors = { ...errors, [field]: errorMessage };
      const hasErrors = Object.values(currentErrors).some(
        (val) => val?.length > 0
      );
      setChangesMade(hasChanges && !hasErrors);
      return newValues;
    });
  };

  const saveChanges = () => {
    const hasErrors = Object.values(errors).some((val) => val?.length > 0);
    if (changesMade && !hasErrors) {
      const { retypePassword, ...rest } = infoValues;
      const safeUpdates = {};
      for (const key in rest) {
        if (key === "password" && rest[key].trim().length === 0) {
          continue;
        }
        if (rest[key] !== user[key]) {
          safeUpdates[key] = rest[key];
        }
      }

      if (Object.keys(safeUpdates).length > 0) {
        updateUser(safeUpdates);
        setChangesMade(false);
      }
    }
  };

  return (
    <GestureDetector gesture={tapGesture}>
      <SafeAreaView style={styles.page}>
        <TextHeader navigation={navigation} text={"Account information"} />
        <View style={styles.contentContainer}>
          {!keyboardVisible && (
            <View>
              <Text style={styles.pageHeader}>Details</Text>
              <Text style={styles.pageSubheader}>
                Here you can edit your account information
              </Text>
            </View>
          )}

          <ProfileAccountInfoInput
            iconName={"person-circle-outline"}
            label={"Fullname"}
            value={infoValues.fullName}
            placeholder={"Enter fullname"}
            editable={true}
            setValue={(text) => handleChange("fullName", text)}
            error={errors.fullName}
          />
          <ProfileAccountInfoInput
            iconName={"at-outline"}
            label={"Username"}
            value={user.username}
            editable={false}
          />
          <ProfileAccountInfoInput
            iconName={"mail-outline"}
            label={"Email"}
            value={infoValues.email}
            placeholder={"Enter email"}
            editable={true}
            setValue={(text) => handleChange("email", text)}
            error={errors.email}
          />
          <ProfileAccountInfoInput
            iconName={"call-outline"}
            label={"Phone number"}
            value={infoValues.phoneNumber}
            placeholder={"Enter phone number"}
            editable={true}
            setValue={(text) => handleChange("phoneNumber", text)}
            error={errors.phoneNumber}
          />
          <ProfileAccountInfoInput
            iconName={"shield-outline"}
            label={"Change password"}
            value={infoValues.password}
            placeholder={"Enter new password"}
            editable={true}
            isPassword={true}
            setValue={(text) => handleChange("password", text)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={errors.password}
          />
          <ProfileAccountInfoInput
            iconName={"clipboard-outline"}
            label={"Retype password"}
            value={infoValues.retypePassword}
            placeholder={"Re-enter new password"}
            editable={true}
            isPassword={true}
            setValue={(text) => handleChange("retypePassword", text)}
            showPassword={showRetypePassword}
            setShowPassword={setShowRetypePassword}
            error={errors.retypePassword}
          />
          <TouchableOpacity
            onPress={saveChanges}
            style={[
              styles.saveButton,
              changesMade
                ? { backgroundColor: colors.primary }
                : { backgroundColor: colors.primary50 },
            ]}
            disabled={!changesMade}
            activeOpacity={changesMade ? 0.9 : 1.0}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    padding: 30,
    rowGap: 15,
  },
  saveButton: {
    alignSelf: "flex-end",
    width: 135,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  pageHeader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XL,
    textAlign: "center",
    color: colors.textPrimary,
  },
  pageSubheader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    color: colors.textLight,
    textAlign: "center",
  },
});

export default ProfileAccountInformationScreen;
