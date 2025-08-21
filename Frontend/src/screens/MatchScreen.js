import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Animated,
} from "react-native";
import {
  colors,
  FONT_SIZE_M,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
  PRIMARY_ACTIVE_OPACITY,
  TEXT_ACTIVE_OPACITY,
} from "../styles";
import MatchedUsersImages from "../components/match/MatchedUserImages";
import Logo from "../components/common/Logo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useAuth } from "../contexts/AuthContext";
function MatchScreen({ navigation, route }) {
  const { user, setUser, getConversation } = useUser();
  const { token } = useAuth();
  useEffect(() => {
    const markAsViewed = async () => {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/user/pair-status/viewed`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { updatedLastPairStatus } = response.data;
        setUser((prev) => ({
          ...prev,
          lastPairStatus: updatedLastPairStatus,
        }));
      } catch (e) {
        console.error(e);
      }
    };
    if (user?.lastPairStatus && !user.lastPairStatus.viewed) {
      markAsViewed();
    }
  }, []);
  const { type, matchedUser } = route.params;
  const isMatch = type !== "matched";
  if (isMatch && !matchedUser) {
    return;
  }
  const buttonBGColor = useRef(new Animated.Value(0)).current;

  const animateBackground = (isPressed) => {
    Animated.timing(buttonBGColor, {
      toValue: isPressed ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const backgroundColorInterpolation = buttonBGColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, "#F0E2FF"],
  });
  const header = isMatch ? "IT'S A MATCH!" : "No match this time..";
  const subheader = isMatch
    ? `You and ${matchedUser.fullname} both hit reveal. Time to connect and start something new!`
    : "Don’t worry you have potential connections waiting for you";
  const middleAsset = isMatch ? (
    <MatchedUsersImages matchedUser={matchedUser} />
  ) : (
    <Text style={styles.noMatchIcon}>;(</Text>
  );
  const primaryButtonText = isMatch
    ? "Send a message to your new friend"
    : "View your profile";
  const secondaryButtonText = isMatch
    ? `View ${matchedUser.fullname}'s profile`
    : "Go back";

  const viewMatchedUserProfile = () => {
    navigation.navigate("UserScreen", { user: matchedUser });
  };
  const viewUserProfile = () => {
    navigation.replace("MainTabs", {
      screen: "ProfileTab",
    });
  };
  const messageUser = async () => {
    const conversation = await getConversation(matchedUser);
    if (conversation) {
      navigation.navigate("Chat", { conversation });
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <TouchableOpacity
        activeOpacity={TEXT_ACTIVE_OPACITY}
        onPress={() => navigation.goBack()}
        style={styles.logo}
      >
        <Ionicons
          size={FONT_SIZE_XL}
          color={colors.primaryDark}
          name="chevron-back"
        ></Ionicons>
        <Logo width={60} height={30}></Logo>
      </TouchableOpacity>
      <View style={[styles.mainContainer, { rowGap: isMatch ? 40 : 0 }]}>
        <Text
          style={[
            styles.header,
            isMatch
              ? { fontSize: 48, color: colors.primaryDark }
              : { fontSize: FONT_SIZE_XXL, color: colors.primary },
          ]}
        >
          {header}
        </Text>
        {middleAsset}
        <Text style={[styles.subheader, { marginBottom: isMatch ? 0 : 30 }]}>
          {subheader}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={PRIMARY_ACTIVE_OPACITY}
            style={styles.sendMessageButton}
            onPress={isMatch ? messageUser : viewUserProfile}
          >
            <Text style={styles.sendMessageButtonText}>
              {primaryButtonText}
            </Text>
          </TouchableOpacity>
          <Pressable
            onPressIn={() => animateBackground(true)}
            onPressOut={() => animateBackground(false)}
            style={styles.viewProfileButton}
            onPress={
              isMatch ? viewMatchedUserProfile : () => navigation.goBack()
            }
          >
            <Animated.View
              style={[
                { backgroundColor: backgroundColorInterpolation },
                styles.viewProfileInnerView,
              ]}
            >
              <Text style={styles.viewProfileButtonText}>
                {secondaryButtonText}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  logo: {
    position: "absolute",
    left: 20,
    top: 70,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  header: {
    fontFamily: "Nunito-Bold",
    color: colors.primaryDark,
    textAlign: "center",
  },
  mainContainer: { padding: 30, marginTop: 120 },
  subheader: {
    textAlign: "center",
    color: colors.textLight,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
    marginBottom: 30,
  },
  buttonsContainer: {
    alignItems: "center",
    rowGap: 15,
    marginTop: 10,
  },
  sendMessageButton: {
    width: "90%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  sendMessageButtonText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
  viewProfileButton: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    width: "90%",
    height: 45,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  viewProfileButtonText: {
    color: colors.primaryDark,
    fontFamily: "Nunito-Medium",
  },
  viewProfileInnerView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noMatchIcon: {
    fontSize: 200,
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    color: colors.primaryDark,
    marginBottom: 20,
  },
});
export default MatchScreen;
