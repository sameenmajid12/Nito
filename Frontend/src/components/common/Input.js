import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import {
  FONT_FAMILY_SEMIBOLD,
  FONT_SIZE_S,
  FONT_SIZE_XS,
  LINE_HEIGHT_XS,
} from "../../styles";
import { colors } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import ErrorMessage from "./ErrorMessage";
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
  onSubmitEditing,
  returnKeyType,
  errorText,
  textAlignVertical,
  editable,
  fixedValue
}) {
  return (
    <View style={[styles.inputContainer, containerStyle, errorText?{marginBottom:10}:{marginBottom:15}]}>
      <Text style={[labelStyle, styles.label]}>{label}</Text>
      <View>
        <TextInput
          textContentType="none"
          spellCheck={false}
          autoCorrect={false}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          style={[
            styles.input,
            inputStyle,
            errorText ? { borderColor: "red" } : editable? {borderColor:colors.primary70} : { borderColor: colors.borderLight },
            fixedValue ? {color:colors.textLight} : {color:colors.textPrimary}
          ]}
          secureTextEntry={secure || false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          textAlignVertical={textAlignVertical?"top":"auto"}
          multiline={textAlignVertical}
          numberOfLines={3}
          editable={editable}
          
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
      {errorText && (
        <ErrorMessage message={errorText} style={{ fontSize: FONT_SIZE_XS }} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
  },
  input: {
    borderWidth: 1,
    minHeight: 45,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Nunito-Medium",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    width: 36,
    height: 45,
    alignItems: "center",
    transform: [{ translateY: "-20%" }],
  },
  eyeIcon: {
    width: 18,
    height: 18,
    fontSize: 18,
    color: colors.textSecondary,
  },
  label: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_XS,
  },
});
export default Input;
