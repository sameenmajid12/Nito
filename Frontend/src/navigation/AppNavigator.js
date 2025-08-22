import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import LoadingScreen from "../screens/LoadingScreen";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

function AppNavigator(){
  const {isLoadingAuth, isAuthenticated} = useAuth();
  const {isLoadingUser, user} = useUser();
  
  if(isLoadingAuth || isLoadingUser){
    return <LoadingScreen></LoadingScreen>
  };
  if(!isAuthenticated || !user){
    return <AuthNavigator/>
  }
  return <MainNavigator/>
}
export default AppNavigator;