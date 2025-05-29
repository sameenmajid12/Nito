import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors,textStyles, FONT_SIZE_L } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
function SchoolSelector({school, setSchool, containerStyle, selectorStyle}){
  return(
    <View style={[styles.selectorContainer, containerStyle]}>
          <Text style={textStyles.inputLabel}>School</Text>
          <View style={[styles.selector, selectorStyle]}>
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
  )
}

const styles = StyleSheet.create({
   selectorContainer:{
      width:"80%",
      marginBottom:10
    },
  selector: {
    borderWidth: 1,
    borderColor: colors.border,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.textPrimary,
  },
})
export default SchoolSelector;