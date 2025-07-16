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
      <ConnectionList connections={connections} gap={15} />
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
