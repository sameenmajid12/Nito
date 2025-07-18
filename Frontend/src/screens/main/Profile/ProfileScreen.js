import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../../styles";
import Header from "../../../components/common/Header";
import ProfileTop from "../../../components/profile/ProfileTop";
import ProfileActivity from "../../../components/profile/ProfileActivity";
import ProfileAboutMe from "../../../components/profile/ProfileAboutMe";
import ProfileSettings from "../../../components/profile/ProfileSettings";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
const initialChanges = {
  bio: null,
  year: null,
  major: null,
  instagram: null,
  snapchat: null,
  linkedin: null,
  discord: null,
};
function ProfileScreen({ navigation }) {
  const { updateUser, user } = useUser();
  const [editing, setEditing] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [changes, setChanges] = useState(initialChanges);
  const saveChanges = async () => {
    if (changesMade) {
      const payload = {};

      for (const key in changes) {
        if (Object.prototype.hasOwnProperty.call(changes, key)) {
          const value = changes[key];
          const userValue = user[key];

          if (typeof value === "string") {
            const trimmedValue = value.trim();
            if (
              trimmedValue !== "" &&
              trimmedValue !== String(userValue || "")
            ) {
              payload[key] = trimmedValue;
            } else if (trimmedValue === "" && String(userValue || "") !== "") {
              payload[key] = null;
            }
          } else if (value !== null && value !== undefined) {
            if (value !== userValue) {
              payload[key] = value;
            }
          }
        }
      }
      const socialMediaKeys = ["instagram", "snapchat", "linkedin", "discord"];
      let socialMediaChanges = {};
      let socialMediaChanged = false;

      socialMediaKeys.forEach((key) => {
        const value = changes[key];
        const userSocialValue = user.socialMedia?.[key];

        if (typeof value === "string") {
          const trimmedValue = value.trim();
          if (
            trimmedValue !== "" &&
            trimmedValue !== String(userSocialValue || "")
          ) {
            socialMediaChanges[key] = trimmedValue;
            socialMediaChanged = true;
          } else if (
            trimmedValue === "" &&
            String(userSocialValue || "") !== ""
          ) {
            socialMediaChanges[key] = null;
            socialMediaChanged = true;
          }
        } else if (
          value !== null &&
          value !== undefined &&
          value !== userSocialValue
        ) {
          socialMediaChanges[key] = value;
          socialMediaChanged = true;
        }
      });

      if (socialMediaChanged) {
        payload.socialMedia = { ...user.socialMedia, ...socialMediaChanges };
      }

      if (
        Object.keys(payload).length > 0 ||
        (socialMediaChanged && Object.keys(socialMediaChanges).length > 0)
      ) {
        await updateUser(payload);
      }
    }
    setEditing(false);
    setChanges(initialChanges);
    setChangesMade(false);
  };

  const resetChanges = () => {
    setChangesMade(false);
    setChanges(initialChanges);
    setEditing(false);
  };
  const navigate = (route) => {
    navigation.navigate(route);
  };

  const paddingBottom = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(paddingBottom, {
        toValue: e.endCoordinates.height - 35,
        duration: e.duration || 250,
        useNativeDriver: false,
      }).start();
    });
    const keyboardHide = Keyboard.addListener("keyboardWillHide", (e) => {
      Animated.timing(paddingBottom, {
        toValue: 0,
        duration: e.duration || 250,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [paddingBottom]);
  return (
    <SafeAreaView style={styles.page}>
      <Header />
      <Animated.View style={{ flex: 1, paddingBottom: paddingBottom }}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          style={styles.scrollContainer}
        >
          <View style={styles.mainContainer}>
            <ProfileTop
              changesMade={changesMade}
              setEditing={setEditing}
              editing={editing}
              saveChanges={saveChanges}
              resetChanges={resetChanges}
              user={user}
              isUser={true}
            />
            <View style={styles.detailsContainer}>
              <ProfileActivity navigate={navigate} user={user} isUser={true} />
              <ProfileAboutMe
                editing={editing}
                changes={changes}
                setChanges={setChanges}
                setChangesMade={setChangesMade}
                changesMade={changesMade}
                isUser={true}
                user={user}
              />
              <ProfileSettings navigate={navigate} />
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 30,
    backgroundColor: "transparent",
  },
  mainContainer: {
    rowGap: 5,
    marginBottom: 100,
    backgroundColor: "transparent",
  },
  detailsContainer: {
    rowGap: 20,
  },
});
export default ProfileScreen;
