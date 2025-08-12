import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, TEXT_ACTIVE_OPACITY } from "../../styles";
import ConnectionItem from "./ConnectionItem";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
function ConnectionList({ screen, connections, navigation }) {
  return (
    <View>
      {connections.length > 0 ? (
        connections.map((connection, index) => (
          <ConnectionItem
            key={index}
            connection={connection}
            navigation={navigation}
            screen={screen}
          />
        ))
      ) : (
        <View style={styles.emptyStateWrapper}>
          <Text style={styles.emptyStateText}>
            It's a little quiet here... start texting and make some connections!
            🤝
          </Text>
          <TouchableOpacity activeOpacity={TEXT_ACTIVE_OPACITY} style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Chat now</Text>
            <Ionicons color={colors.primaryDark} size={FONT_SIZE_M} name="arrow-forward"></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateWrapper:{
    justifyContent:"center",
    paddingHorizontal:20,
    paddingVertical:30,
    rowGap:20
  },
  emptyStateText:{
    fontFamily:"Nunito-SemiBold",
    textAlign:"center",
  },
  emptyStateButton:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center",
    columnGap:2
  },
  emptyStateButtonText:{
    textAlign:"center",
    fontFamily:"Nunito-SemiBold",
    color:colors.primaryDark,
    fontSize:FONT_SIZE_M
  }
})
export default ConnectionList;
