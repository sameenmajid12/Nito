import { View, Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L, FONT_SIZE_M } from "../../styles";
function UserModal({
  connection,
  toggleConfirmation,
  messageUser,
  viewProfile,
  isOnUserScreen,
}) {
  const { user } = connection;
  return (
    <>
      {!isOnUserScreen && (
        <>
          <View style={styles.modalItem}>
            <View style={styles.userDetails}>
              <Image
                style={styles.userProfilePic}
                source={user.profilePic}
              ></Image>
              <Text style={styles.modalItemText}>{user.fullname}</Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
            onPress={() => messageUser(user)}
          >
            <Text style={styles.modalItemText}>Send message</Text>
            <Ionicons
              style={styles.icon}
              name="chevron-forward-outline"
            ></Ionicons>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalItem,
              pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
            onPress={() => viewProfile(connection)}
          >
            <Text style={styles.modalItemText}>View profile</Text>
            <Ionicons
              style={styles.icon}
              name="chevron-forward-outline"
            ></Ionicons>
          </Pressable>
        </>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("remove", "friend", connection.user._id)}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>
          Remove connection
        </Text>
        <Ionicons
          style={styles.icon}
          name="person-remove-outline"
          color={"red"}
        ></Ionicons>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("block", "user")}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>Block</Text>
        <Ionicons
          style={styles.icon}
          color={"red"}
          name="remove-circle-outline"
        ></Ionicons>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.modalItem,
          pressed && { backgroundColor: "rgba(0,0,0,0.05)" },
        ]}
        onPress={() => toggleConfirmation("report", "user")}
      >
        <Text style={[styles.modalItemText, { color: "red" }]}>Report</Text>
        <Ionicons
          style={styles.icon}
          color={"red"}
          name="flag-outline"
        ></Ionicons>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalItemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },

  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  userProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  icon: {
    fontSize: FONT_SIZE_L,
  },
});
export default UserModal;
