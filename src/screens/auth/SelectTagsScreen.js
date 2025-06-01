import { SafeAreaView, StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_XXL, textStyles } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useEffect, useState,useRef } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";
function SelectTagsScreen({ navigation }) {
  const [tags, setTags] = useState([]);
  const { updateRegistrationData } = useRegistration();
  const finishRegistration = () => {
    updateRegistrationData(tags);
    navigation.replace("Register3");
  };
  const navigateBack=()=>{
    navigation.replace("Register1");
  }
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    Animated.timing(fadeAnim,{
      toValue:1,
      duration:700,
      useNativeDriver:true
    }).start();
  },[])
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={[styles.pageContainer,{opacity:fadeAnim}]}>
        <Pressable onPress={navigateBack} style={styles.navigateBack}>
          <Ionicons size={16} name="chevron-back-outline"></Ionicons>
          <Text style={{fontFamily:"Nunito-SemiBold"}}>Back</Text>
        </Pressable>
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
            onPress={finishRegistration}
            title="Continue"
            style={{ width: "48%", height: 45 }}
          ></Button>
        </View>
      </Animated.View>
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
    paddingTop: 20,
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
  navigateBack:{
    flexDirection:"row",
    columnGap:3,
    alignItems:"center"
  }
});
export default SelectTagsScreen;
