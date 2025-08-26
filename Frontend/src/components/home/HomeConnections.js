import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, FONT_SIZE_M, TEXT_ACTIVE_OPACITY } from "../../styles";
import ConnectionList from "../common/ConnectionList";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../contexts/UserContext";

function Connections({ navigation }) {
  const { user } = useUser();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recent connections</Text>
        <TouchableOpacity
          activeOpacity={TEXT_ACTIVE_OPACITY}
          style={styles.viewAll}
          onPress={() => navigation.navigate("ConnectionScreen")}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons
            size={FONT_SIZE_M}
            color={colors.primaryDark}
            name="chevron-forward-outline"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <ConnectionList
        connections={user.revealedUsers}
        screen={"home"}
        navigation={navigation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    rowGap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  header: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  viewAllText: {
    fontFamily: "Nunito-Bold",
    color: colors.primaryDark,
    fontSize: FONT_SIZE_M,
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
});
export default Connections;
