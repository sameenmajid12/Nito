import { Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { colors, FONT_SIZE_M, FONT_SIZE_XXL } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
function MessageOptions({ message }) {
  const translateX = useRef(new Animated.Value(400)).current;
  useEffect(()=>{
    Animated.timing(translateX,{
      toValue:0,
      duration:350,
      delay:0,
      useNativeDriver:true,
      easing:Easing.easeInOut
    }).start()
  },[])
  return (
    <Animated.View style={[styles.messageOptionsWrapper, {transform:[{translateX}]}]}>
      <TouchableOpacity style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} name="color-wand-outline"></Ionicons>
        <Text style={styles.option}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} name="clipboard-outline"></Ionicons>
        <Text style={styles.option}>Copy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionWrapper}>
        <Ionicons style={styles.optionIcon} size={FONT_SIZE_XXL} name="trash-outline"></Ionicons>
        <Text style={styles.option}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  messageOptionsWrapper: {
    backgroundColor: colors.white70,
    padding: 20,
    paddingLeft:15,
    rowGap:20,
    borderRadius:20
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap:10
  },
  optionIcon: {
    fontSize: FONT_SIZE_XXL,
    color: colors.textPrimary
  },
  option: {
    color: colors.textPrimary,
    fontFamily: "Nunito-SemiBold", fontSize: FONT_SIZE_M,
    textAlign: "left"
  }
})
export default MessageOptions;