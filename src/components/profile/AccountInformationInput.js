import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_XL } from "../../styles";
function AccountInformationInput({
  iconName,
  label,
  placeholder,
  editable,
  value,
  setValue,
  secure,
}) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          style={[
            styles.icon,
            editable
              ? { color: colors.textPrimary }
              : { color: colors.textLight },
          ]}
          name={iconName}
        ></Ionicons>
        <TextInput
          style={[
            styles.input,
            editable
              ? { color: colors.textPrimary }
              : { color: colors.textLight },
          ]}
          placeholder={placeholder}
          editable={editable}
          value={value}
          setValue={setValue}
          secureTextEntry={secure || false}
        ></TextInput>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 12,
    columnGap: 7,
  },
  label: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
  },
  icon: {
    fontSize: FONT_SIZE_XL,
    color: colors.textPrimary,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Nunito-SemiBold",
    height: "100%",
  },
});
export default AccountInformationInput;
