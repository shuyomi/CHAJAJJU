import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function userpoint () {
return ( 
  
      <View>
        <Text style={styles.username}>슈슈슈님 포인트</Text>
        <Text style={styles.points}> 
            <MaterialCommunityIcons name="star-four-points" size={20} color="#0c0c0cff" /> 300 P</Text>
      </View>


       );
}
const styles = StyleSheet.create({
 

  username: { fontSize: 20, fontWeight: "700", marginLeft:10 },
  points: { fontSize: 24, fontWeight: "bold", color: "#2cd5439e", padding: 5, marginLeft:10 },

  });