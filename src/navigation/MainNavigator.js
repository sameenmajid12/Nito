import React, { useRef, useEffect } from "react"; // Import useRef and useEffect
import { Animated } from "react-native"; // Import Animated
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/common/CustomTabBar";
import { useNavigationState } from "@react-navigation/native";
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/Profile/ProfileScreen";
import ChatListScreen from "../screens/main/Chat/ChatListScreen";
import Header from "../components/common/Header";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../styles";
import ChatScreen from "../screens/main/Chat/ChatScreen";
import ProfileAccountInformationScreen from "../screens/main/Profile/ProfileAccountInformationScreen";
import ProfileTagsScreen from "../screens/main/Profile/ProfileTagsScreen";
import ConnectionsScreen from "../screens/main/ConnectionScreen";
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ConnectionScreen" component={ConnectionsScreen} />
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
      <ProfileStack.Screen
        name="AccountInformation"
        component={ProfileAccountInformationScreen}
      />
      <ProfileStack.Screen name="TagsSelect" component={ProfileTagsScreen} />
      <ProfileStack.Screen
        name="ConnectionScreen"
        component={ConnectionsScreen}
      />
    </ProfileStack.Navigator>
  );
}

function MainNavigator() {
  const routeState = useNavigationState((state) => state);

  const tabBarOpacity = useRef(new Animated.Value(1)).current;

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
  const shouldHideTabBar = currentRouteName === "Chat";

  useEffect(() => {
    if (shouldHideTabBar) {
      tabBarOpacity.setValue(0);
    } else {
      Animated.timing(tabBarOpacity, {
        toValue: shouldHideTabBar ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldHideTabBar]);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} opacity={tabBarOpacity} />}
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
  );
}

export default MainNavigator;
