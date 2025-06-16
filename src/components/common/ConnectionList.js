import ConnectionItem from "./ConnectionItem";
import { View } from "react-native";
function ConnectionList({gap, connections}){
  return(
    <View style={{rowGap:gap}}>
      {connections.map((connection)=>(
        <ConnectionItem connection={connection}/>
      ))}
    </View>
  )
}
export default ConnectionList;