import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../styles";

function ProfileScreen(){
  return (<SafeAreaView style={styles.page}>

  </SafeAreaView>)
}
const styles = StyleSheet.create({
  page:{
    flex:1,
    backgroundColor:colors.background
  }
})
export default ProfileScreen;