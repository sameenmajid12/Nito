import { StyleSheet,View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { colors } from "../../styles";
function AddProfilePicture() {
  return (
    <View style={styles.cameraContainer}>
      <Image
        source={require("../../assets/icons/camera.svg")}
        style={styles.cameraIcon}
      ></Image>
      <View style={styles.plusIconContainer}>
        <Ionicons name="add-outline" style={styles.plusIcon}></Ionicons>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cameraIcon: {
    width: 80,
    height: 80,
    opacity: 0.4,
  },
  plusIconContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.background,
    padding: 5,
  },
  plusIcon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: colors.border,
  },
});
export default AddProfilePicture;
