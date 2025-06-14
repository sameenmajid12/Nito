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
import ProfileAboutMe from "../../components/profile/ProfileAboutMe";

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <ProfileTop />
          <View style={styles.detailsContainer}>
            <ProfileActivity />
            <ProfileAboutMe />
          </View>
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
  mainContainer: {
    rowGap: 5,
  },
  detailsContainer:{
    rowGap:20
  }
});
export default ProfileScreen;
