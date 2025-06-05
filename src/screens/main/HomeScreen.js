import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Header from "../../components/common/Header";
import { colors, FONT_SIZE_L, textStyles } from "../../styles";
import YouHaveAMatch from "../../components/home/YouHaveAMatch";
import NextMatchIn from "../../components/home/NextMatchIn";
import DailyPoll from "../../components/home/DailyPoll";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <View style={styles.pageContainer}>
        <Text style={styles.greeting}>Hello, Sameen Majid</Text>

        <YouHaveAMatch />
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <NextMatchIn />
          <DailyPoll />
        </View>
      </View>
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
    rowGap:10
  },
  greeting:{
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_L,
    color:colors.textPrimary,
  }
});
export default HomeScreen;
