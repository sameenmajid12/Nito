import {
  StyleSheet,
  View,
  Text,
  Animated,
  ScrollView,
  SafeAreaView,
  Keyboard,
  LayoutAnimation
} from "react-native";
import { colors, FONT_SIZE_XL } from "../../../styles";
import ContactUs from "../../../components/support/ContactUs";
import TextHeader from "../../../components/common/TextHeader";
import FAQList from "../../../components/support/FAQList";
import { useState, useEffect } from "react";

function HelpAndSupportScreen({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keybaordWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: 50,
        });
        setKeyboardVisible(true);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: 150,
        });
        setKeyboardVisible(false);
      }
    );

    return () => {
      keybaordWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <TextHeader text={"Help & Support"} navigation={navigation} />

      <Animated.View style={styles.contentWrapper}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>How can we help?</Text>
            <Text style={styles.subheader}>
              Find answers to all your questions in one place
            </Text>
          </View>
          <FAQList keyboardVisible={keyboardVisible}/>
          <ContactUs />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContainer: {
    padding: 30,
  },
  headerWrapper: {
    paddingBottom: 20,
  },
  header: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_XL,
    textAlign: "center",
  },
  subheader: {
    fontFamily: "Nunito-SemiBold",
    color: colors.textLight,
    textAlign: "center",
  },
});

export default HelpAndSupportScreen;
