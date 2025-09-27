import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title}>로그인 페이지</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        placeholderTextColor="#999"
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#999"
        secureTextEntry
      />

      {/* 로그인 버튼 */}
      <Pressable
        style={styles.loginButton}
        onPress={() => router.replace("/footer/home")}
      >
        <Text style={styles.loginButtonText}>로그인 하기</Text>
      </Pressable>

      {/* 회원가입 영역 */}
      <View style={styles.signupContainer}>
        <Text style={styles.signuptitle}>아직 회원이 아니신가요?</Text>
        <Pressable
          style={styles.signupButton}>
          {/* onPress={() => router.push("/signup")} 나중에 signup 페이지 연결*/}
        
          <Text style={styles.signupButtonText}>회원가입 하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },

  title: { fontSize: 24, fontWeight: "700", marginBottom: 30, color: "#333" },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },

  loginButton: {
    width: "100%",
    backgroundColor: "#2e7dff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  signupContainer: { marginTop: 30, alignItems: "center" },
  signuptitle: { fontSize: 16, color: "#555", marginBottom: 10 },
  signupButton: {
    borderWidth: 1,
    borderColor: "#2e7dff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signupButtonText: { color: "#2e7dff", fontSize: 16, fontWeight: "600" },
});