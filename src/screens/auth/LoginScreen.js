import { SafeAreaView, StyleSheet, View, Text, Animated } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, textStyles } from "../../styles";
import Button from "../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import LoginDecorationShapes from "../../components/auth/LoginDecorationShapes";
import Input from "../../components/common/Input";
import { useEffect, useRef, useState } from "react";
import Logo from "../../components/common/Logo";
import SchoolSelector from "../../components/auth/SchoolSelector";
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LoginDecorationShapes opacity={fadeAnim} />

        <View style={styles.pageContentContainer}>
          <Logo style={{ marginBottom: 10 }} />
          <Text style={[textStyles.h3, { marginBottom: 10 }]}>
            Chat freely. Chat anonymously.
          </Text>
          <SchoolSelector />
          <Input
            label={"Email"}
            placeholder={"Enter email"}
            containerStyle={{ marginBottom: 15 }}
            value={email}
            setValue={setEmail}
          ></Input>
          <Input
            label={"Password"}
            placeholder={"Enter password"}
            containerStyle={{ marginBottom: 25 }}
            value={password}
            setValue={setPassword}
          ></Input>

          <Button title="Login" style={{ width: "80%", height: 45 }} />
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.noAccountText}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.replace("Register")}
            style={{ color: colors.primary, fontFamily: "Nunito-Bold" }}
          >
            Register
          </Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  pageContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 195,
  },
  noAccountText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
    color: colors.textPrimary,
  },
});

export default LoginScreen;
