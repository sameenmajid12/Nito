import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SkipButton from "./SkipButton";
import RevealButton from "./RevealButton";
import { colors, FONT_SIZE_M, PRIMARY_ACTIVE_OPACITY } from "../../styles";
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";

function ChatRevealing({ conversation, setConversation }) {
  const { socket } = useSocket();
  const { countdowns } = usePhaseTimer();
  const { user, setUser } = useUser();
  const userNum = conversation.user1._id === user._id ? "user1" : "user2";
  const userVote = conversation?.[`${userNum}Revealed`];
  const [isLoadingReveal, setIsLoadingReveal] = useState(false);
  const [isLoadingSkip, setIsLoadingSkip] = useState(false);
  useEffect(() => {
    const handlePairActionComplete = (updatedConversation) => {
      setConversation(updatedConversation);
      setUser((prev) => ({
        ...prev,
        currentPair: {
          ...prev.currentPair,
          conversation: updatedConversation,
        },
      }));
      setIsLoadingReveal(false);
      setIsLoadingSkip(false);
    };
    const handleUndoPairActionComplete = () => {
      setConversation((prev) => ({
        ...prev,
        [`${userNum}Revealed`]: null,
      }));
      setUser((prev) => ({
        ...prev,
        currentPair: {
          ...prev.currentPair,
          conversation: {
            ...prev.currentPair.conversation,
            [`${userNum}Revealed`]: null,
          },
        },
      }));
    };
    if (socket) {
      socket.on("pairActionComplete", handlePairActionComplete);
      socket.on("undoPairActionComplete", handleUndoPairActionComplete);
    }
    return () => {
      if (socket) {
        socket.off("pairActionComplete", handlePairActionComplete);
        socket.off("undoPairActionComplete", handleUndoPairActionComplete);
      }
    };
  }, [socket]);
  const pairAction = (action) => {
    if (action === "reveal") {
      setIsLoadingReveal(true);
    } else {
      setIsLoadingSkip(true);
    }
    socket.emit("pairAction", {
      conversationId: conversation._id,
      userId: user._id,
      action,
    });
  };
  const undoPairAction = () => {
    socket.emit("undoPairAction", {
      conversationId: conversation._id,
      userId: user._id,
    });
  };
  return (
    <View style={styles.mainContainer}>
      {userVote === null ? (
        <>
          <Text style={styles.text}>
            You've reached the end. Curious to see who was behind the screen?
          </Text>
          <View style={styles.buttonContainer}>
            <SkipButton isLoading={isLoadingSkip} pairAction={pairAction} />
            <View style={styles.divider} />
            <RevealButton isLoading={isLoadingReveal} pairAction={pairAction} />
          </View>
        </>
      ) : (
        <View style={styles.voteWrapper}>
          <Text style={styles.votedText}>
            You've choosen to{" "}
            <Text style={styles.voteOption}>
              {userVote ? "REVEAL" : "SKIP"}
            </Text>
            , result will be out in {"\n"}
            {countdowns.untilRevealEnd}
          </Text>
          <View style={styles.undoWrapper}>
            <TouchableOpacity
              activeOpacity={PRIMARY_ACTIVE_OPACITY}
              onPress={undoPairAction}
              style={styles.undoButton}
            >
              <Text style={styles.undoText}>Undo</Text>
              <Ionicons
                color={colors.white}
                name="backspace"
                size={FONT_SIZE_M}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 40,
    rowGap: 20,
    marginBottom: 40,
  },
  text: {
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: colors.border,
  },
  voteWrapper: {
    rowGap: 20,
  },
  votedText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    color: colors.textPrimary,
  },
  voteOption: {
    color: colors.primaryDark,
    fontFamily: "Nunito-Bold",
  },
  undoWrapper: {
    alignItems: "center",
  },
  undoButton: {
    backgroundColor: colors.accent70,
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 30,
    justifyContent: "center",
    borderRadius: 999,
    columnGap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  undoText: {
    fontFamily: "Nunito-Bold",
    color: colors.white,
  },
});
export default ChatRevealing;
