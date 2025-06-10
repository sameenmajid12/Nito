import { SafeAreaView, StyleSheet } from "react-native";
import { colors, pageStyle } from "../../styles";
function ChatScreen(){
  console.log(pageStyle);
  return(
    <SafeAreaView style={styles.page}>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  page:{
    backgroundColor:colors.background,
    flex:1
  }
})
export default ChatScreen;