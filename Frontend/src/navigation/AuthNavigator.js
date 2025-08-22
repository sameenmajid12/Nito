import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import YourDetailsScreen from "../screens/auth/YourDetailsScreen";
import SelectTagsScreen from "../screens/auth/SelectTagsScreen";
import AccountCreatedScreen from "../screens/auth/AccountCreatedScreen";
import { RegistrationProvider } from "../contexts/RegistrationContext";
import { useAuth } from "../contexts/AuthContext";
import EmailVerificationScreen from "../screens/auth/EmailVerificationScreen";
import ForgetPasswordEmailScreen from "../screens/auth/ForgetPassword/ForgetPasswordEmailScreen";
import ForgetPasswordVerificationScreen from "../screens/auth/ForgetPassword/ForgetPasswordVerificationScreen";
import ForgetPasswordUpdateScreen from "../screens/auth/ForgetPassword/ForgetPasswordUpdateScreen";
import { useAlert } from "../contexts/AlertContext";
import Alert from "../components/alert/Alert";
const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  const { isRegistrationCompleted } = useAuth();
  const { alerts, closeAlert } = useAlert();
  const currentAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <RegistrationProvider>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, animation: "none", gestureEnabled: false }}
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
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgetPasswordEmailScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="ForgotPassword1"
              component={ForgetPasswordVerificationScreen}
            ></AuthStack.Screen>
            <AuthStack.Screen
              name="ForgotPassword2"
              component={ForgetPasswordUpdateScreen}
            ></AuthStack.Screen>
          </>
        )}
      </AuthStack.Navigator>
      {alerts.length > 0 && (
        <Alert
          state={currentAlert.state}
          message={currentAlert.message}
          _id={currentAlert._id}
          closeAlert={closeAlert}
        ></Alert>
      )}
    </RegistrationProvider>
  );
}
export default AuthNavigator;
