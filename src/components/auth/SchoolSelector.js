import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  ScrollView,
  TextInput,
} from "react-native";
import { colors, textStyles, FONT_SIZE_L, FONT_SIZE_XS } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import ErrorMessage from "../common/ErrorMessage";

function SchoolSelector({
  school,
  setSchool,
  containerStyle,
  selectorStyle,
  dropDownVisible,
  setDropDownVisible,
  errorText,
}) {
  const allSchools = [
    {
      name: "Rutgers University-New Brunswick",
      img: require("../../assets/images/rutgers.png"),
    },
    { name: "Rowan University", img: require("../../assets/images/rowan.png") },
    { name: "SUNY Cortland", img: require("../../assets/images/cortland.png") },
  ];
  const [filteredSchools, setFilteredSchools] = useState(allSchools);
  const [schoolSelected, setSchoolSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
  useEffect(() => {
    if (searchQuery.length > 0) {
      const newSchools = allSchools.filter((schoolItem) =>
        schoolItem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSchools(newSchools);
    } else {
      setFilteredSchools(allSchools);
    }
  }, [searchQuery]);
  const rotateDegree = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const selectSchool = (name) => {
    setSchool(name);
    setDropDownVisible(false);
  };

  return (
    <>
      <View style={[styles.selectorContainer, containerStyle]}>
        <Pressable onPress={toggleDropDown}>
          <Text style={textStyles.inputLabel}>School</Text>
          <View
            style={[
              styles.selector,
              selectorStyle,
              (errorText && !dropDownVisible)
                ? { borderColor: "red" }
                : { borderColor: colors.borderLight },
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
                fontFamily: "Nunito-Medium",
                color: schoolSelected ? colors.textPrimary : colors.textPlaceholder,
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
        {(errorText && !dropDownVisible) && <ErrorMessage message={errorText} style={{fontSize:FONT_SIZE_XS}}/>}
        {dropDownVisible && (
          <ScrollView style={styles.dropDownContainer}>
            <View style={styles.searchContainer}>
              <Ionicons size={16} name="search-outline"></Ionicons>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search"
                style={{ flex: 1, height: "100%" }}
              ></TextInput>
            </View>
            <View style={styles.divider}></View>
            {filteredSchools.map((s, index) => (
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
            {searchQuery === "" && (
              <Text style={[textStyles.body, styles.endText]}>
                More coming soon :)
              </Text>
            )}
            {filteredSchools.length === 0 && (
              <Text style={[textStyles.body, styles.endText]}>
                {"No results found :("}
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    width: "80%",
    marginBottom: 10,
    position: "relative",
  },
  selector: {
    borderWidth: 1,
    borderColor: colors.borderLight,
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
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    width: "100%",
    zIndex: 100,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    maxHeight: 250,
  },
  dropDownSchool: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginTop: 10,
    marginBottom: 4,
  },
  endText: {
    paddingTop: 10,
    marginVertical: 7,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
});

export default SchoolSelector;
