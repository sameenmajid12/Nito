import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { colors } from "../../styles";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from "react";
function AddProfilePicture({ image, setImage }) {
  const [isLoadingImage, setIsLoadingImage] = useState(false);

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
      } catch (error) {
        console.error("Error manipulating image:", error);
        Alert.alert(
          "Image Error",
          "Could not process the image. Please try another one."
        );
        setImage(null);
      }
    } else {
      setImage(null);
    }
    setIsLoadingImage(false);
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <Pressable onPress={pickProfilePic} style={[styles.cameraContainer,(image && !isLoadingImage)?{borderColor:"transparent"}:{borderColor:colors.border}]}>
      {isLoadingImage ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : image ? (
        <>
          <Image source={{ uri: image }} style={styles.profilePicture}></Image>
          <Pressable
            onPress={handleClearImage}
            style={styles.closeIconContainer}
          >
            <Ionicons name="close" style={styles.closeIcon}></Ionicons>
          </Pressable>
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
    borderWidth: 1,
    borderColor: colors.border,
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
});

export default AddProfilePicture;
