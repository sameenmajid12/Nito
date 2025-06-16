import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L } from "../../styles";
function Search({search, setSearch}){
  return(
    <View style={styles.searchContainer}>
            <Ionicons
              style={styles.searchIcon}
              name="search-outline"
            ></Ionicons>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
            ></TextInput>
          </View>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
  },
  searchIcon: {
    fontSize: FONT_SIZE_L,
    padding: 10,
  },
  searchInput: {
    fontFamily: "Nunito-SemiBold",
    flex: 1,
    height: "100%",
  },
})
export default Search;
