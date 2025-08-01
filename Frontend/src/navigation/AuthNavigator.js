import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import YourDetailsScreen from "../screens/auth/YourDetailsScreen";
import SelectTagsScreen from "../screens/auth/SelectTagsScreen";
import AccountCreatedScreen from "../screens/auth/AccountCreatedScreen";
import { RegistrationProvider } from "../contexts/RegistrationContext";
import { useAuth } from "../contexts/AuthContext";
import EmailVerificationScreen from "../screens/auth/EmailVerificationScreen";
const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  const { isRegistrationCompleted } = useAuth();
  return (
    <RegistrationProvider>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        {isRegistrationCompleted ? (
          <AuthStack.Screen
            name="Register3"
            component={AccountCreatedScreen}
          ></AuthStack.Screen>
        ) : (
          <>
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="Register"
              component={RegisterScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="Register1"
              component={YourDetailsScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="Register2"
              component={SelectTagsScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="Register3"
              component={EmailVerificationScreen}
            ></AuthStack.Screen>
          </>
        )}
      </AuthStack.Navigator>
    </RegistrationProvider>
  );
}
export default AuthNavigator;
