import { StyleSheet } from "react-native";
import { colors, FONT_SIZE_L } from "../../styles";
import ImageModal from "../modal/ImageModal";
import { View, Pressable,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

function MessageInputImage({
  modalVisible,
  setModalVisible,
  imageRenderDimensions,
  uri,
  closeImage,
}) {
  return (
    <>
      {modalVisible && (
        <ImageModal
          image={uri}
          setModalVisible={setModalVisible}
          width={imageRenderDimensions.width}
          height={imageRenderDimensions.height}
        />
      )}

      <View style={styles.imageRenderContainer}>
        <View
          style={{
            width: imageRenderDimensions.width,
            height: imageRenderDimensions.height,
          }}
        >
          <Pressable style={styles.imageClose} onPress={closeImage}>
            <Ionicons
              size={FONT_SIZE_L}
              color={colors.primary}
              name="close-circle-outline"
            ></Ionicons>
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={{
                width: imageRenderDimensions.width,
                height: imageRenderDimensions.height,
                borderRadius: 10,
              }}
              source={uri}
            ></Image>
          </Pressable>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  imageRenderContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: colors.background,
    bottom: 95,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderBottomWidth: 0,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  imageClose: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 999,
    backgroundColor: colors.white,
    borderRadius: 999,
  },
});
export default MessageInputImage;
