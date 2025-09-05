import { Image } from "expo-image";
import { useImageCache } from "../../contexts/MessageImageContext";
import { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Keyboard,
} from "react-native";
import { BlurView } from "expo-blur";

import { colors, FONT_SIZE_XS, PRIMARY_ACTIVE_OPACITY } from "../../styles";
import ImageModal from "../modal/ImageModal";

const LEFT_MARGIN = 33 + 5;
const PROFILE_PIC_SIZE = 33;
const NAME_HEIGHT = 16;

function ImageMessage({
  message,
  isByUser,
  isFirstByUser,
  isLastByUser,
  otherUser,
  isMatch,
  isLastMessage,
}) {
  const imageWidth = message.imageDimensions.width;
  const imageHeight = message.imageDimensions.height;
  const { getUrl } = useImageCache();
  const [image, setImage] = useState();
  const [notFound, setNotFound] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const profilePic = isMatch
    ? otherUser.profilePic
    : require("../../assets/images/anonymous-user.png");
  const name = isMatch ? otherUser.fullname : otherUser.username;

  const getImageStyles = () => ({
    width: imageWidth,
    height: imageHeight,
    alignSelf: isByUser ? "flex-end" : "flex-start",
    marginLeft: !isFirstByUser ? LEFT_MARGIN : 0,
    marginBottom: isLastMessage ? 40 : isLastByUser ? 20 : 0,
    borderRadius: 15,
  });
  let isMounted = true;
  useEffect(() => {
    const getImage = async () => {
      const url = await getUrl(message._id);
      if (!isMounted) return;
      if (!url) {
        setNotFound(true);
        return;
      }
      setImage(url);
    };
    if (message.imageKey !== "placeholder") {
      getImage();
    }
    return () => {
      isMounted = false;
    }
  }, [message]);

  const handleLoad = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (isMounted) {
        setLoaded(true);
      }
    });
  };

  return (
    <View style={styles.mainWrapper}>
      {isFirstByUser && !isByUser && (
        <Image style={styles.profilePic} source={profilePic} />
      )}
      <View style={{ flex: 1 }}>
        {isFirstByUser && !isByUser && <Text style={styles.name}>{name}</Text>}

        {!image && !notFound ? (
          <View style={[styles.notLoaded, getImageStyles()]}>
            <ActivityIndicator color={colors.white} />
          </View>
        ) : !notFound ? (
          <TouchableOpacity
            onPress={() => {
              if (loaded) {
                setModalVisible(true);
                Keyboard.dismiss();
              }
            }}
            style={[getImageStyles(), { marginLeft: 0 }]}
            activeOpacity={PRIMARY_ACTIVE_OPACITY}
          >
            {!loaded && (
              <View style={[styles.notLoaded, getImageStyles()]}>
                <ActivityIndicator color={colors.white} />
              </View>
            )}
            <Animated.Image
              contentFit="contain"
              style={[
                getImageStyles(),
                {
                  opacity: fadeAnim,
                  position: loaded ? "relative" : "absolute",
                },
              ]}
              source={{ uri: image }}
              onLoad={handleLoad}
            />
          </TouchableOpacity>
        ) : (
          <View style={[styles.image, styles.notLoaded, getImageStyles()]}>
            <Text>Error getting image</Text>
          </View>
        )}

        {modalVisible && (
          <ImageModal
            image={image}
            width={imageWidth}
            height={imageHeight}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flexDirection: "row", columnGap: 5, marginVertical: 2.5 },
  notLoaded: {
    backgroundColor: colors.black10,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: 999,
    marginTop: NAME_HEIGHT,
  },
  name: {
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
  },
});

export default ImageMessage;
