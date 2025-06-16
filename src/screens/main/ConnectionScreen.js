import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import {
  colors,
} from "../../styles";
import TextHeader from "../../components/common/TextHeader";
import { Ionicons } from "@expo/vector-icons";
import ConnectionList from '../../components/common/ConnectionList';
import Sort from "../../components/connection/Sort";
import Search from "../../components/connection/Search";
function ConnectionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader navigation={navigation} text={"Connections"} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <Search/>
          <View style={styles.divider}></View>
          <Sort/>
          <ConnectionList connections={['s','s','s']} gap={15}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    padding: 30,
    rowGap:20,
    marginBottom:60
  },
  
  divider: {
    width: "100%",
    height: 1,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  
  connectionsContainer:{
    rowGap:15
  }
});
export default ConnectionScreen;
