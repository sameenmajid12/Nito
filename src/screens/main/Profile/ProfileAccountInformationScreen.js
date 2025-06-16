import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, FONT_SIZE_XL } from "../../../styles";
import AccountInformationInput from "../../../components/profile/AccountInformationInput";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function ProfileAccountInformationScreen() {
  const [edited, setEdited] = useState(false);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Ionicons
          size={FONT_SIZE_L}
          color={colors.textPrimary}
          name="chevron-back"
        ></Ionicons>
        <Text style={styles.headerText}>Account Information</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.pageHeader}>Details</Text>
          <Text style={styles.pageSubheader}>Here you can edit your account information</Text>
        </View>

        <AccountInformationInput
          iconName={"person-circle-outline"}
          label={"Fullname"}
          value={"Sameen Majid"}
          placeholder={"Enter fullname"}
          editable={true}
        />
        <AccountInformationInput
          iconName={"at-outline"}
          label={"Username"}
          value={"user21454295"}
          editable={false}
        />
        <AccountInformationInput
          iconName={"mail-outline"}
          label={"Email"}
          value={"srm341@scarletmail.rutgers.edu"}
          placeholder={"Enter email"}
          editable={true}
        />
        <AccountInformationInput
          iconName={"call-outline"}
          label={"Phone number"}
          value={"516-667-9552"}
          placeholder={"Enter phone number"}
          editable={true}
        />
        <AccountInformationInput
          iconName={"shield-outline"}
          label={"Password"}
          value={"Samin123"}
          placeholder={"Enter password"}
          editable={true}
          secure={true}
        />
        <TouchableOpacity
          style={[styles.saveButton, edited?{backgroundColor:colors.primary}:{backgroundColor:colors.primary50}]}
          disabled={edited}
          activeOpacity={edited ? 0.9 : 1.0}
        >
          <Text style={styles.saveButtonText} disabled={edited}>
            Save changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    columnGap: 5,
    height: 41,
  },
  headerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_M,
  },
  contentContainer: {
    padding: 30,
    rowGap: 15,
  },
  saveButton: {
    alignSelf: "flex-end",
    width: 135,
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: "Nunito-Bold",
    fontSize:FONT_SIZE_S
  },
  pageHeader:{
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_XL,
    textAlign:"center",
    color:colors.textPrimary
  },
  pageSubheader:{
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_S,
    color:colors.textLight,
    textAlign:"center",
  }
});
export default ProfileAccountInformationScreen;
