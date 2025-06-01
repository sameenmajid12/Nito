import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LayoutAnimation, 
  Pressable,
  Animated
} from "react-native";
import { colors, FONT_SIZE_XL, FONT_SIZE_XS } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import AddProfilePicture from "../../components/auth/AddProfilePicture";
import { useEffect, useRef, useState } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";

function YourDetailsScreen({ navigation }) {
  const { updateRegistrationData } = useRegistration();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [image, setImage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keybaordWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration:225});
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide", 
      () => {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration:225});
        setKeyboardVisible(false);
      }
    );
    Animated.timing(fadeAnim,{
      toValue:1,
      useNativeDriver:true,
      duration:700
    }).start();
    return () => {
      keybaordWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []); 

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
  const navigateBack = () =>{
    navigation.replace("Register");
  }
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ paddingHorizontal: 40, paddingVertical: 20, opacity:fadeAnim }}>
        {!keyboardVisible && (
          <Pressable onPress={navigateBack} style={styles.headerContainer}>
          <Ionicons size={24} name="chevron-back-outline"></Ionicons>
          <Text
            style={{
              color: colors.textPrimary,
              fontFamily: "Nunito-SemiBold",
              fontSize: FONT_SIZE_XL,
            }}
          >
            Your details
          </Text></Pressable>
        )}
        <View style={styles.inputContainer}>
          {!keyboardVisible && <AddProfilePicture image={image} setImage={setImage}/>}

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
      </Animated.View>
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
  headerContainer:{
    flexDirection:"row",
    alignItems:'center',
    columnGap:5
  }
});

export default YourDetailsScreen;