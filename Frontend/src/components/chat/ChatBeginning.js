import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { colors, FONT_SIZE_L } from "../../styles";

function ChatBeginnning({
  user,
  isMatch,
}) {
  const image = isMatch
    ? user.profilePic
    : require("../../assets/images/anonymous-user.png");
  return (
    <View style={styles.sectionWrapper}>
      <Image style={styles.profilePic} source={image}></Image>
      <View style={styles.textWrapper}>
        {isMatch && <Text style={styles.fullname}>{user.fullname}</Text>}
        <Text style={isMatch ? styles.username : styles.fullname}>
          @{user.username}
        </Text>
        <Text style={styles.startMessage}>
          Send a message and start the conversation!
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionWrapper:{
    justifyContent:"center",
    alignItems:"center",
    rowGap:20,
    marginBottom:30
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 999,
  },
  textWrapper:{
    alignItems:"center",
    rowGap:2
  },
  fullname: {
    fontFamily:"Nunito-Bold",
    fontSize:FONT_SIZE_L,
    color:colors.textPrimary
  },
  username: {
    fontFamily:"Nunito-SemiBold",
    color:colors.textPrimary70
  },
  startMessage: {
    fontFamily:"Nunito-SemiBold",
    color:colors.textPlaceholder
  },
});
export default ChatBeginnning;
