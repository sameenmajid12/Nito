import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import ProfileTop from "../../components/profile/ProfileTop";
import Header from "../../components/common/Header";
import { Image } from "expo-image";
import ProfileAboutMe from "../../components/profile/ProfileAboutMe";
import ProfileActivity from "../../components/profile/ProfileActivity";
import UserTags from "../../components/user/UserTags";
import UserPollComparison from "../../components/user/UserPollComparison";
import { colors } from "../../styles";
import TextHeader from "../../components/common/TextHeader";
function UserScreen({ route, navigation }) {
  const { user } = route.params;
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader text={user.fullname} navigation={navigation}/>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <ProfileTop isUser={false} user={user}></ProfileTop>
          <View style={styles.detailsContainer}>
            <ProfileActivity isUser={false} user={user} />
            <ProfileAboutMe isUser={false} user={user} />
            <UserTags otherUser={user} />
            <UserPollComparison otherUser={user} />
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
    backgroundColor: "transparent",
  },
  mainContainer: {
    rowGap: 5,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  detailsContainer: {
    rowGap: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});
export default UserScreen;
