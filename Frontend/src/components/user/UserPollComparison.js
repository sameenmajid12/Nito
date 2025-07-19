import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../../contexts/UserContext";
import ProfileSectionHeader from "../profile/ProfileSectionHeader";
import { colors, FONT_SIZE_M, FONT_SIZE_XS } from "../../styles";

function UserPollComparison({ otherUser }) {
  const { user } = useUser();
  return (
    <View style={styles.sectionWrapper}>
      <ProfileSectionHeader header={"Poll comparison"} />
      <View style={styles.contentContainer}>
        <Text style={styles.question}>
          Favorite place to eat after a night out?
        </Text>
        <View style={styles.answersSection}>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabelText}>Your answer:</Text>
            <Text style={styles.answerValueText}>Guac Time</Text>
          </View>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabelText}>Mike Ross' answer:</Text>
            <Text style={styles.answerValueText}>No answer</Text>
          </View>
        </View>
        <Text style={styles.matchMessageText}>
          Mike Ross hasn't voted yet 👎 remind them to vote
        </Text>
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
