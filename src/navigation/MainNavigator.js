import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import ChatListScreen from "../screens/main/ChatListScreen";
import ChatScreen from "../screens/main/ChatScreen";

const MainStack = createNativeStackNavigator();

function MainNavigation(){
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen}></MainStack.Screen>
      <MainStack.Screen name="Profile" component={ProfileScreen}></MainStack.Screen>
      <MainStack.Screen name="ChatList" component={ChatListScreen}></MainStack.Screen>
      <MainStack.Screen name="Chat" component={ChatScreen}></MainStack.Screen>

    </MainStack.Navigator>
  )
}
export default MainNavigation;
