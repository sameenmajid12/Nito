import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import Header from "../../components/common/Header";
import { colors, FONT_SIZE_L, textStyles } from "../../styles";
import YouHaveAMatch from "../../components/home/YouHaveAMatch";
import NextMatchIn from "../../components/home/NextMatchIn";
import DailyPoll from "../../components/home/DailyPoll";
import Connections from "../../components/home/Connections";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Header></Header>
      <ScrollView>
        <View style={styles.pageContainer}>
          <Text style={styles.greeting}>Welcome, Sameen Majid!</Text>

          <YouHaveAMatch />
          <View
            style={{ flexDirection: "row", columnGap: 10, marginBottom: 20 }}
          >
            <NextMatchIn />
            <DailyPoll />
          </View>
          <Connections />
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
    marginBottom:70
  },
  greeting: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
});
export default HomeScreen;
