import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Keyboard
} from "react-native";
import { colors } from "../../styles";
import TextHeader from "../../components/common/TextHeader";
import ConnectionList from "../../components/common/ConnectionList";
import SortConnection from "../../components/connection/SortConnection";
import SearchConnection from "../../components/connection/SearchConnection";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
function ConnectionScreen({ navigation }) {
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader navigation={navigation} text={"Connections"} />
      <GestureDetector gesture={tapGesture}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <SearchConnection />
            <View style={styles.divider}></View>
            <SortConnection />
            <ConnectionList connections={["s", "s", "s"]} gap={15} />
          </View>
        </ScrollView>
      </GestureDetector>
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
    rowGap: 20,
    marginBottom: 60,
  },

  divider: {
    width: "100%",
    height: 1,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  connectionsContainer: {
    rowGap: 15,
  },
});
export default ConnectionScreen;
