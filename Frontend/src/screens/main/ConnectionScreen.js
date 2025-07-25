import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { colors } from "../../styles";
import TextHeader from "../../components/common/TextHeader";
import ConnectionList from "../../components/common/ConnectionList";
import SortConnection from "../../components/connection/SortConnection";
import SearchConnection from "../../components/connection/SearchConnection";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
function ConnectionScreen({ navigation }) {
  const { user } = useUser();
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const [sortState, setSortState] = useState("newestfirst");
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader navigation={navigation} text={"Connections"} />
      <GestureDetector gesture={tapGesture}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.headerWrapper}>
              <SearchConnection />
              <View style={styles.divider}></View>
              <SortConnection
                sortState={sortState}
                setSortState={setSortState}
              />
            </View>
            <ConnectionList
              connections={user?.revealedUsers}
              gap={15}
              sortState={sortState}
              navigation={navigation}
            />
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
    rowGap: 20,
    marginBottom: 60,
  },

  divider: {
    width: "100%",
    height: 1,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  headerWrapper:{
    paddingHorizontal:30,
    paddingTop:30,
    rowGap:20
  }
});
export default ConnectionScreen;
