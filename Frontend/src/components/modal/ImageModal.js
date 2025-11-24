import {
  Modal,
  Animated,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Pressable
} from "react-native";
import { BlurView } from "expo-blur";
import { colors, FONT_SIZE_XL } from "../../styles";
import { useEffect, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const SCREEN = Dimensions.get("window");

function ImageModal({ image, setModalVisible, width, height }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [scaleLoaded, setScaleLoaded] = useState(false);

  const getFullScreenImageStyles = () => {
    const scale = Math.min(SCREEN.width / width, SCREEN.height / height);
    return {
      width: width * scale,
      height: height * scale,
      borderRadius: 25,
    };
  };

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.8,
      useNativeDriver: true,
      friction: 7.5,
      tension: 75,
    }).start();
  }, []);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setScaleLoaded(false);
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        scaleAnim.setValue(0.8 - e.translationY / 500);
      }
    })
    .onEnd((e) => {
      if (e.translationY > 150) {
        closeModal();
      } else {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 0.8,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });
  const CloseButton = <Pressable style={styles.imageClose} onPress={closeModal}>
    <Ionicons
      size={FONT_SIZE_XL}
      color={colors.primary}
      name="close-circle-outline"
    ></Ionicons>
  </Pressable>
  return (
    <Modal transparent={true}>
      <BlurView intensity={50} style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.modalContainer} activeOpacity={1}>
            {!scaleLoaded && (
              <Animated.View
                style={[
                  getFullScreenImageStyles(),
                  { transform: [{ scale: scaleAnim }] },
                  styles.fullScreenImageNotLoaded,
                ]}
              >
                <ActivityIndicator color={colors.white} size={"large"} />
              </Animated.View>
            )}
            <Animated.Image
              source={{ uri: image }}
              style={[
                getFullScreenImageStyles(),
                {
                  transform: [{ scale: scaleAnim }],
                  position: scaleLoaded ? "relative" : "absolute",
                },
              ]}
              onLoad={() => setScaleLoaded(true)}
            />
            {CloseButton}
          </View>
        </GestureDetector>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImageNotLoaded: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  imageClose: {
    position: "absolute",
    right: 20,
    top: 60,
    zIndex: 999,
    backgroundColor: colors.white,
    borderRadius: 999,
  },
});

export default ImageModal;
