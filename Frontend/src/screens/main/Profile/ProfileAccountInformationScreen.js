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
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { API_BASE_URL } from "@env";
function ProfileAccountInformationScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const { token } = useAuth();
  const [changesMade, setChangesMade] = useState(false);
  const [infoValues, setInfoValues] = useState({
    fullname: user.fullname,
    email: user.email,
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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
  const verifyOldPassword = async (oldPassword) => {
    try {
      await axios.post(
        `${API_BASE_URL}/user/verify-password`,
        { password: oldPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (e) {
      return false;
    }
  };
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
    } else if (field === "fullname") {
      if (value.trim().length === 0) {
        errorMessage = "Full name cannot be empty.";
      }
    } else if (field === "newPassword" && !passwordRegex.test(value)) {
      errorMessage =
        "Password must be at least 8 chars, contain one uppercase, one lowercase, and one number.";
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
        newValues.fullname !== user.fullname ||
        newValues.email !== user.email ||
        newValues.oldPassword !== "" ||
        newValues.newPassword !== "";
      const currentErrors = { ...errors, [field]: errorMessage };
      const hasErrors = Object.values(currentErrors).some(
        (val) => val?.length > 0
      );
      setChangesMade(hasChanges && !hasErrors);
      return newValues;
    });
  };

  const saveChanges = async () => {
    let hasErrors = Object.values(errors).some((val) => val?.length > 0);

    if (infoValues.newPassword !== "") {
      if (infoValues.oldPassword.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          oldPassword: "Enter old password for verification",
        }));
        hasErrors = true;
      } else {
        const isPasswordCorrect = await verifyOldPassword(
          infoValues.oldPassword
        );
        if (!isPasswordCorrect) {
          setErrors((prev) => ({
            ...prev,
            oldPassword: "Incorrect password",
          }));
          hasErrors = true;
        }
      }
    }

    if (changesMade && !hasErrors) {
      const { oldPassword, ...rest } = infoValues;
      const safeUpdates = {};
      for (const key in rest) {
        if (key === "newPassword") {
          if (rest[key].trim().length === 0) {
            continue;
          } else {
            safeUpdates.password = rest[key];
          }
        } else if (rest[key] !== user[key]) {
          safeUpdates[key] = rest[key];
        }
      }

      if (Object.keys(safeUpdates).length > 0) {
        updateUser(safeUpdates);
        setChangesMade(false);
        setInfoValues((prev) => ({
          ...prev,
          newPassword: "",
          oldPassword: "",
        }));
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
            value={infoValues.fullname}
            placeholder={"Enter fullname"}
            editable={true}
            setValue={(text) => handleChange("fullname", text)}
            error={errors.fullname}
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
            iconName={"lock-closed-outline"}
            label={"Change password"}
            value={infoValues.oldPassword}
            placeholder={"Enter old password"}
            editable={true}
            isPassword={true}
            setValue={(text) => handleChange("oldPassword", text)}
            showPassword={showOldPassword}
            setShowPassword={setShowOldPassword}
            error={errors.oldPassword}
          />
          <ProfileAccountInfoInput
            iconName={"shield-outline"}
            label={"New password"}
            value={infoValues.newPassword}
            placeholder={"Enter new password"}
            editable={true}
            isPassword={true}
            setValue={(text) => handleChange("newPassword", text)}
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            error={errors.newPassword}
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
