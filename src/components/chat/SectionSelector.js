import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";

function SectionSelector({ setSelectedSection, checkSelected }) {
  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={[styles.button, checkSelected("current") ? styles.active : null]}
               onPress={()=>setSelectedSection("current")}

      >
        <Text
          style={
            checkSelected("current")
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Current
        </Text>
      </Pressable>
      <Pressable
       style={[styles.button, checkSelected("connections") ? styles.active : null]}
              onPress={()=>setSelectedSection("connections")}

      >
        <Text
          style={
            checkSelected("connections")
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Connections
        </Text>
      </Pressable>
      <Pressable
       style={[styles.button, checkSelected("archived") ? styles.active : null]}
       onPress={()=>setSelectedSection("archived")}
      >
        <Text
          style={
            checkSelected("archived")
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Archived
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    columnGap: 10,
    paddingTop: 30,
    alignSelf:"center"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 999,
    height: 35,
  },
  buttonText: {
    color: colors.blue,
    fontFamily: "Nunito-Medium",
  },
  active: {
    backgroundColor: colors.blue,
  },
  activeButtonText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
  },
});
export default SectionSelector;
