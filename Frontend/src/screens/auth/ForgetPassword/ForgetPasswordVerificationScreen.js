import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { colors, TEXT_ACTIVE_OPACITY } from "../../../styles";

import { useEffect, useState, useRef } from "react";
import EmailVerificationInput from "../../../components/auth/EmailVerificationInput";
import { useAuth } from "../../../contexts/AuthContext";
import ForgotPasswordLayout from "../../../components/auth/ForgotPasswordLayout";

function ForgtoPasswordVerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const { sendVerificationEmail, verifyEmail } = useAuth();
  useEffect(() => {
    if (email) {
      sendVerificationEmail(email);
    }
  }, []);
  const continueToNext = async () => {
    const { verified, resetToken } = await verifyEmail(
      email,
      code,
      "passwordReset"
    );
    console.log(resetToken);
    if (!verified) {
      setError("Incorrect code, please try again");
      return;
    }
    navigation.navigate("ForgotPassword2", { resetToken });
  };
  const inputComponent = (
    <>
      <EmailVerificationInput
        code={code}
        setCode={setCode}
        error={error}
        inputSize={65}
      />
      <View style={styles.missingCodeWrapper}>
        <Text style={styles.missingCode}>Didn't get an email? </Text>
        <TouchableOpacity activeOpacity={TEXT_ACTIVE_OPACITY}>
          <Text style={styles.missingCodeLink}>Click here</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <ForgotPasswordLayout
      header={"Verify email"}
      subheader={`We sent an email to ${email} Please enter the code you received`}
      confirm={continueToNext}
      buttonText={"Continue"}
      inputComponent={inputComponent}
      navigation={navigation}
    />
  );
}
const styles = StyleSheet.create({
  missingCodeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  missingCode: {
    fontFamily: "Nunito-SemiBold",
  },
  missingCodeLink: {
    color: colors.primaryDark,
    fontFamily: "Nunito-Bold",
  },
});
export default ForgtoPasswordVerificationScreen;
