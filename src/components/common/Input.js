import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles";
import { colors } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function Input({
  placeholder,
  value,
  setValue,
  label,
  inputStyle,
  containerStyle,
  labelStyle,
  secure,
  togglePasswordVisibility,
}) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[labelStyle, textStyles.inputLabel]}>{label}</Text>
      <TextInput
        textContentType=  "oneTimeCode"
        spellCheck={false}
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={[styles.input, inputStyle]}
        secureTextEntry={secure || false}
      ></TextInput>
      {secure !== undefined ? (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={secure ? "eye-outline" : "eye-off-outline"}
            size={18}
            color={colors.textSecondary}
          />
        </Pressable>
      ) : null}
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
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    width: 36,
    height: 45,
    alignItems: "center",
  },
  eyeIcon: {
    width: 18,
    height: 18,
    fontSize: 18,
    color: colors.textSecondary,
  },
});
export default Input;
