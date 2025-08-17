import { View, Text, StyleSheet } from "react-native";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
const NAME_HEIGHT = 16;
function SentMessage({ text, first, last }) {
  return (
    <View>
      {first && <Text style={styles.name}>You</Text>}
      <View
        style={[
          styles.sentMessage,
          first && styles.first,
          last && styles.last,
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sentMessage: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-end",
    backgroundColor: colors.white70,
    borderRadius: 20,
    maxWidth: "70%",
    marginBottom: 1,
    shadowColor: colors.primary,
    shadowRadius: 4,
    shadowOpacity: 0.075,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: colors.textPrimary,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_S,
  },
  last: {
    marginBottom: 20,
    shadowRadius: 4,
    shadowOpacity: 0.075,
    shadowOffset: { width: 0, height: 4 },
  },
  name: {
    alignSelf: "flex-end",
    fontSize: FONT_SIZE_XS,
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
  },
});
export default SentMessage;
