import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import { useState } from "react";
import {
  colors,
  FONT_SIZE_M,
  TEXT_ACTIVE_OPACITY,
} from "../../styles";
import { Ionicons } from "@expo/vector-icons";

function FAQItem({ question, answer }) {
  if (!question || !answer) {
    return;
  }
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const arrowIconName = isExpanded ? "chevron-up" : "chevron-down";
  const iconColor = isExpanded ? colors.textPlaceholder : colors.primaryDark;
  return (
    <View style={styles.faqContainer}>
      <TouchableOpacity
        activeOpacity={TEXT_ACTIVE_OPACITY}
        onPress={toggleExpansion}
        style={styles.questionWrapper}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons color={iconColor} size={FONT_SIZE_M} name={arrowIconName} />
      </TouchableOpacity>

      {isExpanded && (
        <>
          <View style={styles.seperator}></View>
          <View style={styles.answerWrapper}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  questionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  questionText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.primary,
    flexShrink: 1,
    marginRight: 10,
  },
  answerWrapper: {
    paddingVertical: 12,
  },
  answerText: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textPrimary,
  },
  seperator: { height: 1, width: "100%", backgroundColor: colors.primary50 },
});

export default FAQItem;
