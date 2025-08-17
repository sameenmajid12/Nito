import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
} from "react-native";
import { colors } from "../../styles";
import TextHeader from "../../components/common/TextHeader";
import ConnectionList from "../../components/common/ConnectionList";
import SortConnection from "../../components/connection/SortConnection";
import SearchConnection from "../../components/connection/SearchConnection";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
function ConnectionScreen({ navigation }) {
  const { user } = useUser();
  const tapGesture = Gesture.Tap().onTouchesDown(() => Keyboard.dismiss());
  const [sortState, setSortState] = useState("newestfirst");
  const [connections, setConnections] = useState(user?.revealedUsers);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!connections) return;
    setConnections((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const timeA = new Date(a.matchTime).getTime();
        const timeB = new Date(b.matchTime).getTime();
        if (sortState === "newestfirst") {
          return timeB - timeA;
        } else if (sortState === "oldestfirst") {
          return timeA - timeB;
        } else {
          return a.user.fullname.localeCompare(b.user.fullname);
        }
      });
      return sorted;
    });
  }, [sortState]);
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader navigation={navigation} text={"Connections"} />
      <GestureDetector gesture={tapGesture}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <SearchConnection
              setConnections={setConnections}
              search={search}
              setSearch={setSearch}
            />
            <View style={styles.divider}></View>

            <GestureDetector gesture={tapGesture}>
              <View>
                <SortConnection
                  sortState={sortState}
                  setSortState={setSortState}
                />
                <ConnectionList
                  connections={connections}
                  gap={15}
                  sortState={sortState}
                  navigation={navigation}
                />
              </View>
            </GestureDetector>
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
    marginHorizontal:30
  },
  headerWrapper: {
    paddingHorizontal: 30,
    paddingTop: 30,
    rowGap: 20,
  },
});
export default ConnectionScreen;
