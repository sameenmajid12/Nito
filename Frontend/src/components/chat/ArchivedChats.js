import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_XL } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

function ArchivedChats() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.page}>
      <Image
        style={styles.graphicImage}
        source={require("../../assets/images/ArchivedGraphic.png")}
        contentFit="contain"
      ></Image>
      <View style={{ width: "100%", rowGap: 20 }}>
        <Text style={styles.header}>
          Access your lost conversations with Nito+
        </Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Ionicons
              name="checkmark"
              size={FONT_SIZE_L}
              color={colors.primaryDark}
            ></Ionicons>
            <Text style={styles.listItemText}>
              View conversations that ended up not being a match!
            </Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons
              name="checkmark"
              size={FONT_SIZE_L}
              color={colors.primaryDark}
            ></Ionicons>
            <Text style={styles.listItemText}>
              All past chats in one place!
            </Text>
          </View>

          <View style={styles.listItem}>
            <Ionicons
              name="checkmark"
              size={FONT_SIZE_L}
              color={colors.primaryDark}
            ></Ionicons>
            <Text style={styles.listItemText}>
              More premium features right around the corner!
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Animated.View style={{transform:[{scale:scaleAnim}]}}>
          <TouchableOpacity
            onPressIn={() => {
              Animated.spring(scaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
                speed: 50,
                bounciness: 5,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
                bounciness: 15,
              }).start();
            }}
            activeOpacity={0.75}
            style={styles.subscribeButton}
          >
            <Text style={styles.subscribeButtonText}>
              Unlock now for $5/month
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity activeOpacity={0.25}>
          <Text style={styles.declineText}>Maybe another time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 65,
    paddingHorizontal: 50,
    rowGap: 35,
  },
  graphicImage: {
    width: 300,
    height: 150,
  },
  header: {
    textAlign: "left",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XL,
  },
  listContainer: {
    rowGap: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 5,
    width: "100%",
  },
  listItemText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
  },
  buttonContainer: { width: "100%", alignItems: "center", rowGap: 10 },
  subscribeButton: {
    backgroundColor: colors.primary,
    width: 300,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeButtonText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
  declineText: {
    fontFamily: "Nunito-Medium",
    color: colors.primaryDark,
  },
});
export default ArchivedChats;
