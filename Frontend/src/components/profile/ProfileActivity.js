import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L, FONT_SIZE_XS } from "../../styles";
import ProfileSectionHeader from "./ProfileSectionHeader";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { timeSinceLastActive } from "../../utils/Format";
function ProfileActivity({ navigate, isUser, user }) {
  if (!user) {
    return;
  }
  return (
    <View style={styles.sectionWrapper}>
      <ProfileSectionHeader header={"Activity"}></ProfileSectionHeader>
      <View style={styles.activityContainer}>
        <TouchableOpacity
          activeOpacity={isUser ? 0.9 : 1}
          onPress={() => (isUser ? navigate("ConnectionScreen") : {})}
          style={styles.activity}
        >
          <Text style={styles.metric}>{user.revealedUsers?.length}</Text>
          <Text style={styles.description}>Connections made</Text>
          {isUser && (
            <Ionicons style={styles.arrow} name="arrow-forward"></Ionicons>
          )}
        </TouchableOpacity>
        {isUser ? (
          <Pressable style={styles.activity}>
            <Text style={styles.metric}>{user.skippedUsers?.length}</Text>
            <Text style={styles.description}>Connections skipped</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.activity}>
            <Text style={styles.description}>Last Active</Text>
            <Text style={styles.metric}>
              {user.online ? "Now" : timeSinceLastActive(user.lastActive)}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionWrapper: {
    rowGap: 15,
  },
  activityContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  activity: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  metric: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.white,
  },
  description: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XS,
    color: colors.white70,
  },
  arrow: {
    color: colors.white,
    fontSize: FONT_SIZE_L,
    position: "absolute",
    right: 15,
    top: 15,
  },
});
export default ProfileActivity;
