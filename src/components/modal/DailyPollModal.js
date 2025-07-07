import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  FONT_SIZE_XXL,
} from "../../styles";
function DailyPollModal({ data, handleClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentContainerWidth, setContentContainerWidth] = useState(0);
  useEffect(() => {
    if (hasVoted && contentContainerWidth > 0) {
      animateResults(data.options, contentContainerWidth);
    }
  }, [hasVoted, data.options, contentContainerWidth, animateResults]);
  const onContentContainerLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setContentContainerWidth(width);
  }, []);
  const animatedLineWidths = useRef(
    data.options.map(() => new Animated.Value(0))
  ).current;
  let maxWidthForBars;
  const animateResults = useCallback(
    (optionsWithVotes, measuredWidth) => {
      if (measuredWidth === 0) return;

      const totalVotes = optionsWithVotes.reduce(
        (sum, option) => sum + option.votes,
        0
      );
      maxWidthForBars = measuredWidth - (60 + FONT_SIZE_XXL);

      optionsWithVotes.forEach((option, index) => {
        const percentage =
          totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
        const targetWidth = (percentage / 100) * maxWidthForBars;

        Animated.timing(animatedLineWidths[index], {
          toValue: targetWidth,
          duration: 700,
          useNativeDriver: false,
          easing: require("react-native").Easing.out(
            require("react-native").Easing.ease
          ),
        }).start();
      });
    },
    [animatedLineWidths]
  );
  const selectOption = (index) => {
    if (!hasVoted) {
      setSelectedIndex(index);
    }
  };
  const checkSelected = (index) => {
    return index === selectedIndex;
  };
  const handleVote = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const updatedOptions = data.options.map((option, idx) => {
      if (idx === selectedIndex) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    setLoading(false);
    setHasVoted(true);
    animateResults(updatedOptions, contentContainerWidth);
  };
  const totalVotes = data.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );
  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <Text style={styles.headerText}>Daily Poll</Text>
        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close-circle" style={styles.closeIcon}></Ionicons>
        </Pressable>
      </View>
      <View style={styles.contentContainer} onLayout={onContentContainerLayout}>
        <Text style={styles.question}>{data.question}</Text>

        <View style={styles.optionsContainer}>
          {data.options.map((option, index) => {
            const percentage =
              totalVotes > 0
                ? Math.round((option.votes / totalVotes) * 100)
                : 0;
            return (
              <Pressable
                style={styles.option}
                onPress={() => selectOption(index)}
                key={index}
              >
                <Text style={styles.optionText}>{option.text}</Text>
                <Ionicons
                  name={
                    checkSelected(index)
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  style={
                    checkSelected(index) ? styles.radioOn : styles.radioOff
                  }
                ></Ionicons>
                {hasVoted && contentContainerWidth > 0 && (
                  <View style={styles.resultLineContainer}>
                    <Animated.View
                      style={[
                        styles.resultLine,
                        {
                          width: animatedLineWidths[index],
                          maxWidth: maxWidthForBars
                        },
                        index === selectedIndex
                          ? { backgroundColor: colors.primary }
                          : { backgroundColor: colors.borderLight },
                      ]}
                    />
                    <Text
                      style={[
                        styles.resultPercentage,
                        index === selectedIndex
                          ? { color: colors.primaryDark }
                          : { color: colors.textLight },
                      ]}
                    >
                      {percentage}%
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.voteButton,
            selectedIndex !== null
              ? styles.buttonEnabled
              : styles.buttonDisabled,
          ]}
          disabled={selectedIndex === null || hasVoted}
          onPress={handleVote}
        >
          {loading ? (
            <ActivityIndicator
              size={FONT_SIZE_M}
              color={colors.white}
            ></ActivityIndicator>
          ) : (
            <Text style={styles.voteButtonText}>
              {hasVoted
                ? `Thank you for voting! Next poll in 11 hours`
                : "Vote"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    rowGap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
  },
  headerText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  closeIcon: {
    fontSize: FONT_SIZE_XL,
    color: colors.borderLight,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 5,
  },
  question: {
    color: colors.primaryDark,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_L,
  },
  optionsContainer: {
    paddingBottom:15
  },
  option: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: FONT_SIZE_M,
    fontFamily: "Nunito-Medium",
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
    width: "100%",
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
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
  resultLineContainer: {
    position: "absolute",
    left: 0,
    bottom: -7,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
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
