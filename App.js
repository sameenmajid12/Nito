import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View,Image, TextInput } from 'react-native';
import colors from './src/styles/colors';
import { useFonts } from 'expo-font';
export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
  });
    if (!fontsLoaded) {
    return null; 
  }
  return (
    <View style={styles.container}>
      <Image  style={{ width: 150, height:64.5 }} source={require('./assets/images/logo.png')}></Image>
      <Text style={{fontFamily:"Nunito-SemiBold", color:colors.black50, fontSize:20}}>Chat freely. Chat anonymously</Text>
      <Pressable style={{width:"70%",height:45,borderRadius:10, backgroundColor:colors.primary, justifyContent:"center", alignItems:"center", shadowColor:"black", shadowOpacity:"0.25", shadowOffset:{ width:0, height:4}, shadowRadius:8}}><Text style={{color:"white", fontFamily:"Nunito-SemiBold"}}>Login</Text></Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
