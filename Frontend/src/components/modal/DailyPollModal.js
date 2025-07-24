import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { API_BASE_URL } from "@env";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  FONT_SIZE_XXL,
} from "../../styles";
import { usePoll } from "../../contexts/PollContext";

function DailyPollModal({ handleClose }) {
  const { token } = useAuth();
  const { user, setUser } = useUser();
  const { poll, isLoadingPoll, setPoll, checkIfVoted, getVoteAnswer } =
    usePoll();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const animatedLineWidths = useRef([]);
  const maxBarWidth = useRef(0);

  useEffect(() => {
    if (poll?.options) {
      animatedLineWidths.current = poll.options.map(
        () => new Animated.Value(0)
      );
    }
    const hasUserVoted = checkIfVoted(user);
    if (hasUserVoted) {
      setHasVoted(true);
      const vote = getVoteAnswer(user);
      setSelectedIndex(vote.answerOptionNum);
    }
  }, [poll]);

  // Animate results after vote
  const animateResults = useCallback(() => {
    if (
      !poll?.options ||
      containerWidth === 0 ||
      !animatedLineWidths.current.length
    )
      return;
    maxBarWidth.current = containerWidth - (60 + FONT_SIZE_XXL);
    poll.options.forEach((option, index) => {
      const percentage =
        poll.totalVotes > 0 ? option.votes / poll.totalVotes : 0;

      animatedLineWidths.current[index].setValue(0);

      Animated.timing(animatedLineWidths.current[index], {
        toValue: percentage * maxBarWidth.current,
        duration: 700,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();
    });
  }, [poll, containerWidth]);

  useEffect(() => {
    if (
      hasVoted &&
      containerWidth > 0 &&
      poll?.options &&
      animatedLineWidths.current.length > 0
    ) {
      setTimeout(() => animateResults(), 50);
    }
  }, [hasVoted, containerWidth, poll, animateResults]);

  const handleVote = async () => {
    if (selectedIndex === null) return;

    setIsVoting(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/dailypoll/vote/${poll._id}`,
        { selectedOptionNum: selectedIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { updatedPoll, updatedUserVotes } = res.data;
      setPoll(updatedPoll);
      setUser((prev) => ({ ...prev, votedPolls: updatedUserVotes }));
      setHasVoted(true);
      animateResults();
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setIsVoting(false);
    }
  };
  const renderOption = (option, index) => {
    const selected = index === selectedIndex;
    const percentage =
      poll.totalVotes > 0
        ? Math.round((option.votes / poll.totalVotes) * 100)
        : 0;

    return (
      <Pressable
        key={index}
        style={styles.option}
        onPress={() => !hasVoted && setSelectedIndex(index)}
      >
        <Text style={styles.optionText}>{option.text}</Text>
        <Ionicons
          name={selected ? "radio-button-on" : "radio-button-off"}
          style={selected ? styles.radioOn : styles.radioOff}
        />

        {hasVoted && (
          <View style={styles.resultLineContainer}>
            <Animated.View
              style={[
                styles.resultLine,
                {
                  width: animatedLineWidths.current[index],
                  backgroundColor: selected
                    ? colors.primary
                    : colors.borderLight,
                },
              ]}
            />
            <Text
              style={[
                styles.resultPercentage,
                { color: selected ? colors.primaryDark : colors.textLight },
              ]}
            >
              {percentage}%
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily Poll</Text>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close-circle" style={styles.closeIcon} />
        </Pressable>
      </View>

      <View
        style={styles.contentContainer}
        onLayout={(e) => {
          const width = e.nativeEvent.layout.width;
          setContainerWidth(width);
        }}
      >
        {isLoadingPoll ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.question}>{poll?.question}</Text>
            <View style={styles.optionsContainer}>
              {poll?.options.map(renderOption)}
            </View>

            <TouchableOpacity
              disabled={hasVoted || selectedIndex === null}
              onPress={handleVote}
              activeOpacity={0.9}
              style={[
                styles.voteButton,
                hasVoted || selectedIndex === null
                  ? styles.buttonDisabled
                  : styles.buttonEnabled,
              ]}
            >
              {isVoting ? (
                <ActivityIndicator size={FONT_SIZE_M} color={colors.white} />
              ) : (
                <Text style={styles.voteButtonText}>
                  {hasVoted
                    ? "Thank you for voting! Next poll in 11 hours"
                    : "Vote"}
                </Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
    color: colors.textPrimary,
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  closeIcon: {
    fontSize: FONT_SIZE_XL,
    color: colors.borderLight,
  },
  contentContainer: {
    padding: 20,
  },
  question: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_L,
    color: colors.primaryDark,
  },
  optionsContainer: {
    paddingBottom: 20,
    paddingTop:5
  },
  option: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    color: colors.textPrimary,
  },
  radioOn: {
    fontSize: FONT_SIZE_XL,
    color: colors.primary,
  },
  radioOff: {
    fontSize: FONT_SIZE_XL,
    color: colors.borderLight,
  },
  voteButton: {
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.primary50,
  },
  voteButtonText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.white,
  },
  resultLineContainer: {
    position: "absolute",
    left: 0,
    bottom: -7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  resultLine: {
    height: 4,
    borderRadius: 2,
  },
  resultPercentage: {
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
  },
});

export default DailyPollModal;
