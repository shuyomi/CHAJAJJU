import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function userpoint () {
 const router = useRouter();

const pointHistory = [
    { id: 1, date: "2025-09-27", place: "강남역 거점", item: "플라스틱", points: 50 },
    { id: 2, date: "2025-09-25", place: "홍대입구 거점", item: "캔", points: 30 },
    { id: 3, date: "2025-09-20", place: "잠실 거점", item: "종이", points: 20 },
  ];

return ( 
  <View style={styles.container}>
           <Pressable style={styles.button} onPress={() => router.push("/camera")}>
             <Ionicons name="camera" size={20} color="#fff" />
             <Text style={styles.text}>포인트 적립하기</Text>
           </Pressable>

           <Text style={styles.historyTitle}>
            <FontAwesome5 name="history" size={24} color="black" /> 포인트 적립 이력</Text>
                 <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
                   {pointHistory.map((history) => (
                     <View key={history.id} style={styles.historyCard}>
                       <Text style={styles.historyDate}>{history.date}</Text>
                       <Text style={styles.historyPlace}>{history.place}</Text>
                       <Text style={styles.historyItem}>품목: {history.item}</Text>
                       <Text style={styles.historyPoints}>+{history.points} P</Text>
                     </View>
                   ))}
                 </ScrollView>
                 </View>
 

       );
}
const styles = StyleSheet.create({
 container: { flex: 1, padding: 5, gap: 20, backgroundColor: "#fff"},
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    padding: 20,
    bottom: 10,
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },

  historyTitle: { fontSize: 18, fontWeight: "700" },
  scroll: { flex: 1 },
  historyCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  historyDate: { fontSize: 14, color: "#666" },
  historyPlace: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  historyItem: { fontSize: 14, marginTop: 2 },
  historyPoints: { fontSize: 16, fontWeight: "bold", color: "#2e7dff", marginTop: 4 },
});
