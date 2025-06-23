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

function ProfileAccountInformationScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const [changesMade, setChangesMade] = useState(false);
  const [infoValues, setInfoValues] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: user.password,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

  const validateInput = (field, value, userSchoolDomain) => {
    let errorMessage = "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const escapedDomain = userSchoolDomain.replace(/\./g, "\\.");
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${escapedDomain}$`);

    if (field === "email") {
      if (value.trim().length === 0) {
        errorMessage = "Email is required.";
      } else if (!emailRegex.test(value)) {
        errorMessage = `Email must end with @${userSchoolDomain}`;
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
    }
    return errorMessage;
  };

  const handleChange = (field, value) => {
    const errorMessage = validateInput(field, value, user.school.emailDomain);
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
        newValues.password !== user.password;
      const currentErrors = { ...errors, [field]: errorMessage };
      const hasErrors = Object.values(currentErrors).some(
        (val) => val?.length > 0
      );
      setChangesMade(hasChanges && !hasErrors);
      return newValues;
    });
  };

  const saveChanges = () => {
    const hasErrors = Object.values(errors).some(
      (val) => val?.length > 0
    );
    if (changesMade && !hasErrors) {
      updateUser(infoValues);
      setChangesMade(false);
    }
  };

  return (
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
          value={"user21454295"}
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
          label={"Password"}
          value={infoValues.password}
          placeholder={"Enter password"}
          editable={true}
          isPassword={true}
          setValue={(text) => handleChange("password", text)}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={errors.password}
        />
        <TouchableOpacity
          onPress={saveChanges} // Added onPress handler for saveChanges
          style={[
            styles.saveButton,
            changesMade
              ? { backgroundColor: colors.primary }
              : { backgroundColor: colors.primary50 },
          ]}
          disabled={!changesMade}
          activeOpacity={changesMade ? 0.9 : 1.0}
        >
          {/* Removed disabled prop from Text as it's not valid */}
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
