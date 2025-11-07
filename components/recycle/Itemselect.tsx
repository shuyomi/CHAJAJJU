import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function Contents() {
  const items = [
    { name: "투명페트병", rate: 10 },
    { name: "플라스틱", rate: 10 },
    { name: "알루미늄 캔", rate: 20 },
    { name: "철 캔", rate: 20 },
    { name: "비닐", rate: 5 },
    { name: "종이팩", rate: 5 },
    { name: "신문", rate: 5 },
    { name: "의류", rate: 15 },
    { name: "소주병", rate: 10 },
    { name: "맥주병", rate: 10 },
    { name: "기타병", rate: 5 },
  ];

  const [selected, setSelected] = useState<{ [key: string]: { checked: boolean; qty: number } }>(
    items.reduce((acc, item) => {
      acc[item.name] = { checked: false, qty: 0 };
      return acc;
    }, {} as { [key: string]: { checked: boolean; qty: number } })
  );

  const totalPoints = items.reduce((sum, item) => {
    const { checked, qty } = selected[item.name];
    return checked ? sum + qty * item.rate : sum;
  }, 0);

  const handleReset = () => {
    setSelected(
      items.reduce((acc, item) => {
        acc[item.name] = { checked: false, qty: 1 };
        return acc;
      }, {} as { [key: string]: { checked: boolean; qty: number } })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>품목별 선택</Text>

      {/* ✅ 품목 리스트만 스크롤 가능하게 변경 */}
      <ScrollView style={styles.scrollBox} nestedScrollEnabled>
        {items.map((item) => (
          <View key={item.name} style={styles.row}>
            {/* 체크박스 */}
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

            {/* 품목명 */}
            <Text style={styles.label}>{item.name}</Text>

            {/* 개수 선택 */}
            <View style={styles.qtyBox}>
              <Pressable
                onPress={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [item.name]: {
                      ...prev[item.name],
                      qty: Math.max(1, prev[item.name].qty - 1),
                    },
                  }))
                }
              >
                <Text style={styles.qtyBtn}>-</Text>
              </Pressable>

              <TextInput
                style={styles.qtyInput}
                keyboardType="numeric"
                value={String(selected[item.name].qty)}
                onChangeText={(text) => {
                  const num = parseInt(text) || 1;
                  setSelected((prev) => ({
                    ...prev,
                    [item.name]: { ...prev[item.name], qty: Math.max(1, num) },
                  }));
                }}
              />

              <Pressable
                onPress={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [item.name]: {
                      ...prev[item.name],
                      qty: Math.min(99, prev[item.name].qty + 1),
                    },
                  }))
                }
              >
                <Text style={styles.qtyBtn}>+</Text>
              </Pressable>
            </View>

            {/* 포인트 */}
            <Text style={styles.points}>
              {selected[item.name].checked ? `+${selected[item.name].qty * item.rate}P` : ""}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* 총합 표시 */}
      <Text style={styles.total}>총 적립 포인트: {totalPoints} P</Text>
     
       {/* ✅ 다시 계산 버튼 */}
      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>다시 계산하기 🔄</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { marginBottom: 20, left: 20 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  scrollBox: {
    maxHeight: 500, // ✅ 이 높이까지만 스크롤되게 설정 (원하는 만큼 조정 가능)
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },
  checkbox: { marginRight: 8 },
  label: { fontSize: 16, flex: 1 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginRight: 8,
  },
  points: { fontSize: 14, fontWeight: "600", color: "#2e7dff", minWidth: 70, marginRight:10 },
  total: { fontSize: 20, fontWeight: "700", marginTop: 20, color: "#2e7dff" },
  qtyBox: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  paddingHorizontal: 6,
  marginRight: 20,
},
qtyBtn: {
  fontSize: 18,
  fontWeight: "600",
  paddingHorizontal: 8,
  color: "#2e7dff",
},
qtyInput: {
  width: 30,
  textAlign: "center",
  fontSize: 16,
  paddingVertical: 4,
},
resetButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    borderWidth: 1, // ✅ 테두리 추가
  borderColor: "#000000ff", // ✅ 파란색 포인트 컬러
    alignItems: "center",
    marginRight:30, 
  },
  resetText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
  },
});