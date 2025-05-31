import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { colors, textStyles, FONT_SIZE_L } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

function SchoolSelector({
  school,
  setSchool,
  containerStyle,
  selectorStyle,
  dropDownVisible,
  setDropDownVisible,
}) {
  const [schoolSelected, setSchoolSelected] = useState(false);

  const rotateAnimation = useState(new Animated.Value(0))[0];

  const toggleDropDown = () => {
    setDropDownVisible((prev) => !prev);
  };

  useEffect(() => {
    if (school.name !== "Select School") {
      setSchoolSelected(true);
    } else {
      setSchoolSelected(false);
    }
  }, [school]);

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: dropDownVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [dropDownVisible]);

  const rotateDegree = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const selectSchool = (name) => {
    setSchool(name);
    setDropDownVisible(false);
  };

  const schools = [
    {
      name: "Rutgers University-New Brunswick",
      img: require("../../assets/images/rutgers.png"),
    },
    { name: "Rowan University", img: require("../../assets/images/rowan.png") },
    { name: "SUNY Cortland", img: require("../../assets/images/cortland.png") },
  ];

  return (
    <>
      <View style={[styles.selectorContainer, containerStyle]}>
        <Pressable onPress={toggleDropDown}>
          <Text style={textStyles.inputLabel}>School</Text>
          <View
            style={[
              styles.selector,
              selectorStyle,
              dropDownVisible
                ? {
                    borderBottomEndRadius: 0,
                    borderBottomStartRadius: 0,
                    borderBottomWidth: 0,
                  }
                : {},
            ]}
          >
            <Text
              style={{
                fontFamily: "Nunito-SemiBold",
                color: schoolSelected ? colors.textPrimary : colors.textLight,
              }}
            >
              {school.name}
            </Text>
            {schoolSelected ? (
              <Image
                contentFit="contain"
                style={{ width: 20, height: 20 }}
                source={school.img}
              ></Image>
            ) : (
              <Animated.View style={{ transform: [{ rotate: rotateDegree }] }}>
                <Ionicons
                  name="chevron-down-outline"
                  size={FONT_SIZE_L}
                  color={
                    dropDownVisible ? colors.textSecondary : colors.primary
                  }
                />
              </Animated.View>
            )}
          </View>
        </Pressable>

        {dropDownVisible && (
          <View style={styles.dropDownContainer}>
            {schools.map((s, index) => (
              <Pressable
                key={index}
                onPress={() => selectSchool(s)}
                style={styles.dropDownSchool}
              >
                <Text style={textStyles.body}>{s.name}</Text>
                <Image
                  contentFit="contain"
                  style={{ width: 20, height: 20 }}
                  source={s.img}
                />
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    width: "80%",
    marginBottom: 10,
    position:"relative"
  },
  selector: {
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 45,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.textPrimary,  
  },
  dropDownContainer: {
    position: "absolute",
    top: "100%",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    zIndex: 100,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  dropDownSchool: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});

export default SchoolSelector;
