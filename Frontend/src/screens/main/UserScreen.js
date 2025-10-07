import {  ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTop from "../../components/profile/ProfileTop";
import ProfileAboutMe from "../../components/profile/ProfileAboutMe";
import ProfileActivity from "../../components/profile/ProfileActivity";
import UserTags from "../../components/user/UserTags";
import UserPollComparison from "../../components/user/UserPollComparison";
import { colors } from "../../styles";
import TextHeader from "../../components/common/TextHeader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
function UserScreen({ route, navigation }) {
  const { user } = route.params;
  const [userToDisplay, setUserToDisplay] = useState(user);
  const { token } = useAuth();
  const { getConversation } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/${userToDisplay._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const { userToRetrieve } = response.data;
          setUserToDisplay(userToRetrieve);
        } else {
          throw new Error(`Error fetching user with status ${response.status}`);
        }
      } catch (e) {
        console.error(e);
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);
  const messageUser = async (userToMessage) => {
    const conversation = await getConversation(userToMessage);
    if (conversation) {
      navigation.navigate("Chat", { conversation });
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader text={userToDisplay.fullname} navigation={navigation} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentWrapper}>
          <ProfileTop
            isUser={false}
            user={userToDisplay}
            messageUser={messageUser}
          ></ProfileTop>
          {isLoading ? (
            <View></View>
          ) : (
            <View style={styles.sectionsContainer}>
              <ProfileActivity isUser={false} user={userToDisplay} />
              <ProfileAboutMe isUser={false} user={userToDisplay} />
              <UserTags otherUser={userToDisplay} />
              <UserPollComparison otherUser={userToDisplay} />
            </View>
          )}
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
  contentWrapper: {
    rowGap: 5,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  sectionsContainer: {
    rowGap: 20,
  },
});
export default UserScreen;
