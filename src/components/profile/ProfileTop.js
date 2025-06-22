import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { FONT_SIZE_S, colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function ProfileTop({ editing, setEditing, saveChanges, resetChanges, changesMade }) {
  
  return (
    <View style={styles.profileTop}>
      <Image
        source={require("../../assets/images/mike.webp")}
        style={styles.profilePicture}
      ></Image>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.fullname}>Mike Ross</Text>
        <Text style={styles.username}>@user21284912</Text>
      </View>
      {!editing ? (
        <Pressable onPress={() => setEditing(true)} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
          <Ionicons
            name="create-outline"
            size={FONT_SIZE_S}
            color={colors.primary}
          ></Ionicons>
        </Pressable>
      ) : (
        <View style={styles.updateButtonsContainer}>
          <Pressable
            disabled={!changesMade}
            style={[changesMade?styles.save:styles.noChange, styles.updateButton]}
            onPress={saveChanges}
          >
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.updateButton, styles.cancel]}
            onPress={resetChanges}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  profileTop: {
    alignItems: "center",
    rowGap: 15,
  },
  fullname: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
  username: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
    color: colors.textLight,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 999,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    width: 90,
    height: 30,
    columnGap: 5,
    position: "absolute",
    right: 0,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
  updateButtonsContainer: {
    position: "absolute",
    right: 0,
    rowGap: 5,
  },
  updateButton: {
    width: 90,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  save: {
    backgroundColor: colors.primary,
    shadowColor:"#000",
    shadowOpacity:"0.1",
    shadowOffset:{width:0, height:4}
  },
  noChange:{
    backgroundColor:colors.primary70
  },
  saveText:{
    fontFamily:"Nunito-SemiBold",
    color:colors.white
  },
  cancelText:{
    fontFamily:"Nunito-Medium",
    color:colors.primary
  }
});
export default ProfileTop;
