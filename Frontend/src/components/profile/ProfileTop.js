import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  FONT_SIZE_S,
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_XS,
  PRIMARY_ACTIVE_OPACITY,
  TEXT_ACTIVE_OPACITY,
} from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import ProfilePicture from "../common/ProfilePicture";
import { Image } from "expo-image";
function ProfileTop({
  editing,
  setEditing,
  saveChanges,
  resetChanges,
  changesMade,
  isUser,
  user,
  messageUser,
}) {
  if (!user) {
    return;
  }
  const { updateProfilePic } = useUser();
  const [image, setImage] = useState();
  useEffect(() => {
    if (user.profilePic) {
      setImage(user.profilePic);
    }
  }, [user.profilePic]);
  const handleProfilePictureEdit = ({ profilePic }) => {
    updateProfilePic(profilePic);
  };
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
      {isUser ? (
        <ProfilePicture
          image={image}
          setImage={setImage}
          handleConfirm={handleProfilePictureEdit}
          type={"profile"}
        ></ProfilePicture>
      ) : (
        <Image source={user.profilePic} style={styles.profilePic}></Image>
      )}

      <View style={{ alignItems: "center" }}>
        <Text style={styles.fullname}>{user.fullname}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      {isUser ? (
        !editing ? (
          <Animated.View
            style={[
              styles.editButtonContainer,
              { transform: [{ scale: editScale }], opacity: editScale },
            ]}
          >
            <TouchableOpacity
              activeOpacity={TEXT_ACTIVE_OPACITY}
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
        ) : (
          <Animated.View
            style={[
              styles.primaryButtonsContainer,
              {
                transform: [{ scale: saveCancelScale }],
                opacity: saveCancelScale,
              },
            ]}
          >
            <TouchableOpacity
              disabled={!changesMade}
              activeOpacity={PRIMARY_ACTIVE_OPACITY}
              style={[
                changesMade ? styles.primary : styles.noChange,
                styles.updateButton,
              ]}
              onPress={saveChanges}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={TEXT_ACTIVE_OPACITY}
              style={[styles.updateButton, styles.cancel]}
              onPress={resetChanges}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        )
      ) : (
        <View style={styles.primaryButtonsContainer}>
          <TouchableOpacity
            onPress={() => messageUser(user)}
            activeOpacity={PRIMARY_ACTIVE_OPACITY}
            style={[styles.updateButton, styles.primary]}
          >
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={TEXT_ACTIVE_OPACITY}
            style={styles.optionsContainer}
          >
            <Text style={styles.optionsText}>Options</Text>
            <Ionicons name="caret-down" color={colors.primary}></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profileTop: {
    alignItems: "center",
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
  editButtonContainer: {
    position: "absolute",
    right: 0,
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    width: 90,
    height: 30,
    columnGap: 5,
    position: "relative",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: {
    color: colors.primary,
    fontFamily: "Nunito-Regular",
  },
  primaryButtonsContainer: {
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
  primary: {
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
  messageText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
    fontSize: FONT_SIZE_XS,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
    justifyContent: "center",
  },
  optionsText: {
    color: colors.primary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XS,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 999,
    marginBottom: 10,
  },
});

export default ProfileTop;
