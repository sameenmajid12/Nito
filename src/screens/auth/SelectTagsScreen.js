import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_XXL } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useState } from "react";
function SelectTagsScreen({ navigation }) {
  const [tags, setTags] = useState([]);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageContainer}>
        <View style={styles.pageHeader}>
          <Text style={styles.mainHeader}>Select Tags</Text>
          <Text style={styles.subHeader}>
            These are used to match you with students that have similar
            interests
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={tags}
            setValue={setTags}
            containerStyle={{ width: "100%" }}
            label={"Tag"}
            placeholder={"Enter tag(eg. Gaming)"}
          ></Input>
          <Button
            title={"Add"}
            style={{ width: 120, height: 35 }}
            variant={"tertiary"}
          ></Button>
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.replace("Register3")}
            title="Skip"
            style={{ width: "48%", height: 45 }}
            variant={"secondary"}
          ></Button>
          <Button
            onPress={() => navigation.replace("Register3")}
            title="Continue"
            style={{ width: "48%", height: 45 }}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageContainer: { flex: 1, paddingHorizontal: 40, paddingBottom: 20 },
  pageHeader: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  mainHeader: {
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: FONT_SIZE_XXL,
    color: colors.textPrimary,
  },
  subHeader: {
    textAlign: "center",
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    color: colors.textPrimary,
  },
  inputContainer: {
    alignItems: "flex-end",
    rowGap: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    columnGap: "4%",
  },
});
export default SelectTagsScreen;
