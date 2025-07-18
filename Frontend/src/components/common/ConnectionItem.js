import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { useModal } from "../../contexts/ModalContext";
function ConnectionItem({ connection, navigation }) {
  const { openModal } = useModal();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("UserScreen", {
          user: {
            fullname: "Michelle Ozimanic",
            username: "user8192841801",
            profilePic:
              "https://nito-s3-image-bucket.s3.us-east-1.amazonaws.com/photo_1752043809848.jpg",
            bio: "Hey! My name is Michelle",
            year: 2027,
            major: "Health",
            socialMedia: {
              instagram: "ozi.jpegg",
              snapchat: "michelle.ozi",
            },
            tags: ["Hockey", "Friends", "UFC", "MMA", "Music", "Greek life", "ZTA"],
          },
        })
      }
      style={styles.connection}
    >
      <Image
        source={connection.profilePic}
        width={50}
        height={50}
        style={styles.connectionProfilPic}
      ></Image>
      <View style={styles.connectionDetails}>
        <View>
          <Text style={styles.connectionName}>{connection.fullname}</Text>
          <Text style={styles.connectionDate}>
            Connected - {connection.date}
          </Text>
        </View>
        <TouchableOpacity onPress={() => openModal(connection, "userModal")}>
          <Ionicons
            size={20}
            color={colors.textPrimary}
            name="ellipsis-horizontal"
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  connection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  connectionProfilPic: {
    borderRadius: 999,
  },
  connectionDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  connectionName: {
    fontFamily: "Nunito-Bold",
    color: colors.textPrimary,
    fontSize: FONT_SIZE_M,
  },
  connectionDate: {
    color: colors.textLight,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});
export default ConnectionItem;
