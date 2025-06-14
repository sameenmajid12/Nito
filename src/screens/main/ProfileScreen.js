import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S } from "../../styles";
import Header from "../../components/common/Header";
import { Image } from "expo-image";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProfileTop from "../../components/profile/ProfileTop";

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView style={styles.mainContainer}>
        <ProfileTop/>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    padding: 30,
  },
  
});
export default ProfileScreen;
