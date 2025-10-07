import { useRef } from "react";
import { Text, StyleSheet, View, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, FONT_SIZE_S, FONT_SIZE_XXL } from "../../styles";
import { useUser } from "../../contexts/UserContext";

function NewPairingFound({ navigation }) {
  const scale = useRef(new Animated.Value(1)).current;
  const { user } = useUser();
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      }}
    >
      <LinearGradient
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.9 }}
        colors={[colors.accent70, colors.primary]}
      >
        <Text style={styles.mainHeader}>New pairing found!</Text>
        <Text style={styles.subHeader}>
          Don't lose this opportunity to make a new friend
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Chat", {conversation: user.currentPair.conversation})}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {({ pressed }) => (
            <Animated.View
              style={[
                styles.button,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: pressed ? colors.primaryDark : colors.primary },
                ]}
              >
                Chat now
              </Text>
            </Animated.View>
          )}
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 30,
    paddingBottom: 25,
  },
  mainHeader: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_XXL,
  },
  subHeader: {
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 6,
  },
  button: {
    width: 150,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontFamily: "Nunito-Bold",
  },
});

export default NewPairingFound;
