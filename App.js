import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginScreen} from './src/screens/auth/LoginScreen';
import { useFonts } from 'expo-font';
import AuthNavigator from './src/navigation/AuthNavigator';
export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('./src/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Medium': require('./src/assets/fonts/Nunito-Medium.ttf'),
  });
    if (!fontsLoaded) {
    return null; 
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}


