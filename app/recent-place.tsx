import React, {  useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image,  ActivityIndicator,Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function RecentPlace() {
  const router = useRouter();

  // ⭐ 더미 데이터(백엔드 붙으면 여기만 교체하면 됨)
  const visitData = [
    { id: 1, name: "서울 강남 1호 거점", date: "2025-11-10", day: "월요일" },
    { id: 2, name: "서울 신촌역 거점", date: "2025-11-09", day: "일요일" },
    { id: 3, name: "부천 중동 거점", date: "2025-11-08", day: "토요일" },
  ];

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/footer/my")}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      <Text style={styles.title}>최근 방문 거점</Text>

      <ScrollView style={styles.listContainer}>
        {visitData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.dateText}>
              {item.date} · {item.day}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  dateText: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },
});