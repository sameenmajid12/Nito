import { Pressable, StyleSheet,Text } from "react-native";
import { colors } from "../../styles";
function SkipButton(){
  return(
    <Pressable style={styles.button}><Text style={styles.buttonText}>Skip</Text></Pressable>
  )
}
const styles= StyleSheet.create({
  button:{
    width:130,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderColor:colors.blue,
    borderWidth:1,
    borderRadius:999
  },
  buttonText:{
    color:colors.blue,
    fontFamily:"Nunito-Medium"
  }
})
export default SkipButton;