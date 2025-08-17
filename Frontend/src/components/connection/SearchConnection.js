import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, FONT_SIZE_L } from "../../styles";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
function Search({ search, setSearch, setConnections }) {
  const { user } = useUser();
  useEffect(() => {
    if (search.length === 0) {
      setConnections(user.revealedUsers);
    } else {
      const filteredConnections = user.revealedUsers.filter((c) =>
        c.user.fullname.toLowerCase().includes(search.toLowerCase().trim())
      );
      setConnections(filteredConnections);
    }
  }, [search]);
  return (
    <View style={styles.searchContainer}>
      <Ionicons style={styles.searchIcon} name="search-outline"></Ionicons>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    marginHorizontal:30,
    marginTop:30
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
});
export default Search;
