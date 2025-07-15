import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import ConnectionList from "../common/ConnectionList";
import { Ionicons } from "@expo/vector-icons";

function Connections({ navigate }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recent connections</Text>
        <TouchableOpacity
        activeOpacity={0.25}
          style={styles.viewAll}
          onPress={() => navigate("ConnectionScreen")}
        >
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons
            size={FONT_SIZE_M}
            color={colors.primaryDark}
            name="chevron-forward-outline"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <ConnectionList connections={["s", "s", "s", "s", "s"]} gap={15} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    rowGap: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: 10,
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
