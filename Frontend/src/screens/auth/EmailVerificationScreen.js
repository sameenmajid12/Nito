import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XL,
  TEXT_ACTIVE_OPACITY,
} from "../../styles";
import { Image } from "expo-image";
import { useRegistration } from "../../contexts/RegistrationContext";
import Button from "../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useAuth } from "../../contexts/AuthContext";
import ErrorMessage from "../../components/common/ErrorMessage";
function EmailVerificationScreen({ navigation }) {
  const { registrationData } = useRegistration();
  const { verifyEmail, register, isLoadingRegistration } = useAuth();
  const [code, setCode] = useState([]);
  const [error, setError] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const sendVerificationEmail = async () => {
      try {
        await axios.post(`${API_BASE_URL}/auth/send-verification`, {
          email: registrationData.email,
        });
      } catch (e) {
        console.error(e);
      } finally {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start();
      }
    };
    sendVerificationEmail();
  }, []);
  const inputRefs = useRef([]);

  const changeText = (num, index) => {
    if (num.length <= 1) {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[index] = num;
        return newCode;
      });
      if (index < 4 && num) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const navigateBack = () => {
    navigation.replace("Register2");
  };
  const finishRegistration = async () => {
    const { verified, message } = await verifyEmail(
      registrationData.email,
      code
    );
    if (verified) {
      setError("");
      register(registrationData);
    } else {
      setError(message);
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <Pressable onPress={navigateBack} style={styles.navigateBack}>
        <Ionicons size={FONT_SIZE_L} name="chevron-back-outline"></Ionicons>
        <Text style={{ fontFamily: "Nunito-SemiBold", fontSize: FONT_SIZE_M }}>
          Back
        </Text>
      </Pressable>

      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <Image
          source={require("../../assets/images/emailVerification.png")}
          style={styles.emailIcon}
        ></Image>
        <View>
          <Text style={styles.header}>Email verification</Text>
          <Text style={styles.subheader}>
            We sent an email to {registrationData.email}. {"\n"} Please enter
            the code you received
          </Text>
        </View>

        <View>
          <View style={styles.inputWrapper}>
            {[...Array(5)].map((_, index) => {
              return (
                <TextInput
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  keyboardType="numeric"
                  style={[
                    styles.input,
                    { borderColor: error ? "red" : colors.borderLight },
                  ]}
                  value={code[index]}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onChangeText={(text) => changeText(text, index)}
                  maxLength={1}
                ></TextInput>
              );
            })}
          </View>
          {error && (
            <ErrorMessage
              message={error}
              style={{ marginTop: 5 }}
            ></ErrorMessage>
          )}
        </View>
        <Button
          onPress={finishRegistration}
          title={"Continue"}
          style={{ width: "100%", height: 45 }}
          isLoading={isLoadingRegistration}
        ></Button>
        <View style={styles.notReceivedWrapper}>
          <Text style={styles.noReceivedText}>Didn't receive an email? </Text>
          <TouchableOpacity activeOpacity={TEXT_ACTIVE_OPACITY}>
            <Text style={styles.noReceivedButton}>Click here</Text>
          </TouchableOpacity>
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
  navigateBack: {
    marginLeft: 40,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  emailIcon: {
    width: 100,
    height: 100,
    contentFit: "contain",
  },
  contentWrapper: {
    alignItems: "center",
    rowGap: 20,
    paddingTop: 20,
    paddingHorizontal: 40,
    width: "100%",
    paddingTop: 150,
  },
  header: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XL,
    textAlign: "center",
  },
  subheader: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_S,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    textAlign: "center",
    color: colors.textPrimary,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_L,
  },
  notReceivedWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  noReceivedText: {
    fontFamily: "Nunito-Medium",
    color: colors.textPrimary,
  },
  noReceivedButton: {
    color: colors.primary,
    fontFamily: "Nunito-Bold",
  },
});
export default EmailVerificationScreen;
