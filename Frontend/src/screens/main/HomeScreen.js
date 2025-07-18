import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import Header from "../../components/common/Header";
import { colors, FONT_SIZE_L, textStyles } from "../../styles";
import YouHaveAMatch from "../../components/home/YouHaveAMatch";
import NextMatchIn from "../../components/home/NextMatchIn";
import DailyPoll from "../../components/home/DailyPoll";
import HomeConnections from "../../components/home/HomeConnections";
import { useUser } from "../../contexts/UserContext";

function HomeScreen({ navigation }) {
  const {user} = useUser();
  const navigate = (route) => {
    navigation.navigate(route);
  };
  const enterChat = (conversation) => {
    navigation.navigate("Chat", {
      conversation: {
        ...conversation,
        startTime: conversation.startTime.toISOString(),
        endTime: conversation.endTime.toISOString(),
        graceEndTime: conversation.graceEndTime.toISOString(),
      },
    });
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header></Header>
      <ScrollView>
        <View style={styles.pageContainer}>
          <Text style={styles.greeting}>Welcome, {user.fullname  }!</Text>

          <YouHaveAMatch enterChat={enterChat} />
          <View
            style={{ flexDirection: "row", columnGap: 10, marginBottom: 10   }}
          >
            <NextMatchIn />
            <DailyPoll />
          </View>
          <HomeConnections navigate={navigate} />
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
  pageContainer: {
    padding: 20,
    rowGap: 10,
    marginBottom: 70,
  },
  greeting: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
});
export default HomeScreen;
