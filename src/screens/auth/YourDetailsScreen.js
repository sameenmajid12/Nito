import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, FONT_SIZE_XL, FONT_SIZE_XS } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import AddProfilePicture from "../../components/auth/AddProfilePicture";
import { useState } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
function YourDetailsScreen({ navigation }) {
  const { updateRegistrationData } = useRegistration();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleRetypedPasswordVisibility = () => {
    setRetypePasswordVisible((prev) => !prev);
  };
  const continueRegistration = () => {
    updateRegistrationData({ fullname, username, email, password });
    navigation.replace("Register2");
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontFamily: "Nunito-SemiBold",
            fontSize: FONT_SIZE_XL,
          }}
        >
          Your details
        </Text>
        <View style={styles.inputContainer}>
          <AddProfilePicture />
          <Input
            placeholder={"Enter fullname"}
            label={"Fullname"}
            containerStyle={{ width: "100%" }}
            value={fullname}
            setValue={setFullname}
          ></Input>
          <Input
            placeholder={"Enter username"}
            label={"Username"}
            containerStyle={{ width: "100%" }}
            value={username}
            setValue={setUsername}
          ></Input>
          <Input
            placeholder={"Enter email"}
            label={"Email"}
            containerStyle={{ width: "100%" }}
            value={email}
            setValue={setEmail}
          ></Input>
          <Input
            placeholder={"Enter password"}
            label={"Password"}
            containerStyle={{ width: "100%" }}
            value={password}
            setValue={setPassword}
            secure={!passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          ></Input>
          <Input
            placeholder={"Enter password"}
            label={"Retype password"}
            containerStyle={{ width: "100%" }}
            value={retypePassword}
            setValue={setRetypePassword}
            secure={!retypePasswordVisible}
            togglePasswordVisibility={toggleRetypedPasswordVisibility}
          ></Input>
          <Button
            onPress={continueRegistration}
            title={"Continue"}
            style={{ width: "100%", height: 45, marginTop: 10 }}
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
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputContainer: {
    paddingTop: 40,
    alignItems: "center",
    rowGap: 15,
  },
});
export default YourDetailsScreen;
