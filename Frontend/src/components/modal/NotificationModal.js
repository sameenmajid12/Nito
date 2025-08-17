import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
import { useNotifications } from "../../contexts/NotificationContext";

function NotificationModal() {
  const { notifications, updateNotifications } = useNotifications();

  return (
    <View>
      <View style={styles.header}>
        <Ionicons name="close-outline" color={colors.background}></Ionicons>
        <Text style={styles.headerText}>Notifications</Text>
        <Ionicons name="close-outline" size={FONT_SIZE_L}></Ionicons>
      </View>
      <Pressable style={styles.notificationItem}>
        <Text style={styles.notificationType}>Messages</Text>
        <Switch
          value={notifications.messages}
          onValueChange={(newValue) =>
            updateNotifications(newValue, "messages")
          }
          trackColor={{ false: "#767577", true: colors.primary }}
        ></Switch>
      </Pressable>
      <Pressable style={styles.notificationItem}>
        <Text style={styles.notificationType}>Reveal Phases</Text>
        <Switch
          value={notifications.revealPhases}
          onValueChange={(newValue) =>
            updateNotifications(newValue, "revealPhases")
          }
          trackColor={{ false: "#767577", true: colors.primary }}
        ></Switch>
      </Pressable>
      <Pressable style={styles.notificationItem}>
        <Text style={styles.notificationType}>Matches</Text>
        <Switch
          value={notifications.matches}
          onValueChange={(newValue) => updateNotifications(newValue, "matches")}
          trackColor={{ false: "#767577", true: colors.primary }}
        ></Switch>
      </Pressable>
      <Pressable style={styles.notificationItem}>
        <Text style={styles.notificationType}>Pairings</Text>
        <Switch
          value={notifications.pairings}
          onValueChange={(newValue) =>
            updateNotifications(newValue, "pairings")
          }
          trackColor={{ false: "#767577", true: colors.primary }}
        ></Switch>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: "Nunito-SemiBold",
  },
  notificationType: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  notificationItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: colors.borderLight,
    borderTopWidth: 1,
  },
});
export default NotificationModal;
