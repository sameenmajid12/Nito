import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import { useUser } from "../../../contexts/UserContext";
import SectionSelector from "../../../components/chat/SectionSelector";
function ChatListScreen({ navigation }) {
  const { user } = useUser();
  const [selectedSection, setSelectedSection] = useState("current");
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
          <CurrentChat enterChat={enterChat} />
        ) : checkSelected("connections") ? (
          <ConnectionChats enterChat={enterChat} />
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
