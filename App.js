import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";
import { ModalProvider } from "./src/contexts/ModalContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import { useAuth } from "./src/contexts/AuthContext";
import { useUser } from "./src/contexts/UserContext";
import LoadingScreen from "./src/screens/LoadingScreen";
import AppNavigator from "./src/navigation/AppNavigator";
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
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            <AppNavigator />
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
