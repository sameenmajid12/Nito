import ConnectionItem from "./ConnectionItem";
import { View } from "react-native";
function ConnectionList({screen, connections, navigation}){
  return(
    <View>
      {connections.map((connection, index)=>(
        <ConnectionItem key={index} connection={connection} navigation={navigation} screen={screen}/>
      ))}
    </View>
  )
}
export default ConnectionList;