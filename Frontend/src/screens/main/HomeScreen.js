import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../../components/common/Header";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_S,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
} from "../../styles";
import NewPairingFound from "../../components/home/NewPairingFound";
import NextPairIn from "../../components/home/NexPairIn";
import DailyPoll from "../../components/home/DailyPoll";
import HomeConnections from "../../components/home/HomeConnections";
import { useUser } from "../../contexts/UserContext";
import WaitingForPair from "../../components/home/WaitingForPair";
import { useState } from "react";

function HomeScreen({ navigation }) {
  const { user, refreshUser } = useUser();
  const isPaired = user.currentPair.conversation !== null;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary50}
          />
        }
      >
        <View style={styles.pageTopWrapper}>
          <Text style={styles.greeting}>Hello, {user.fullname}! 👋</Text>

          {isPaired ? (
            <NewPairingFound navigation={navigation} />
          ) : (
            <WaitingForPair />
          )}
          <View
            style={{ flexDirection: "row", columnGap: 10, marginBottom: 10 }}
          >
            {isPaired && <NextPairIn />}
            <DailyPoll isPaired={isPaired}/>
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
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_L,
    color: colors.textPrimary,
  },
});
export default HomeScreen;
