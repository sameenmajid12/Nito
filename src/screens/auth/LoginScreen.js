import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, textStyles } from "../../styles";
import Button from "../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.page}>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/loginShape1.png")}
        style={styles.shape1}
      ></Image>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/loginShape2.png")}
        style={styles.shape2}
      ></Image>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/loginShape3.png")}
        style={styles.shape3}
      ></Image>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/loginShape4.png")}
        style={styles.shape4}
      ></Image>
      <View style={styles.pageContentContainer}>
        <Image
          resizeMode="contain"
          style={{ width: 150, height: 65 }}
          source={require("../../assets/images/logo.png")}
        ></Image>
        <Text style={[textStyles.h3, { marginBottom: 10 }]}>
          Chat freely. Chat anonymously.
        </Text>
        <View style={styles.dropDownContainer}>
          <Text style={textStyles.inputLabel}>School</Text>
          <View style={styles.dropDown}>
            <Text
              style={{ fontFamily: "Nunito-SemiBold", color: colors.textLight }}
            >
              Select School
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={FONT_SIZE_L}
              color={colors.textSecondary}
            ></Ionicons>
          </View>
        </View>

        <Button title="Login" style={{ width: "80%", height: 45 }} />
      </View>
      <View style={{ flex: 1 }} />
      <Text style={styles.noAccountText}>
        Don't have an account?{" "}
        <Text onPress={()=>navigation.navigate("Register")} style={{ color: colors.primary, fontFamily: "Nunito-Bold" }}>
          Register
        </Text>
      </Text>
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
    rowGap: 15,
  },
  dropDownContainer: {
    width: "80%",
    marginBottom: 10,
  },
  dropDown: {
    borderWidth: 1,
    borderColor: colors.border,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noAccountText: {
    fontFamily: "Nunito-Medium",
    fontSize: FONT_SIZE_M,
    textAlign: "center",
    paddingBottom: 40,
  },
  shape1: {
    position: "absolute",
    width: 100,
    height:100,
    top: 130,
    right: 50,
    zIndex:10
  },
  shape2: {
    position: "absolute",
    width: 123,
    height:100,
    top:80,
    right:-15
  },
  shape3:{
    position:"absolute",
    width:80,
    height:80,
    bottom:150,
    left:40
  },
  shape4:{
    position:'absolute',
    width:150,
    height:150,
    bottom:80,
    left:-70
  }
});

export default LoginScreen;
