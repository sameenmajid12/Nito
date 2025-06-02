import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  ScrollView, 
} from "react-native";
import {
  colors,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XXL,

} from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useEffect, useState, useRef } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";

function SelectTagsScreen({ navigation }) {
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const { updateRegistrationData } = useRegistration();

  const finishRegistration = () => {
    updateRegistrationData(tags);
    navigation.replace("Register3");
  };

  const navigateBack = () => {
    navigation.replace("Register1");
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const addTag = () => {
    if (tagText.length > 0) {
      setTags((prev) => [...prev, tagText]);
      setTagText("");
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={[styles.pageContainer, { opacity: fadeAnim }]}>
        <Pressable onPress={navigateBack} style={styles.navigateBack}>
          <Ionicons size={16} name="chevron-back-outline"></Ionicons>
          <Text style={{ fontFamily: "Nunito-SemiBold" }}>Back</Text>
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
            value={tagText}
            setValue={setTagText}
            containerStyle={{ width: "100%" }}
            label={"Tag"}
            placeholder={"Enter tag(eg. Gaming)"}
            onSubmitEditing={addTag}
            returnKeyType="done"
          ></Input>
          <View style={{ justifyContent: "flex-end" }}>
            <Button
              title={"Add"}
              style={{ width: 120, height: 35 }}
              variant={"tertiary"}
              onPress={addTag}
            ></Button>
          </View>
        </View>

        {tags.length > 0 ? <View style={styles.tagsMainContainer}>
          <View style={styles.tagHeader}>
            <Text style={styles.tagHeaderText}>Selected Tags</Text>
            <Ionicons  size={14} color={colors.textLight} name="bookmark-outline"></Ionicons>
          </View>
          <ScrollView style={styles.tagsScrollView}>
            <View style={styles.tagsContentWrapper}>
              {tags.map((tag, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagsText}>{tag}</Text>
                  <Pressable onPress={() => removeTag(index)}>
                    <Ionicons
                      size={20}
                      color={colors.white}
                      name="close"
                    ></Ionicons>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>: <View style={{flex:1}}/>}
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
  navigateBack: {
    flexDirection: "row",
    columnGap: 3,
    alignItems: "center",
  },
  tagsMainContainer: {
    flex: 1,
    rowGap: 10,
    marginTop:10
  },
  tagsScrollView: {
    marginBottom: 20,
  },
  tagsContentWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",     
    columnGap: 5,        
    rowGap: 5,           
    width: '100%',
  },
  tagHeader: {
    flexDirection:"row",
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tagHeaderText: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    padding: 3,
  },
  tagItem: {
    backgroundColor: colors.primary70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderRadius: 999,
  },
  tagsText: {
    color: colors.white,
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
  },
});

export default SelectTagsScreen;