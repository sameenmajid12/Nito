import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/common/CustomTabBar";

import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import ChatScreen from "../screens/main/ChatScreen";
import Header from "../components/common/Header";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../styles";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header/>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="ChatTab"
          component={ChatStackScreen}
          options={{ tabBarLabel: "Chat" }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackScreen}
          options={{ tabBarLabel: "Profile" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea:{
    flex:1, 
    backgroundColor:colors.background
  }
})
export default MainNavigator;
