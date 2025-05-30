import { TextInput, Text, View, StyleSheet } from "react-native";
import { textStyles } from "../../styles";
import { colors } from "../../styles";
function Input({
  placeholder,
  value,
  setValue,
  label,
  inputStyle,
  containerStyle,
  labelStyle,
  secure
}) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[labelStyle, textStyles.inputLabel]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={[styles.input, inputStyle]}
        secureTextEntry={secure || false}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.textPrimary,
    fontFamily: "Nunito-Medium",
  },
});
export default Input;
