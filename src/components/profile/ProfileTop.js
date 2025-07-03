import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { FONT_SIZE_S, colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

function ProfileTop({
  editing,
  setEditing,
  saveChanges,
  resetChanges,
  changesMade,
}) {
  const scaleAnim = useRef(new Animated.Value(editing ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: editing ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [editing]);

  const editScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const saveCancelScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

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

      {!editing && (
        <Animated.View
          style={{
            position: "absolute",
            right: 0,
            transform: [{ scale: editScale }],
            opacity: editScale,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setEditing(true)}
            style={styles.editButton}
          >
            <Text style={styles.editText}>Edit</Text>
            <Ionicons
              name="create-outline"
              size={FONT_SIZE_S}
              color={colors.primary}
            ></Ionicons>
          </TouchableOpacity>
        </Animated.View>
      )}

      {editing && (
        <Animated.View
          style={[
            styles.updateButtonsContainer,
            {
              transform: [{ scale: saveCancelScale }],
              opacity: saveCancelScale,
            },
          ]}
        >
          <TouchableOpacity
            disabled={!changesMade}
            activeOpacity={0.75}
            style={[
              changesMade ? styles.save : styles.noChange,
              styles.updateButton,
            ]}
            onPress={saveChanges}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.updateButton, styles.cancel]}
            onPress={resetChanges}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
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
    position: "relative", // changed from absolute here since Animated.View handles positioning
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
    shadowColor: "#000",
    shadowOpacity: "0.1",
    shadowOffset: { width: 0, height: 4 },
  },
  noChange: {
    backgroundColor: colors.primary70,
  },
  saveText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
  },
  cancelText: {
    fontFamily: "Nunito-Medium",
    color: colors.primary,
  },
  updateButtonsCover: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.background,
    zIndex: 100,
  },
});

export default ProfileTop;
