import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  ScrollView,
} from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_S, FONT_SIZE_XXL } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useEffect, useState, useRef } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";
import TagConainer from "../../components/common/TagContainer";
import { useAuth } from "../../contexts/AuthContext";
function SelectTagsScreen({ navigation }) {
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [error, setError] = useState(false);
  const { registrationData } = useRegistration();
  const { register, isLoadingRegistration } = useAuth();
  const addTag = () => {
    setError(false);
    if (tagText.length > 0) {
      setTags((prev) => [...prev, tagText]);
      setTagText("");
    }
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const skip = () => {
    navigation.replace("Register3");
  };
  const navigateBack = () => {
    navigation.replace("Register1");
  };
  const finishRegistration = () => {
    if (tags.length === 0) {
      setError(true);
    } else {
      register({ registrationData, tags });

    }
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
            inputStyle={styles.input}
            label={"Tag"}
            placeholder={"Enter tag(eg. Gaming)"}
            onSubmitEditing={addTag}
            returnKeyType="done"
            errorText={
              error ? "Please select at least one tag to continue." : null
            }
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

        {tags.length > 0 ? (
          <View style={styles.tagsMainContainer}>
            <View style={styles.tagHeader}>
              <Text style={styles.tagHeaderText}>Selected Tags</Text>
              <Ionicons
                size={14}
                color={colors.textLight}
                name="bookmark-outline"
              ></Ionicons>
            </View>
            <TagConainer
              tagText={tagText}
              setTagText={setTagText}
              tags={tags}
              setTags={setTags}
              setError={setError}
            />
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <View style={styles.buttonContainer}>
          <Button
            onPress={skip}
            title="Skip"
            style={{ width: "48%", height: 45 }}
            variant={"secondary"}
          ></Button>
          <Button
            onPress={finishRegistration}
            title="Continue"
            isLoading={isLoadingRegistration}
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
    marginTop: 10,
  },
  tagsScrollView: {
    marginBottom: 20,
  },
  tagsContentWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 5,
    rowGap: 5,
    width: "100%",
  },
  tagHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tagHeaderText: {
    color: colors.textLight,
    fontFamily: "Nunito-Medium",
    padding: 3,
  },
  tagItem: {
    backgroundColor: colors.accent70,
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
  input: {
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});

export default SelectTagsScreen;
