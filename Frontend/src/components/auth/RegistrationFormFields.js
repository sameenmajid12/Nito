import { View, StyleSheet } from "react-native";
import Input from "../common/Input";
import ProfilePicture from "../common/ProfilePicture";
import { useState } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";

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
  const { updateRegistrationData } = useRegistration();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null }));
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleRetypedPasswordVisibility = () => {
    setRetypePasswordVisible((prev) => !prev);
  };
  return (
    <View style={styles.mainContainer}>
      {!keyboardVisible && (
        <ProfilePicture
          image={image}
          setImage={setImage}
          handleConfirm={updateRegistrationData}
          type={"auth"}
        />
      )}

      <Input
        placeholder={"Enter fullname"}
        label={"Fullname"}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        value={formData.fullname}
        setValue={(text) => handleChange("fullname", text)}
        errorText={formErrors.fullname}
      />
      <Input
        placeholder={"Enter username"}
        label={"Username"}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        value={formData.username}
        fixedValue={true}
        editable={false}
      />
      <Input
        placeholder={"Enter email"}
        label={"Email"}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        value={formData.email}
        setValue={(text) => handleChange("email", text)}
        errorText={formErrors.email}
        keyboardType="email-address"
      />
      <Input
        placeholder={"Enter password"}
        label={"Password"}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        value={formData.password}
        setValue={(text) => handleChange("password", text)}
        secure={!passwordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
        errorText={formErrors.password}
      />
      <Input
        placeholder={"Retype password"}
        label={"Retype password"}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
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
  mainContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  containerStyle: {
    width: "100%",
  },
  inputStyle: {
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default RegistrationFormFields;
