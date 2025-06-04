import { View, StyleSheet, } from "react-native";
import Input from "../common/Input";
import AddProfilePicture from "./AddProfilePicture";
import { useState } from "react";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const RUTGERS_EMAIL_REGEX = /^[a-zA-Z0-9.-]+@scarletmail\.rutgers\.edu$/;

function RegistrationFormFields({
  formData,
  setFormData,
  setFormErrors,
  formErrors,
  image,
  setImage,
  keyboardVisible,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: null }));
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleRetypedPasswordVisibility = () => {
    setRetypePasswordVisible((prev) => !prev);
  };
  return (
    <View style={styles.inputContainer}>
      {!keyboardVisible && (
        <AddProfilePicture image={image} setImage={setImage} />
      )}

      <Input
        placeholder={"Enter fullname"}
        label={"Fullname"}
        containerStyle={styles.input}
        value={formData.fullname}
        setValue={(text) => handleChange("fullname", text)}
        errorText={formErrors.fullname}
      />
      <Input
        placeholder={"Enter username"}
        label={"Username"}
        containerStyle={styles.input}
        value={formData.username}
        setValue={(text) => handleChange("username", text)}
        errorText={formErrors.username}
      />
      <Input
        placeholder={"Enter email"}
        label={"Email"}
        containerStyle={styles.input}
        value={formData.email}
        setValue={(text) => handleChange("email", text)}
        errorText={formErrors.email}
        keyboardType="email-address"
      />
      <Input
        placeholder={"Enter password"}
        label={"Password"}
        containerStyle={styles.input}
        value={formData.password}
        setValue={(text) => handleChange("password", text)}
        secure={!passwordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
        errorText={formErrors.password}
      />
      <Input
        placeholder={"Retype password"}
        label={"Retype password"}
        containerStyle={styles.input}
        value={formData.retypePassword}
        setValue={(text) => handleChange("retypePassword", text)}
        secure={!retypePasswordVisible}
        togglePasswordVisibility={toggleRetypedPasswordVisibility}
        errorText={formErrors.retypePassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
});

export default RegistrationFormFields;
