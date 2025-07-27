import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated, // Import Animated
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import { useModal } from "../../contexts/ModalContext";
import { useRef } from "react";
import { getTimeSince } from "../../utils/Format";
function ConnectionItem({ connection, navigation, screen }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", colors.black5],
  });
  const { openModal } = useModal();
  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("UserScreen", {
          user: connection?.user,
        })
      }
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.connection,
          { backgroundColor: animatedBackgroundColor },
          screen === "home"
            ? styles.connectionHomeScreen
            : styles.connectionConnectionScreen,
        ]}
      >
        <Image
          source={connection.user.profilePic}
          width={50}
          height={50}
          style={styles.connectionProfilPic}
        ></Image>
        <View style={styles.connectionDetails}>
          <View>
            <Text style={styles.connectionName}>
              {connection.user.fullname}
            </Text>
            <Text style={styles.connectionDate}>
              Connected - {getTimeSince(new Date(connection.matchTime))}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => openModal({ connection }, "userModal")}
          >
            <Ionicons
              size={20}
              color={colors.textPrimary}
              name="ellipsis-horizontal"
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  connection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 10,
  },
  connectionHomeScreen: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  connectionConnectionScreen: { paddingHorizontal: 30 },
  connectionProfilPic: {
    borderRadius: 999,
  },
  connectionDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  connectionName: {
    fontFamily: "Nunito-Bold",
    color: colors.textPrimary,
    fontSize: FONT_SIZE_M,
  },
  connectionDate: {
    color: colors.textLight,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});

export default ConnectionItem;
