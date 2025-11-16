import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Image,  ActivityIndicator,Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

/*export default function userinfo() {
const router = useRouter();

      return (
         <View style={styles.container}>
             <Pressable style={styles.backButton} onPress={() => router.push("/footer/my")}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>
            <Text style={styles.box}>개인정보수정페이지</Text>
         </View>
         );
         }
         




const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB", alignItems: "center", paddingTop: 80 },
     backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
    box: { fontSize: 22, fontWeight: "800", color: "#111827", marginTop: 8 },
    });*/


    export default function UserInfo() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // 유저 정보
  const [form, setForm] = useState({
    id: "",
    name: "",
    phone: "",
    gender: "",
    birth: "",
    address: "",
    type: "",
  });

  // 비밀번호 변경
  const [pw, setPw] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 1) 내 정보 불러오기
  const fetchUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) {
        Alert.alert("로그인 필요", "로그인 후 이용해주세요.");
        router.push("/login");
        return;
      }

      const res = await fetch("http://13.209.202.27:8080/api/auth/me", {
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) throw new Error("내 정보 조회 실패");

      const d = await res.json();

      setForm({
        id: d.id ?? "",
        name: d.name ?? "",
        phone: d.phone ?? "",
        gender: d.gender ?? "",
        birth: d.birth ?? "",
        address: d.address ?? "",
        type: d.type ?? "",
      });
    } catch (err) {
      console.log(err);
      Alert.alert("오류", "내 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 2) 정보 저장 실행
  const handleSave = async () => {
    const wantsPwChange =
      pw.currentPassword !== "" ||
      pw.newPassword !== "" ||
      pw.confirmPassword !== "";

    if (wantsPwChange) {
      if (pw.newPassword.length < 8) {
        return Alert.alert("비밀번호 오류", "새 비밀번호는 8자 이상이어야 합니다.");
      }
      if (pw.newPassword !== pw.confirmPassword) {
        return Alert.alert("비밀번호 불일치", "새 비밀번호가 일치하지 않습니다.");
      }
    }

    try {
      const token = await SecureStore.getItemAsync("accessToken");

      const res = await fetch("http://13.209.202.27:8080/api/auth/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          gender: form.gender,
          birth: form.birth,
          address: form.address,
          currentPassword: wantsPwChange ? pw.currentPassword : null,
          newPassword: wantsPwChange ? pw.newPassword : null,
          loginType: form.type,
        }),
      });

      if (!res.ok) throw new Error("수정 실패");

      Alert.alert("완료", "정보가 수정되었습니다.");
      router.push("/footer/my");
    } catch (err) {
      console.log(err);
      Alert.alert("오류", "정보 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#4B5563" />
        <Text style={{ marginTop: 10 }}>불러오는 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <View style={styles.container}>
        {/* 뒤로가기 */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/footer/my")}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.title}>개인정보 수정</Text>

        {/* 이름 */}
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
        />

        {/* 전화번호 */}
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
        />

        {/* 성별 */}
        <TextInput
          style={styles.input}
          placeholder="성별 (MALE / FEMALE)"
          value={form.gender}
          onChangeText={(t) => setForm({ ...form, gender: t })}
        />

        {/* 생년월일 */}
        <TextInput
          style={styles.input}
          placeholder="생년월일 (YYYY-MM-DD)"
          value={form.birth}
          onChangeText={(t) => setForm({ ...form, birth: t })}
        />

        {/* 주소 */}
        <TextInput
          style={styles.input}
          placeholder="주소"
          value={form.address}
          onChangeText={(t) => setForm({ ...form, address: t })}
        />

        <Text style={styles.sectionTitle}>비밀번호 변경 (선택)</Text>

        {/* 현재 비밀번호 */}
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="현재 비밀번호"
          value={pw.currentPassword}
          onChangeText={(t) => setPw({ ...pw, currentPassword: t })}
        />

        {/* 새 비밀번호 */}
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="새 비밀번호 (8자 이상)"
          value={pw.newPassword}
          onChangeText={(t) => setPw({ ...pw, newPassword: t })}
        />

        {/* 비밀번호 확인 */}
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="새 비밀번호 확인"
          value={pw.confirmPassword}
          onChangeText={(t) => setPw({ ...pw, confirmPassword: t })}
        />

        {/* 저장 버튼 */}
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
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
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  saveButton: {
    backgroundColor: "#111827",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});