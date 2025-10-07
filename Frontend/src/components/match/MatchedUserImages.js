  import { Image } from "expo-image";
  import { useUser } from "../../contexts/UserContext";
  import { StyleSheet, View, Text } from "react-native";
  import { colors, FONT_SIZE_XXL } from "../../styles";

  function MatchedUserImages({ matchedUser }) {
    const { user } = useUser();
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.imageContainer, { left: 20 }]}>
          <Image style={styles.image} source={user.profilePic}></Image>
        </View>
        <View style={[styles.imageContainer, { right: 20, zIndex: 100 }]}>
          <Image style={styles.image} source={matchedUser.profilePic}></Image>
        </View>
        <Text style={styles.handshakeEmoji}>🤝</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    mainContainer: { position: "relative", height: 175, width: "100%" },
    imageContainer: {
      position: "absolute",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    image: {
      width: 175,
      height: 175,
      borderRadius: 999,
      borderWidth: 3,
      borderColor: colors.primary,
    },
    handshakeEmoji: {
      fontSize: FONT_SIZE_XXL,
      position: "absolute",
      left: 170,
      bottom: -20,
    },
  });
  export default MatchedUserImages;
