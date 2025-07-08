import { StyleSheet, Text } from "react-native";
import { colors } from "../../styles";
function ErrorMessage({message, style}){
  return(
    <Text style={[styles.text, style]}>{message}</Text>
  )
}
const styles = StyleSheet.create({
  text:{
    color:'red',
    fontFamily:"Nunito-SemiBold",
  }
})
export default ErrorMessage;