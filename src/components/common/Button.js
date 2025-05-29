import { Pressable, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors, textStyles } from "../../styles";
function Button({ title, onPress, disabled, isLoading, variant, style }) {
  if(!variant){
    variant = "primary";
  }
  return (
    <TouchableOpacity activeOpacity={0.9} style={[style, variant==="primary"?styles.primaryButton:variant==="secondary"?styles.secondayButton:styles.tertiaryButton]} onPress={onPress} disabled={disabled || false}>
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.purple} />
      ) : (
        <Text style={variant === 'primary'?textStyles.buttonTextPrimary:variant==="secondary"?textStyles.buttonTextSecondary:textStyles.buttonTextPrimary}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  primaryButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: "0.25",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius:8
  },
  secondayButton: {
    borderWidth:1,
    borderColor:colors.primaryDark,
    borderRadius: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    
  },
  tertiaryButton:{
    borderRadius: 5,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: "0.15",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius:8
  }
});

export default Button;