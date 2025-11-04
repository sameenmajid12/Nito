import { StyleSheet, View, TextInput } from "react-native";
import ErrorMessage from "../common/ErrorMessage";
import { useRef } from "react";
import { colors, FONT_SIZE_L } from "../../styles";
import { scaleSize } from "../../styles";
function EmailVerificationInput({ code, setCode, error, inputSize }) {
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
  return (
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
                {width:scaleSize(inputSize), height: scaleSize(inputSize)}
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
        <ErrorMessage message={error} style={{ marginTop: 5 }}></ErrorMessage>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input:{
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    textAlign: "center",
    color: colors.textPrimary,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_L,
  }
});
export default EmailVerificationInput;
