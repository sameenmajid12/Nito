import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_XL } from "../../styles";
function ProfileAccountInfoInput({
  iconName,
  label,
  placeholder,
  editable,
  value,
  setValue,
  isPassword,
  showPassword,
  setShowPassword,
  error,
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
          onChangeText={setValue}
          secureTextEntry={(isPassword && !showPassword) || false}
        ></TextInput>
        {isPassword ? (
          showPassword ? (
            <Pressable onPress={() => setShowPassword(false)}>
              <Ionicons
                name="eye-off-outline"
                style={styles.eyeIcon}
              ></Ionicons>
            </Pressable>
          ) : (
            <Pressable onPress={() => setShowPassword(true)}>
              <Ionicons name="eye-outline" style={styles.eyeIcon}></Ionicons>
            </Pressable>
          )
        ) : null}
      </View>
      {error?.length > 0 ? (
        <View style={styles.errorContainer}>
          <Ionicons style={styles.errorIcon} name="alert-circle"></Ionicons>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
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
  eyeIcon: {
    fontSize: 20,
    color: colors.textLight,
  },
  errorText: {
    fontFamily: "Nunito-SemiBold",
    color: "red",
  },
  errorContainer:{
    flexDirection:'row',
    alignItems:"flex-start",
    columnGap:5,
    marginTop:2
  },
  errorIcon:{
    fontSize:20,
    color:"red"
  }
});
export default ProfileAccountInfoInput;
