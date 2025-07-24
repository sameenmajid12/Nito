import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../../contexts/UserContext";
import ProfileSectionHeader from "../profile/ProfileSectionHeader";
import { colors, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";
import { usePoll } from "../../contexts/PollContext";

function UserPollComparison({ otherUser }) {
  const { user } = useUser();
  const { poll, checkIfVoted, getVoteAnswer } = usePoll();
  const userAnswer = checkIfVoted(user)
    ? getVoteAnswer(user).answerData
    : "No answer";
  const otherUserAnswer = checkIfVoted(otherUser)
    ? getVoteAnswer(otherUser).answerData
    : "No answer";
  const bottomText =
    !checkIfVoted(user) && !checkIfVoted(otherUser)
      ? "No votes yet! Vote to compare. 📮"
      : !checkIfVoted(user) && checkIfVoted(otherUser)
      ? `${otherUser.fullname.split(" ")[0]} has voted! What's your pick? 🤔`
      : checkIfVoted(user) && !checkIfVoted(otherUser)
      ? `${
          otherUser.fullname.split(" ")[0]
        } hasn't voted yet 👎 Remind them to vote!`
      : userAnswer === otherUserAnswer
      ? "Perfect pick! 🎉"
      : "Room for debate? 👀";
  return (
    <View style={styles.sectionWrapper}>
      <ProfileSectionHeader header={"Poll comparison"} />
      <View style={styles.contentContainer}>
        <Text style={styles.question}>{poll?.question}</Text>
        <View style={styles.answersSection}>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabelText}>Your answer:</Text>
            <Text style={styles.answerValueText}>{userAnswer}</Text>
          </View>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabelText}>
              {otherUser.fullname.split(" ")[0]}'s answer:
            </Text>
            <Text style={styles.answerValueText}>{otherUserAnswer}</Text>
          </View>
        </View>
        <Text style={styles.matchMessageText}>{bottomText}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionWrapper: {
    rowGap: 20,
  },
  question: {
    color: colors.primaryDark,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  contentContainer: {
    rowGap: 5,
  },
  answersSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerBlock: {
    width: "49%",
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    rowGap: 5,
  },
  answerLabelText: {
    color: colors.primary70,
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
  },
  answerValueText: {
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_M,
    color: colors.primaryDark,
  },
  matchMessageText: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    marginTop: 5,
  },
});
export default UserPollComparison;
