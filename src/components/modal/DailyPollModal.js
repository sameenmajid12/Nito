import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {
  colors,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
} from "../../styles";
function DailyPollModal({ data, handleClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectOption = (index) => {
    setSelectedIndex(index);
  };
  const checkSelected = (index) => {
    return index === selectedIndex;
  };
  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <View></View>
        <Text style={styles.headerText}>Daily Poll</Text>
        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close-circle" style={styles.closeIcon}></Ionicons>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.question}>{data.question}</Text>

        <View style={styles.optionsContainer}>
          {data.options.map((option, index) => {
            return (
              <Pressable
                style={styles.option}
                onPress={() => selectOption(index)}
                key={index}
              >
                <Text style={styles.optionText}>{option}</Text>
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
          disabled={selectedIndex === null}
        >
          <Text style={styles.voteButtonText}>Vote</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingVertical: 7,
    paddingHorizontal:20,
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
  contentContainer:{
    paddingHorizontal:25,
    paddingVertical:20,
    rowGap:15
  },
  question: {
    color: colors.primaryDark,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_L,
  },
  optionsContainer: {
    paddingBottom: 10,
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
});
export default DailyPollModal;
