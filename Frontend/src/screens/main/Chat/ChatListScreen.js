import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XS,
} from "../../../styles";
import Header from "../../../components/common/Header";
import { useState } from "react";
import CurrentChat from "../../../components/chat/CurrentChat";
import ConnectionChats from "../../../components/chat/ConnectionChats";
import ArchivedChats from "../../../components/chat/ArchivedChats";
import SectionSelector from "../../../components/chat/SectionSelector";
function ChatListScreen({ navigation }) {
  const [selectedSection, setSelectedSection] = useState("current");
  const checkSelected = (name) => {
    return selectedSection === name;
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <SectionSelector
        checkSelected={checkSelected}
        setSelectedSection={setSelectedSection}
      />

      <ScrollView
        scrollEnabled={!checkSelected("current") && !checkSelected("archived")}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {checkSelected("current") ? (
          <CurrentChat navigation={navigation} />
        ) : checkSelected("connections") ? (
          <ConnectionChats navigation={navigation} />
        ) : checkSelected("archived") ? (
          <ArchivedChats />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
export default ChatListScreen;
