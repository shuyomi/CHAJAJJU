import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function PointResult() {
  const router = useRouter();
  const { place, item, earned, total } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>포인트 적립 완료 🎉</Text>

      <View style={styles.card}>
        <Text style={styles.text}>🏠 거점: {place}</Text>
        <Text style={styles.text}>♻️ 품목: {item}</Text>
        <Text style={styles.text}>💰 적립 포인트: +{earned} P</Text>
        <Text style={[styles.text, styles.total]}>✨ 나의 총 포인트: {total} P</Text>
      </View>

      <Pressable style={styles.homeButton} onPress={() => router.push("/footer/points")}>
        <Text style={styles.homeText}>포인트 이력으로 돌아가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  card: {
    width: "85%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: { fontSize: 18, marginBottom: 10 },
  total: { fontWeight: "bold", color: "#2e7dff" },
  homeButton: {
    marginTop: 40,
    backgroundColor: "#2e7dff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  homeText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});