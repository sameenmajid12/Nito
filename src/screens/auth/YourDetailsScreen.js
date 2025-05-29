import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { colors, FONT_SIZE_XL, FONT_SIZE_XS } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useState } from "react";
function YourDetailsScreen({navigation}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
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
          <View style={styles.cameraContainer}>
            <Image
              source={require("../../assets/icons/camera.svg")}
              style={styles.cameraIcon}
            ></Image>
            <View style={styles.plusIconContainer}>
              <Ionicons name="add-outline" style={styles.plusIcon}></Ionicons>
            </View>
          </View>
          <Input
            placeholder={"Enter name"}
            label={"Name"}
            containerStyle={{ width: "100%" }}
            value={name}
            setValue={setName}
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
          ></Input>
          <Input
            placeholder={"Enter password"}
            label={"Retype password"}
            containerStyle={{ width: "100%" }}
            value={retypePassword} 
            setValue={setRetypePassword}
          ></Input>
          <Button
          onPress={()=>navigation.replace("Register2")}
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
  cameraContainer: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cameraIcon: {
    width: 80,
    height: 80,
    opacity: 0.4,
  },
  plusIconContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.background,
    padding: 5,
  },
  plusIcon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: colors.border,
  },
  inputContainer: {
    paddingTop: 40,
    alignItems: "center",
    rowGap: 15,
  },
});
export default YourDetailsScreen;
