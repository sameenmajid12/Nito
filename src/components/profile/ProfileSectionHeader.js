import { StyleSheet, Text, View } from "react-native";
import {colors, FONT_SIZE_M} from '../../styles'
function ProfileSectionHeader({header}){
  return(
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer:{
    paddingVertical:3,
    borderBottomWidth:1,
    borderBottomColor:colors.borderLight
  },
  headerText:{
    fontFamily:"Nunito-SemiBold",
    color:colors.textPrimary70,
    fontSize:FONT_SIZE_M
  }
})
export default ProfileSectionHeader;