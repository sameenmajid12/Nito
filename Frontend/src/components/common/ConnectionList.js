import ConnectionItem from "./ConnectionItem";
import { View } from "react-native";
function ConnectionList({gap, connections, navigation}){
  return(
    <View style={{rowGap:gap}}>
      {connections.map((connection, index)=>(
        <ConnectionItem key={index} connection={connection} navigation={navigation}/>
      ))}
    </View>
  )
}
export default ConnectionList;