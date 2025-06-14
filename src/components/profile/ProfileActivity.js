import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, FONT_SIZE_XL, FONT_SIZE_XS } from "../../styles";
import ProfileSectionHeader from "./ProfileSectionHeader";
import { Pressable, StyleSheet, Text, View } from "react-native";
function ProfileActivity() {
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"Activity"}></ProfileSectionHeader>
      <View style={styles.activityContainer}>
        <Pressable style={styles.activity}>
          <View>
            <Text style={styles.number}>14</Text>
            <Text style={styles.description}>Connections made</Text>
          </View>
          <Ionicons style={styles.arrow} name="arrow-forward"></Ionicons>
        </Pressable>
        <Pressable style={styles.activity}>
          <View>
            <Text style={styles.number}>27</Text>
            <Text style={styles.description}>Connections skipped</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    rowGap: 15,
  },
  activityContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  activity: {
    flex: 1,
    backgroundColor: colors.primary,
    padding:15,
    borderRadius:15,
    shadowColor:"#000",
    shadowRadius:4,
    shadowOffset:{width:0, height:4},
    shadowOpacity:0.2
  },
  number:{
    fontFamily:"Nunito-Bold",
    fontSize:FONT_SIZE_L,
    color:colors.white
  },
  description:{
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_XS,
    color:colors.white70,
  },
  arrow:{
    color:colors.white,
    fontSize:FONT_SIZE_L,
    position:"absolute",
    right:15,
    top:15
  }
});
export default ProfileActivity;
