import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/common/CustomTabBar";
import { useNavigationState } from "@react-navigation/native";
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import ChatListScreen from "../screens/main/ChatListScreen";
import Header from "../components/common/Header";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../styles";
import ChatScreen from "../screens/main/ChatScreen";

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
      <ChatStack.Screen name="ChatList" component={ChatListScreen} />
      <ChatStack.Screen name="Chat" component={ChatScreen}></ChatStack.Screen>
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

  const routeState = useNavigationState(state => state);
  const getActiveRouteName = (state) => {
    if (!state || !state.routes || state.routes.length === 0) {
      return null;
    }

    const route = state.routes[state.index];

    if (route.state) {
      return getActiveRouteName(route.state);
    }

    return route.name;
  };
  const currentRouteName = getActiveRouteName(routeState);
  const hideComponents = currentRouteName === "Chat";


  return (
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} visible={!hideComponents}/>}
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
          options={{ tabBarLabel: "ChatList" }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackScreen}
          options={{ tabBarLabel: "Profile" }}
        />
      </Tab.Navigator>
  );
}

export default MainNavigator;
