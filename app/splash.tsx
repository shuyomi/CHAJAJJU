import { useEffect } from "react";
import { Image, ImageBackground,View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";


export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: 로그인 여부 체크 로직
      const isLoggedIn = false; // 나중에 AsyncStorage나 API 연동으로 교체

      if (isLoggedIn) {
        router.replace("/footer/home"); // 로그인 되어 있으면 홈으로
      } else {
        router.replace("/login"); // 아니면 로그인 페이지로
      }
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timer);
  }, []);

  return (

     <ImageBackground
    source={require("../assets/images/Splash6.png")}
    style={styles.background}
    resizeMode="cover"
  >

    <View style={styles.container}>
     <Image
        source={require("../assets/images/splashtext2.png")}
        style={styles.logo}
      />
    </View> 
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "800", color: "#2e7dff", marginBottom: 20 },
  
  logo: {
    width: 350,    // 🔥 너가 원하는 가로 크기
    height: 280,    // 🔥 너가 원하는 세로 크기
    resizeMode: "contain", // 비율 깨짐 방지
    bottom: 320,
  },
});