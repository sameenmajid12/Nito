import { SafeAreaView, StyleSheet, View, Text, Animated } from "react-native";
import { colors, FONT_SIZE_M, textStyles } from "../../styles";
import Button from "../../components/common/Button";
import DecorationShapes from "../../components/auth/DecorationShapes";
import { useEffect, useState, useRef } from "react";
import Logo from "../../components/common/Logo";
import SchoolSelector from "../../components/auth/SchoolSelector";
function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState({name:"Select School", img:null})
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <SafeAreaView style={styles.page}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <DecorationShapes />

        <View style={styles.pageContentContainer}>
          <Logo style={{ marginBottom: 10 }} width={150} height={80}/>
          <Text style={[textStyles.h3, { marginBottom: 20 }]}>
            Start chatting anonymously.
          </Text>
          <SchoolSelector school={school} setSchool={setSchool}/>
          <Button
            title="Register"
            style={{ width: "80%", height: 45, marginTop: 10 }}
            onPress={()=>navigation.replace("Register1")}
          />
          <Text style={styles.whyNito}>Why use Nito?</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.noAccountText}>
          Already have an account?{" "}
          <Text
            onPress={() => navigation.replace("Login")}
            style={{ color: colors.primary, fontFamily: "Nunito-Bold" }}
          >
            Login
          </Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  pageContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 250,
  },
  noAccountText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
    color: colors.textPrimary,
  },
  whyNito:{
    fontFamily:"Nunito-Bold",
    color:colors.primary,
    marginTop:15,
  }
});

export default RegisterScreen;
