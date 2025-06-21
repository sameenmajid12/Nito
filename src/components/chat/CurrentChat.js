import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function CurrentChat() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.time}>23 minutes 12 seconds <Text style={styles.infoText}>remaining</Text></Text>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../assets/images/anonymous-user.png")}
            style={styles.image}
          ></Image>
          <View>
            <Text style={styles.username}>user924810421</Text>
            <Text style={styles.details}>
              You have 30 minutes, say hi and see if there’s a match!
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Chat now</Text>
          <Ionicons
            name="arrow-forward"
            size={FONT_SIZE_S}
            color={colors.white}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>You both like: <Text style={styles.interests}>Valorant, Playboi Carti, Kendrick Lamar, Rihanna, Kai Cenat</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer:{
    paddingTop: 40,
    rowGap:10,
    maxWidth:350,
    alignItems:"center"
  },
  mainContainer: {
    alignItems:"center",
    backgroundColor:"rgba(0,0,0,0.05)",
    paddingVertical:70,
    paddingHorizontal:20,
    borderRadius:30,
    rowGap:30
  },
  topContainer: { justifyContent: "center", alignItems: "center", rowGap: 15 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 999,
  },
  username: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    textAlign: "center",
    color: colors.textPrimary,
  },
  details: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
  },
  buttonContainer: {},
  buttonContainer: {
    height: 45,
    width: 250,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
    fontSize: FONT_SIZE_S,
  },
  infoText:{
    textAlign:"center",
    fontFamily:"Nunito-SemiBold",
    color:colors.textPrimary
  },
  interests:{
    color:colors.accent,
    fontFamily:"Nunito-Bold"
  },
  time:{
    fontFamily:"Nunito-Bold",
    fontSize:FONT_SIZE_M
  }
});
export default CurrentChat;
