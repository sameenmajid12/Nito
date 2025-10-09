import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_M, TEXT_ACTIVE_OPACITY } from "../../styles";
import ConnectionItem from "./ConnectionItem";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { usePhaseTimer } from "../../contexts/PhaseTimerContext";
import { useUser } from "../../contexts/UserContext";
import { useConversation } from "../../contexts/ConversationContext";
function ConnectionList({ screen, connections, navigation }) {
  const { user } = useUser();
  const { countdowns } = usePhaseTimer();
  const { openConversation, isCurrentConvoDeleted } = useConversation();
  return (
    <View>
      {connections?.length > 0 ? (
        connections?.map((connection, index) => (
          <ConnectionItem
            key={index}
            connection={connection}
            navigation={navigation}
            screen={screen}
          />
        ))
      ) : (
        <View style={styles.emptyStateWrapper}>
          <Text style={styles.emptyStateText}>
            {(user.currentPair.conversation && !isCurrentConvoDeleted)
              ? "It's a little quiet here... start texting and make a \nconnection"
              : `No connections yet... your next pair will appear in ${countdowns.untilNextPair}`}
            ! 🤝
          </Text>
          {(user.currentPair.conversation && !isCurrentConvoDeleted) && (
            <TouchableOpacity
              activeOpacity={TEXT_ACTIVE_OPACITY}
              style={styles.emptyStateButton}
              onPress={() =>
                openConversation(user.currentPair.conversation, true)
              }
            >
              <Text style={styles.emptyStateButtonText}>Chat now</Text>
              <Ionicons
                color={colors.primaryDark}
                size={FONT_SIZE_M}
                name="arrow-forward"
              ></Ionicons>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateWrapper: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    rowGap: 20,
  },
  emptyStateText: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
  },
  emptyStateButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 2,
  },
  emptyStateButtonText: {
    textAlign: "center",
    fontFamily: "Nunito-SemiBold",
    color: colors.primaryDark,
    fontSize: FONT_SIZE_M,
  },
});
export default ConnectionList;
