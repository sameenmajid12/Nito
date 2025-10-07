import { StyleSheet, Text } from "react-native";
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