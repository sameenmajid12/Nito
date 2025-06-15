import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../../styles";
import Header from "../../../components/common/Header";
import ProfileTop from "../../../components/profile/ProfileTop";
import ProfileActivity from "../../../components/profile/ProfileActivity";
import ProfileAboutMe from "../../../components/profile/ProfileAboutMe";
import ProfileSettings from "../../../components/profile/ProfileSettings";

function ProfileScreen({navigation}) {
  const navigate=(route)=>{
    navigation.navigate(route)
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <ProfileTop />
          <View style={styles.detailsContainer}>
            <ProfileActivity />
            <ProfileAboutMe />
            <ProfileSettings navigate={navigate}/>
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
    marginBottom: 100,
  },
  detailsContainer: {
    rowGap: 20,
  },
});
export default ProfileScreen;
