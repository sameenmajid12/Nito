import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import Header from "../../components/common/Header";
import { Image } from "expo-image";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfileTop from "../../components/profile/ProfileTop";
import ProfileActivity from "../../components/profile/ProfileActivity";

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <ProfileTop />
          <ProfileActivity></ProfileActivity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 30,
  },
  mainContainer:{
    rowGap:5
  }
});
export default ProfileScreen;
