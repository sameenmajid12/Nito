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

function ConnectionScreen({ navigation }) {
 const connections = [
    {
      fullname: "Mike Ross",
      profilePic: require("../../assets/images/mike.webp"),
      date: "Today",
    },
    {
      fullname:"Daniel Cormier",
      profilePic:require("../../assets/images/dc.jpg"),
      date:"Today",
    },
    {
      fullname: "SZA",
      profilePic: require("../../assets/images/sza.webp"),
      date: "Yesterday",
    },
    {
      fullname: "Harvey Specter",
      profilePic: require("../../assets/images/harvey.jpg"),
      date: "Yesterday",
    },
    {
      fullname: "Ilia Topuria",
      profilePic: require("../../assets/images/ilia.jpg"),
      date: "3d ago",
    },
  ];
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const [sortState, setSortState] = useState("newestfirst");
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader navigation={navigation} text={"Connections"} />
      <GestureDetector gesture={tapGesture}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <SearchConnection />
            <View style={styles.divider}></View>
            <SortConnection sortState={sortState} setSortState={setSortState} />
            <ConnectionList
              connections={connections}
              gap={15}
              sortState={sortState}
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
