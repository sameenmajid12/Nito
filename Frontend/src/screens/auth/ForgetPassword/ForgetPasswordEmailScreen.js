import { StyleSheet } from "react-native";
import Input from "../../../components/common/Input";
import { useState } from "react";
import ForgotPasswordLayout from "../../../components/auth/ForgotPasswordLayout";

function ForgotPasswordEmailScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[A-Za-z0-9]+@/;
  const continueToNext = () => {
    if (email.length === 0) {
      setError("Please enter your email");
      return;
    }
    navigation.navigate("ForgotPassword1", { email });
  };
  const inputComponent = (
    <Input
      label={"Email"}
      placeholder={"Enter email"}
      value={email}
      setValue={setEmail}
      containerStyle={{ width: "100%" }}
      inputStyle={styles.input}
      errorText={error ?? null}
    ></Input>
  );
  return (
    <ForgotPasswordLayout
      inputComponent={inputComponent}
      confirm={continueToNext}
      buttonText={"Continue"}
      header={"Reset password"}
      subheader={
        "Enter your email and enter the verificaiton code sent your email on the next page"
      }
      navigation={navigation}
      buttonDisabled={!emailRegex.test(email)}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
export default ForgotPasswordEmailScreen;
