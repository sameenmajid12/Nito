import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/common/CustomTabBar";
import { useNavigationState } from "@react-navigation/native";
import HomeScreen from "../screens/main/HomeScreen";
import MatchScreen from "../screens/match/MatchScreen";
import ProfileScreen from "../screens/main/Profile/ProfileScreen";
import ChatListScreen from "../screens/main/Chat/ChatListScreen";
import ChatScreen from "../screens/main/Chat/ChatScreen";
import ProfileAccountInformationScreen from "../screens/main/Profile/ProfileAccountInformationScreen";
import ProfileTagsScreen from "../screens/main/Profile/ProfileTagsScreen";
import ConnectionsScreen from "../screens/main/ConnectionScreen";
import { useModal } from "../contexts/ModalContext";
import Modal from "../components/modal/Modal";
import UserScreen from "../screens/main/UserScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Revert this back to your actual HomeScreen for normal operation */}
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Chat" component={ChatScreen}></HomeStack.Screen>
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
    </ProfileStack.Navigator>
  );
}

function TabNavigator() {
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
  const shouldHideTabBar =
    currentRouteName === "Chat" ||
    currentRouteName === "ConnectionScreen" ||
    currentRouteName === "AccountInformation" ||
    currentRouteName === "TagsSelect";

  useEffect(() => {
    Animated.timing(tabBarOpacity, {
      toValue: shouldHideTabBar ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [shouldHideTabBar, tabBarOpacity]);

  return (
    <>
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
    </>
  );
}

function MainNavigator() {
  const { modalState } = useModal();
  return (
    <>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
        <RootStack.Screen
          name="MatchScreen"
          component={MatchScreen}
          options={{
            animation: "fade",
            headerShown: false,
            animationDuration: 250,
          }}
        />
        <RootStack.Screen name="UserScreen" component={UserScreen} />
        <ProfileStack.Screen
          name="ConnectionScreen"
          component={ConnectionsScreen}
        />
      </RootStack.Navigator>
      {modalState.visible && (
        <Modal
          type={modalState.name}
          user={modalState.name === "userModal" ? modalState.data : null}
          conversation={
            modalState.name === "chatModal" ? modalState.data : null
          }
          sort={modalState.name === "sortModal" ? modalState.data.sort : null}
          changeSort={
            modalState.name === "sortModal" ? modalState.data.changeSort : null
          }
          pollData={modalState.name === "pollModal" ? modalState.data : null}
        />
      )}
    </>
  );
}

export default MainNavigator;
