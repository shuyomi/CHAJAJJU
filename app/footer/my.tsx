import { View, Text, StyleSheet, Image } from "react-native";

export default function MyScreen() {
  return (
    <View style={styles.container}>
     {/* <Image source={require("../assets/images/logo.png")} style={{ width: 64, height: 64, borderRadius: 16 }} />*/}
      <Text style={styles.name}>슈퍼스타</Text>
      <Text style={styles.meta}>포인트: 2,340P</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  name: { fontSize: 20, fontWeight: "800" },
  meta: { color: "#666" },
});