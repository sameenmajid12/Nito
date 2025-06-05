import { View,StyleSheet } from "react-native";
import Logo from "./Logo";
import { colors } from "../../styles";

function Header(){
  return(
    <View style={styles.HeaderContainer}>
      <Logo width={60} height={25}/>
    </View>
  )
}
const styles = StyleSheet.create({
  HeaderContainer:{
    width:"100%",
    paddingLeft:30,
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:colors.borderLight
  }
})
export default Header;