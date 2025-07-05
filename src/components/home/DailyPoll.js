import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XS,
} from "../../styles";
import { useModal } from "../../contexts/ModalContext";
import { useEffect, useState } from "react";

function DailyPoll() {
  const [pollOpen, setPollOpen] = useState(false);
  const { openModal, modalState } = useModal();

  useEffect(() => {
    if (modalState.name !== "pollModal") {
      setPollOpen(false);
    }
  }, [modalState]);
  const pollData = {
    question: "Favorite place to eat after a night out?",
    options: [
      { text: "El jefe's", votes: 50 },
      { text: "Guac time", votes: 21 },
      { text: "Daniel's Pizza", votes: 11 },
      { text: "RU Hungry", votes: 25 },
    ],
  };
  const showPollData = () => {
    openModal(pollData, "pollModal");
    setPollOpen(true);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily poll</Text>
        <Text style={styles.question} numberOfLines={1}>
          {pollData.question}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={showPollData}
        style={[styles.button, pollOpen ? styles.pollOpen : styles.pollClosed]}
      >
        <Text style={styles.buttonText}>Vote now</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.accent55,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  header: {},
  headerText: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  question: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    height: 30,
    borderRadius: 5,
  },
  pollClosed: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  pollOpen: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-Bold",
    color: colors.accent70,
  },
});
export default DailyPoll;
