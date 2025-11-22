import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function Contents() {
  const items = [
    { name: "투명페트병", weightRate: 180 },
    { name: "플라스틱", weightRate: 150 },
    { name: "알루미늄 캔", weightRate: 200 },
    { name: "철 캔", weightRate: 200 },
    { name: "비닐", weightRate: 120 },
    { name: "종이팩", weightRate: 100 },
    { name: "신문", weightRate: 100 },
    { name: "의류", weightRate: 150 },
    { name: "소주병", weightRate: 50 },
    { name: "맥주병", weightRate: 50 },
    { name: "기타병", weightRate: 50 },
  ];

  const BASIC_POINT = 700;

  const [selected, setSelected] = useState<{
    [key: string]: { checked: boolean; kg: number };
  }>(
    items.reduce((acc, item) => {
      acc[item.name] = { checked: false, kg: 0 };
      return acc;
    }, {} as { [key: string]: { checked: boolean; kg: number } })
  );

  // ⭐ 총 포인트 계산
  const totalPoints = items.reduce((sum, item) => {
    const { checked, kg } = selected[item.name];
    if (!checked || kg <= 0) return sum;
    return sum + (BASIC_POINT + kg * item.weightRate);
  }, 0);

  // ⭐ kg 조정 함수 (0.1 단위)
  const updateKg = (name: string, diff: number) => {
    setSelected((prev) => {
      const newKg = Math.min(5, Math.max(0, prev[name].kg + diff));
      return { ...prev, [name]: { ...prev[name], kg: newKg } };
    });
  };

  const handleReset = () => {
    setSelected(
      items.reduce((acc, item) => {
        acc[item.name] = { checked: false, kg: 0 };
        return acc;
      }, {} as { [key: string]: { checked: boolean; kg: number } })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>품목별 선택</Text>

      <ScrollView style={styles.scrollBox} nestedScrollEnabled>
        {items.map((item) => (
          <View key={item.name} style={styles.row}>
            <Checkbox
              value={selected[item.name].checked}
              onValueChange={(newValue) =>
                setSelected((prev) => ({
                  ...prev,
                  [item.name]: { ...prev[item.name], checked: newValue },
                }))
              }
              style={styles.checkbox}
            />

            <Text style={styles.label}>{item.name}</Text>

            {/* ⭐ 0.1kg 스텝퍼 */}
            <View style={styles.kgBox}>
              <Pressable onPress={() => updateKg(item.name, -0.1)}>
                <Text style={styles.kgBtn}>-</Text>
              </Pressable>

              <Text style={styles.kgText}>
                {selected[item.name].kg.toFixed(1)} kg
              </Text>

              <Pressable onPress={() => updateKg(item.name, +0.1)}>
                <Text style={styles.kgBtn}>+</Text>
              </Pressable>
            </View>

            <Text style={styles.points}>
              {selected[item.name].checked
                ? `+${BASIC_POINT + selected[item.name].kg * item.weightRate}P`
                : ""}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.total}>총 적립 포인트: {totalPoints} P</Text>

      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>다시 계산하기 🔄</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, left: 20 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  scrollBox: { maxHeight: 500 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },

  checkbox: { marginRight: 8 },
  label: { fontSize: 16, flex: 1 },

  // ⭐ 0.1kg 스텝퍼 스타일
  kgBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 36,

  },

  kgBtn: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 10,
    color: "#2e7dff",
  },

  kgText: {
    width: 70,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  points: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2e7dff",
    minWidth: 70,
    textAlign: "right",
     marginRight: 55,
  },

  total: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    color: "#2e7dff",
    
  },

  resetButton: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    marginRight: 30,
  },

  resetText: { fontSize: 16, fontWeight: "600", color: "#000" },
});