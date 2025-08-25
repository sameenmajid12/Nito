import { StyleSheet, View } from "react-native";

import Input from "../../../components/common/Input";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useAlert } from "../../../contexts/AlertContext";
import ForgotPasswordLayout from "../../../components/auth/ForgotPasswordLayout";
function ForgotPasswordUpdateScreen({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetToken } = route.params;
  const { addAlert } = useAlert();
  const [errors, setErrors] = useState({ password: "", retypePassword: "" });

  const validateFields = () => {
    setErrors({ password: "", retypePassword: "" });
    const errorsFound = false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 chars, contain one uppercase, one lowercase, and one number.",
      }));
      errorsFound = true;
    }
    if (password !== retypePassword) {
      setErrors((prev) => ({
        ...prev,
        retypePassword: "Passwords do not match",
      }));
      errorsFound = true;
    }
    return errorsFound;
  };
  const resetPassword = async () => {
    const errorsFound = validateFields();
    if (!errorsFound) {
      setIsLoading(true);
      try {
        await axios.post(`${API_BASE_URL}/auth/reset-password`, {
          newPassword: password,
          resetToken,
        });
        addAlert("success", "Password updated");

        navigation.navigate("Login");
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const inputComponent = (
    <View>
      <Input
        label={"Password"}
        placeholder={"Enter password"}
        value={password}
        setValue={setPassword}
        containerStyle={{ width: "100%" }}
        inputStyle={styles.input}
        secure={!showPassword}
        togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
        errorText={errors.password ?? null}
      ></Input>
      <Input
        label={"Retype password"}
        placeholder={"Re-enter password"}
        value={retypePassword}
        setValue={setRetypePassword}
        secure={!showRetypePassword}
        togglePasswordVisibility={() => setShowRetypePassword((prev) => !prev)}
        containerStyle={{ width: "100%" }}
        inputStyle={styles.input}
        errorText={errors.retypePassword ?? null}
      ></Input>
    </View>
  );
  return (
    <ForgotPasswordLayout
      inputComponent={inputComponent}
      header={"Update password"}
      subheader={"Enter a new password that you can remember easily"}
      buttonText={"Update"}
      confirm={resetPassword}
      isLoading={isLoading}
      navigation={navigation}
      buttonDisabled={
        password.trim().length === 0 || retypePassword.trim().length === 0
      }
    />
  );
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
export default ForgotPasswordUpdateScreen;
