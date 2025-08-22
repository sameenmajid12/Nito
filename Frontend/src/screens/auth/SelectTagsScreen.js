import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Keyboard,
  Easing,
} from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_S, FONT_SIZE_XXL } from "../../styles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useEffect, useState, useRef } from "react";
import { useRegistration } from "../../contexts/RegistrationContext";
import { Ionicons } from "@expo/vector-icons";
import TagContainer from "../../components/common/TagContainer";
import { useAuth } from "../../contexts/AuthContext";
function SelectTagsScreen({ navigation }) {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [tags, setTags] = useState(registrationData.tags || []);
  const [tagText, setTagText] = useState("");
  const [error, setError] = useState(false);
  const addTag = () => {
    setError(false);
    if (tagText.length > 0) {
      setTags((prev) => [...prev, tagText]);
      updateRegistrationData({ tags: [...registrationData.tags, tagText] });
      setTagText("");
    }
    inputRef.current?.focus();
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: -e.endCoordinates.height + 30,
        duration: e.duration,
        easing: Easing.bezier(0, 0, 0.2, 1),

        useNativeDriver: true,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: true,
        easing: Easing.bezier(0, 0, 0.2, 1),
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);
  const navigateBack = () => {
    navigation.replace("Register1");
  };
  const continueRegistration = (skipped) => {
    if (!skipped && tags.length === 0) {
      setError(true);
      return;
    }
    navigation.replace("Register3");
  };
  return (
    <SafeAreaView style={styles.page}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
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
              ref={inputRef}
              value={tagText}
              setValue={setTagText}
              containerStyle={{ width: "100%" }}
              inputStyle={styles.input}
              label={"Tag"}
              placeholder={"Enter tag(eg. Gaming)"}
              onSubmitEditing={addTag}
              returnKeyType="default"
              errorText={
                error ? "Please select at least one tag to continue." : null
              }
            ></Input>
            <View style={{ justifyContent: "flex-end" }}>
              <Button
                title={"Add"}
                buttonStyle={styles.addButton}
                textStyle={styles.addButtonText}
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
              <TagContainer
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
          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ translateY: keyboardOffset }] },
            ]}
          >
            <Button
              onPress={() => continueRegistration(true)}
              title="Skip"
              buttonStyle={styles.mainButton}
              variant={"secondary"}
            ></Button>
            <Button
              onPress={() => continueRegistration(false)}
              title="Finish"
              buttonStyle={styles.mainButton}
            ></Button>
          </Animated.View>
        </Animated.View>
      </Pressable>
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
  addButton: {
    width: 120,
    height: 35,
    backgroundColor: colors.accent70,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: { fontFamily: "Nunito-Bold", color: colors.white },
  mainButton: { width: "48%", height: 45, borderRadius: 10 },
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
