import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import Header from "../../components/common/Header";
import { colors, FONT_SIZE_L, textStyles } from "../../styles";
import NewPairingFound from "../../components/home/NewPairingFound";
import NextMatchIn from "../../components/home/NextMatchIn";
import DailyPoll from "../../components/home/DailyPoll";
import HomeConnections from "../../components/home/HomeConnections";
import { useUser } from "../../contexts/UserContext";

function HomeScreen({ navigation }) {
  const { user } = useUser();
  return (
    <SafeAreaView style={styles.page}>
      <Header></Header>
      <ScrollView>
        <View style={styles.pageTopWrapper}>
          <Text style={styles.greeting}>Hello, {user.fullname}! 👋</Text>

          <NewPairingFound navigation={navigation} />
          <View
            style={{ flexDirection: "row", columnGap: 10, marginBottom: 10 }}
          >
            <NextMatchIn />
            <DailyPoll />
          </View>
        </View>
        <HomeConnections navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageTopWrapper: {
    rowGap: 10,
    padding:20,
    paddingBottom:10
  },
  greeting: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
});
export default HomeScreen;
