import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileSectionHeader from "./ProfileSectionHeader";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L, FONT_SIZE_M, TEXT_ACTIVE_OPACITY } from "../../styles";
import { useModal } from "../../contexts/ModalContext";
function ProfileSettings({ navigate }) {
  const { openModal } = useModal();
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"Settings"} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigate("AccountInformation")}
          activeOpacity={TEXT_ACTIVE_OPACITY}
          style={styles.button}
        >
          <Ionicons
            size={28}
            color={colors.textPrimary}
            name="settings-outline"
          ></Ionicons>
          <View style={styles.right}>
            <Text style={styles.buttonText}>Account Information</Text>
            <Ionicons
              color={colors.textPrimary}
              size={FONT_SIZE_L}
              name="chevron-forward"
            ></Ionicons>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Help&Support")}
          activeOpacity={TEXT_ACTIVE_OPACITY}
          style={styles.button}
        >
          <Ionicons
            size={28}
            color={colors.textPrimary}
            name="help-circle-outline"
          ></Ionicons>
          <View style={styles.right}>
            <Text style={styles.buttonText}>Help & Support</Text>
            <Ionicons
              color={colors.textPrimary}
              size={FONT_SIZE_L}
              name="chevron-forward"
            ></Ionicons>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("TagsSelect")}
          activeOpacity={TEXT_ACTIVE_OPACITY}
          style={styles.button}
        >
          <Ionicons
            size={28}
            color={colors.textPrimary}
            name="pricetag-outline"
          ></Ionicons>
          <View style={styles.right}>
            <Text style={styles.buttonText}>Tags</Text>
            <Ionicons
              color={colors.textPrimary}
              size={FONT_SIZE_L}
              name="chevron-forward"
            ></Ionicons>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>openModal(null, "notificationModal")} activeOpacity={TEXT_ACTIVE_OPACITY} style={styles.button}>
          <Ionicons
            size={28}
            color={colors.textPrimary}
            name="notifications-outline"
          ></Ionicons>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={TEXT_ACTIVE_OPACITY}
          style={styles.button}
          onPress={() => openModal(null, "logoutModal")}
        >
          <Ionicons size={28} color={"red"} name="log-out-outline"></Ionicons>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    rowGap: 20,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  logoutText: {
    color: "red",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  buttonsContainer: {
    rowGap: 25,
  },
});
export default ProfileSettings;
