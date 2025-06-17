import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { useModal } from "../../contexts/ModalContext";
function ConnectionItem({ connection }) {
  const {openModal} = useModal();
  return (
    <>
      <View style={styles.connection}>
        <Image
          source={require("../../assets/images/mike.webp")}
          width={50}
          height={50}
          style={styles.connectionProfilPic}
        ></Image>
        <View style={styles.connectionDetails}>
          <View>
            <Text style={styles.connectionName}>Mike Ross</Text>
            <Text style={styles.connectionDate}>Connected - Today</Text>
          </View>
          <Pressable onPress={()=>openModal(connection, "userModal")}>
            <Ionicons
              size={20}
              color={colors.textPrimary}
              name="ellipsis-horizontal"
            ></Ionicons>
          </Pressable>
        </View>
      </View>
    </>
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
