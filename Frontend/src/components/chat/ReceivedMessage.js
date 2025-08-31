import { View, Text, StyleSheet } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
import { Image } from "expo-image";
const PROFILE_PIC_SIZE = 33;
const TEXT_LEFT_MARGIN = 33 + 5;
const NAME_HEIGHT = 16;
function ReceivedMessage({
  text,
  isFirstByUser,
  isLastByUser,
  isMatch,
  otherUser,
  isLastMessage,
}) {
  const image = isMatch
    ? otherUser.profilePic
    : require("../../assets/images/anonymous-user.png");
  const name = isMatch ? otherUser.fullname : otherUser.username;
  return (
    <View style={{ flexDirection: "row", columnGap: 5 }}>
      {isFirstByUser && image && (
        <Image style={styles.profilePic} source={image}></Image>
      )}
      <View style={{ flex: 1 }}>
        {isFirstByUser && <Text style={styles.name}>{name}</Text>}
        <View
          style={[
            styles.receivedMessage,
            isFirstByUser ? styles.first : null,
            isLastByUser ? styles.last : null,
            !isFirstByUser ? { marginLeft: TEXT_LEFT_MARGIN } : null,
            { marginBottom: isLastMessage ? 40 : isLastByUser ? 20 : 0 },
          ]}
        >
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  receivedMessage: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 20,
    maxWidth: "70%",
    marginBottom: 1,
  },
  text: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  last: {
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  profilePic: {
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: 999,
    marginTop: NAME_HEIGHT,
  },
  name: {
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
  },
});
export default ReceivedMessage;
