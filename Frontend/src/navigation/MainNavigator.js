import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "../components/common/CustomTabBar";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import HomeScreen from "../screens/main/HomeScreen";
import MatchScreen from "../screens/MatchScreen";
import ProfileScreen from "../screens/main/Profile/ProfileScreen";
import ChatListScreen from "../screens/main/Chat/ChatListScreen";
import ChatScreen from "../screens/main/Chat/ChatScreen";
import ProfileAccountInformationScreen from "../screens/main/Profile/ProfileAccountInformationScreen";
import ProfileTagsScreen from "../screens/main/Profile/ProfileTagsScreen";
import ConnectionsScreen from "../screens/main/ConnectionScreen";
import { useModal } from "../contexts/ModalContext";
import Modal from "../components/modal/Modal";
import UserScreen from "../screens/main/UserScreen";
import Alert from "../components/alert/Alert";
import { useAlert } from "../contexts/AlertContext";
import { useUser } from "../contexts/UserContext";
import { useSocket } from "../contexts/SocketContext";
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
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
  const { alerts, closeAlert } = useAlert();
  const { user } = useUser();
  const { socket } = useSocket();
  const currentAlert = alerts.length > 0 ? alerts[0] : null;
  const navigation = useNavigation();
  useEffect(() => {
    const matchRevealed = (data) => {
      if (data && data.matchedUser) {
        navigation.navigate("MatchScreen", {
          type: "match",
          matchedUser: data.matchedUser,
        });
      }
    };
    const matchSkipped = () => {
      navigation.navigate("MatchScreen", {
        type: "nomatch",
      });
    };
    if (user && navigation && socket) {
      socket.on("match-reveal", matchRevealed);
      socket.on("match-skip", matchSkipped);
    }
    return () => {
      if (socket) {
        socket.off("match-reveal", matchRevealed);
        socket.off("match-skip", matchSkipped);
      }
    };
  }, [navigation, user, socket]);
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
        <RootStack.Screen name="Chat" component={ChatScreen}></RootStack.Screen>

        <RootStack.Screen name="UserScreen" component={UserScreen} />
        <RootStack.Screen
          name="ConnectionScreen"
          component={ConnectionsScreen}
        />
      </RootStack.Navigator>
      {modalState.visible && (
        <Modal
          type={modalState.name}
          user={
            modalState.name === "userModal" ? modalState.data.user : null
          }
          conversation={
            modalState.name === "chatModal"
              ? modalState.data.conversation
              : null
          }
          sort={modalState.name === "sortModal" ? modalState.data.sort : null}
          changeSort={
            modalState.name === "sortModal" ? modalState.data.changeSort : null
          }
          pollData={modalState.name === "pollModal" ? modalState.data : null}
          navigation={navigation}
          isOnUserScreen={
            modalState.name === "userModal" && modalState.data.isOnUserScreen
              ? modalState.data.isOnUserScreen
              : null
          }
        />
      )}
      {alerts.length > 0 && (
        <Alert
          state={currentAlert.state}
          message={currentAlert.message}
          _id={currentAlert._id}
          closeAlert={closeAlert}
        ></Alert>
      )}
    </>
  );
}

export default MainNavigator;
