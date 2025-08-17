import "react-native-get-random-values";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";
import { ModalProvider } from "./src/contexts/ModalContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import { SocketProvider } from "./src/contexts/SocketContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AlertProvider } from "./src/contexts/AlertContext";
import { PollProvider } from "./src/contexts/PollContext";
import { NotificationProvider } from "./src/contexts/NotificationContext";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./src/assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-SemiBold": require("./src/assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AlertProvider>
          <AuthProvider>
            <UserProvider>
              <NotificationProvider>
                <SocketProvider>
                  <ModalProvider>
                    <PollProvider>
                      <AppNavigator />
                    </PollProvider>
                  </ModalProvider>
                </SocketProvider>
              </NotificationProvider>
            </UserProvider>
          </AuthProvider>
        </AlertProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
