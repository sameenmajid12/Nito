import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TextInput, View, Text, ScrollView, StyleSheet } from "react-native";
import { colors, FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, FONT_SIZE_XL, FONT_SIZE_XXS } from "../../styles";

function Connections(){
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your connections</Text>
        <View style={styles.searchContainer}>
          <Ionicons style={styles.searchIcon} name="search-outline"></Ionicons>
          <TextInput placeholder="Search" style={styles.searchInput}></TextInput>
        </View>
      </View>
      <View style={styles.connectionsContainer}>
        <View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View><View style={styles.connection}>
          <Image source={require('../../assets/images/mike.webp')} width={50} height={50} style={styles.connectionProfilPic}></Image>
          <View style={styles.connectionDetails}>
            <View>
              <Text style={styles.connectionName}>Mike Ross</Text>
              <Text style={styles.connectionDate} >Connected - Today</Text>
            </View>
            <Ionicons size={20} color={colors.textPrimary} name="ellipsis-horizontal"></Ionicons>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer:{
    width:"100%",
    rowGap:15
  },
  headerContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderBottomColor:colors.borderLight,
    paddingVertical:10  
  },
  header:{
    color:colors.textPrimary,
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_L
  },
  searchContainer:{
    width:"auto",
    position:"relative"
  },
  searchInput:{
    borderWidth:1,
    borderColor:colors.border,
    minWidth:120,
    maxWidth:160,
    height:30,
    borderRadius:999,
    paddingLeft:25,
    paddingRight:10,
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_XXS
  },
  searchIcon:{
    position:"absolute",
    top:"50%",
    transform:[
      {translateY:"-50%"}
    ],
    left:10,
  },
  connection:{
    
    flexDirection:"row",
    alignItems:"center",
    columnGap:10
  },
  connectionProfilPic:{
    borderRadius:999,
  },
  connectionDetails:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  connectionName:{
    fontFamily:"Nunito-Bold",
    color:colors.textPrimary,
    fontSize:FONT_SIZE_M
  },
  connectionDate:{
    color:colors.textLight,
    fontFamily:"Nunito-SemiBold",
    fontSize:FONT_SIZE_S
  },
  connectionsContainer:{
    marginBottom:70,
    rowGap:15
  }
})
export default Connections;