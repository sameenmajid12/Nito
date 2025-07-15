import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { colors, FONT_SIZE_M } from "../../styles";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
function ProfilePicture({ image, setImage, handleConfirm, type }) {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { user } = useUser();
  const pickProfilePic = async () => {
    setIsLoadingImage(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant access to your photo library to select a profile picture."
      );
      setIsLoadingImage(false);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;
      try {
        const manipulator =
          ImageManipulator.ImageManipulator.manipulate(originalUri);
        manipulator.resize({ width: 250, height: 250 });
        const imageRef = await manipulator.renderAsync();

        const manipulatedResult = await imageRef.saveAsync({
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        });
        const resizedUri = manipulatedResult.uri;
        setImage(resizedUri);
        const name = `photo_${Date.now()}.jpg`;
        const extension = resizedUri.split(".").pop();
        handleConfirm({
          profilePic: { uri: resizedUri, type: `image/${extension}`, name },
        });
      } catch (error) {
        console.error("Error manipulating image:", error);
        Alert.alert(
          "Image Error",
          "Could not process the image. Please try another one."
        );
        if (type === "auth") {
          setImage(null);
          handleConfirm({ profilePic: null });
        } else {
          setImage(user.profilePic);
        }
      }
    } else {
      if (type === "auth") {
        setImage(null);
      } else {
        setImage(user.profilePic);
      }
    }
    setIsLoadingImage(false);
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <Pressable
      onPress={pickProfilePic}
      style={[
        styles.cameraContainer,
        image && !isLoadingImage
          ? { borderColor: "transparent" }
          : { borderColor: colors.borderLight },
        type === "auth"
          ? { width: 140, height: 140 }
          : { width: 120, height: 120 },
      ]}
    >
      {isLoadingImage ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : image ? (
        <>
          <Image source={{ uri: image }} style={styles.profilePicture}></Image>
          {type === "auth" ? (
            <Pressable
              onPress={handleClearImage}
              style={styles.closeIconContainer}
            >
              <Ionicons name="close" style={styles.closeIcon}></Ionicons>
            </Pressable>
          ) : (
            <View style={styles.editIcon}>
              <Ionicons
                color={colors.white}
                name="create-outline"
                size={FONT_SIZE_M}
              ></Ionicons>
            </View>
          )}
        </>
      ) : (
        <>
          <Image
            source={require("../../assets/icons/camera.svg")}
            style={styles.cameraIcon}
          ></Image>
          <View style={styles.plusIconContainer}>
            <Ionicons name="add-outline" style={styles.plusIcon}></Ionicons>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    borderWidth: 1,
    borderColor: colors.borderLight,
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
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    backgroundColor: colors.background,
    padding: 5,
    bottom: 5,
  },
  plusIcon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: colors.border,
  },
  closeIconContainer: {
    position: "absolute",
    right: 5,
    borderRadius: 20,
    backgroundColor: colors.primary,
    padding: 5,
    top: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: colors.white,
  },
  profilePicture: {
    borderRadius: 999,
    width: "100%",
    height: "100%",
    contentFit: "cover",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    backgroundColor: colors.accent70,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfilePicture;
