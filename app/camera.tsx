//import { View, StyleSheet, Text, Pressable } from "react-native";
//import { useRouter } from "expo-router";
//import { useState, useEffect } from "react";
//import { CameraView, useCameraPermissions } from "expo-camera";
//import { Ionicons } from "@expo/vector-icons"; 

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Vibration } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  // ✅ 카메라 권한 요청
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <Text>카메라 권한 요청 중...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다.</Text>
      </View>
    );
  }

 
  const handleBarcodeScanned = (result) => {
  if (scanned) return;
  setScanned(true);

  // QR 데이터 안전 추출
  const data =
    result?.data ??
    result?.rawValue ??
    result?.barcodes?.[0]?.rawValue ??
    "";

  if (!data) {
    console.warn("QR 데이터 없음:", result);
    return;
  }

  console.log("QR 인식됨:", data);
  Alert.alert("QR 코드 인식 완료", `인식된 값: ${data}`);
};

  return (
    <View style={styles.container}>
      {/* ← 뒤로가기 버튼 */}
      <Pressable style={styles.backButton} onPress={() => router.push("/footer/points")}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      <Text style={styles.title}>QR 코드 인식</Text>

      <View style={styles.cameraWrapper}>
        {/* ✅ QR 인식 활성화 */}
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      </View>

      <Text style={styles.guideText}>QR 코드를 박스 안에 맞춰주세요</Text>
       
       <Pressable style={styles.nextButton} onPress={() => router.push("/pointval")}>
        <Text style={styles.nextText}>다음 단계</Text>
      </Pressable>

      {/* 다시 스캔 버튼 (테스트용) */}
      {scanned && (
        <Pressable
          style={[styles.nextButton, { marginTop: 30, backgroundColor: "#555" }]}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.nextText}>다시 스캔</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 150 },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  cameraWrapper: {
    width: "90%",
    height: 500,
    borderWidth: 2,
    borderColor: "#2e7dff",
    borderRadius: 12,
    overflow: "hidden",
  },
  camera: { flex: 1 },
  guideText: { marginTop: 20, fontSize: 16, color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  nextButton: {
    marginTop: 30,
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});



/*export default function CameraScreen() {

    const router = useRouter();

  return (
    <View style={styles.container}>

    <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      <Text style={styles.title}>QR 코드 인식</Text>

    
      <View style={styles.cameraWrapper}>
     
        <View style={styles.fakeCamera}>
          <Text style={styles.fakeText}>📷 여기는 카메라 영역입니다</Text>
        </View>
      </View>

      <Text style={styles.guideText}>QR 코드를 박스 안에 맞춰주세요</Text>

       <Pressable style={styles.nextButton} onPress={() => router.push("/pointval")}>
        <Text style={styles.nextText}>다음 단계</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 150 },
  backButton: {
    position: "absolute",
    top: 50,        // 상태바 아래에 살짝 여유
    left: 20,       // 화면 왼쪽 여백
    zIndex: 10,     // 카메라 위에 보이게
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  cameraWrapper: {
    width: "90%",     // 좌우 여백 약 20씩
    height: 500,      // 높이 400
    borderWidth: 2,
    borderColor: "#2e7dff",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  fakeCamera: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  fakeText: { fontSize: 16, color: "#555" },
  guideText: { marginTop: 20, fontSize: 16, color: "#555" },
   nextButton: {
    marginTop: 30,
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});*/

/*export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <Text>카메라 권한 요청 중...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>카메라 권한이 필요합니다.</Text>
      </View>
    );
  }

   

  return (
    <View style={styles.container}>

        <Pressable style={styles.backButton} onPress={() => router.push("/footer/points")}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>

      <Text style={styles.title}>QR 코드 인식</Text>

      <View style={styles.cameraWrapper}>
  
        <CameraView
          style={styles.camera}
          facing="back" 
        />
      </View>

      <Text style={styles.guideText}>QR 코드를 박스 안에 맞춰주세요</Text>

      <Pressable style={styles.nextButton} onPress={() => router.push("/pointval")}>
        <Text style={styles.nextText}>다음 단계</Text>
      </Pressable>
    </View>
  );
}
  

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 150 },
  backButton: {
    position: "absolute",
    top: 50,        
    left: 20,      
    zIndex: 10,     
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  cameraWrapper: {
    width: "90%",
    height: 500,
    borderWidth: 2,
    borderColor: "#2e7dff",
    borderRadius: 12,
    overflow: "hidden",
  },
  camera: { flex: 1 },
  guideText: { marginTop: 20, fontSize: 16, color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  nextButton: {
    marginTop: 30,
    backgroundColor: "#2e7dff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});*/

