import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_XS,
  PRIMARY_ACTIVE_OPACITY,
} from "../../styles";
import Input from "../common/Input";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
function ContactUs() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { addAlert } = useAlert();
  const sendMessage = async () => {
    if (message.trim().length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/support`,

        { message: message.trim() },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addAlert("success", "Message sent");
    } catch (e) {
      addAlert("error", "Error sending message");
    } finally {
      setMessage("");
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Didn’t find an answer?</Text>
        <Text style={styles.subheader}>
          Send us a message, we will get back to you shortly!
        </Text>
      </View>
      <Input
        label={"Message"}
        containerStyle={{ width: "100%" }}
        inputStyle={[styles.input, { minHeight: 80 }]}
        labelStyle={{ color: colors.textPrimary }}
        placeholder={"Enter message!"}
        textAlignVertical={true}
        value={message}
        setValue={(e) => setMessage(e)}
      ></Input>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          activeOpacity={PRIMARY_ACTIVE_OPACITY}
          style={[styles.button, message ? styles.buttonActive : styles.buttonDisabled]}
          onPress={sendMessage}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white}></ActivityIndicator>
          ) : (
            <Text style={styles.buttonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  headerWrapper: {
    paddingBottom: 20,
  },
  header: {
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_L,
  },
  subheader: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
    textAlign: "center",
  },
  inputLabel: {
    fontFamily: "Nunito-SemiBold",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,

  },
  buttonActive: {
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.15,
  },
  buttonDisabled: {
    backgroundColor: colors.primary50
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XS,
  },
});
export default ContactUs;
