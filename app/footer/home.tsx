import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, TextInput, TouchableOpacity,  Modal, } from "react-native";
import { WebView } from "react-native-webview";
import type { WebView as WebViewType } from "react-native-webview";
import { MaterialCommunityIcons, Feather, MaterialIcons } from "@expo/vector-icons";


const KAKAO_APP_KEY = "f143a20f2be877dcef35366b593462b0";
const BACKEND_URL = "http://13.209.202.27:8080/map/main";

export default function HomeScreen() {
  const webViewRef = useRef<WebViewType>(null);
  const [searchText, setSearchText] = useState("");
  const [guideVisible, setGuideVisible] = useState(false);

   const kakaoMapHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false"></script>
      <style>
        html, body, #map { width:100%; height:100%; margin:0; padding:0; }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script>
        kakao.maps.load(async function() {
          console.log("카카오 맵 로드됨");

          const container = document.getElementById("map");
          const map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(37.4409248, 127.1356668),
            level: 5
          });

          let currentInfoWindow = null;
          let markerList = []; // 🔥 저장된 마커 목록

          async function loadMarkers() {
            console.log("백엔드에서 데이터 로딩 시작");
            const res = await fetch("${BACKEND_URL}");
            const data = await res.json();
            console.log("불러온 데이터:", data);

            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            data.forEach((pos) => {
              const markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(24, 35));
              const marker = new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(pos.latitude, pos.longitude),
                title: pos.name,
                image: markerImage,
              });

              markerList.push({ name: pos.name, marker, lat: pos.latitude, lng: pos.longitude });

              const content = \`
                <div style="padding:8px;font-size:13px;max-width:220px;">
                  <b>\${pos.name}</b><br>
                  주소: \${pos.lotAddress ?? "-"}<br>
                  연락처: \${pos.tel ?? "-"}<br>
                  설명: \${pos.description ?? "-"}<br>
                </div>\`;

              const infowindow = new kakao.maps.InfoWindow({ content });

              kakao.maps.event.addListener(marker, "click", () => {
                if (currentInfoWindow) currentInfoWindow.close();
                infowindow.open(map, marker);
                currentInfoWindow = infowindow;
              });
            });

            console.log("총 마커 개수:", markerList.length);
          }

          await loadMarkers();

          kakao.maps.event.addListener(map, "click", () => {
            if (currentInfoWindow) {
              currentInfoWindow.close();
              currentInfoWindow = null;
            }
          });

          // 🔥 React Native → 검색어 전달
          document.addEventListener("message", function(e) {
            const keyword = e.data.trim();
            console.log("RN에서 받은 검색어:", keyword);

            if (!keyword) return;

            const found = markerList.find(m =>
              m.name.replace(/\s+/g, "").includes(keyword.replace(/\s+/g, ""))
            );

            if (found) {
              console.log("검색 성공! 이동 →", found);

              const moveLatLng = new kakao.maps.LatLng(found.lat, found.lng);

              // 지도 중심 이동
              map.setCenter(moveLatLng);
              map.setLevel(3);


              // 🔥 기존 마커 클릭 유지됨! (검색 마커 생성 X)
              if (currentInfoWindow) {
                currentInfoWindow.close();
                currentInfoWindow = null;
              }

            } else {
              console.log("검색 실패: 결과 없음");
              alert("검색 결과가 없습니다.");
            }
          });


        });
      </script>

    </body>
  </html>
  `;

  const handleSearchSubmit = () => {
    if (webViewRef.current && searchText.trim()) {
      webViewRef.current.postMessage(searchText);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>CHAJAJJU</Text>
      </View>

      <View style={styles.mapWrapper}>
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html: kakaoMapHTML }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={(event) => {
            console.log("WebView에서 메시지:", event.nativeEvent.data);
          }}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator size="large" color="#2cd543" />
          )}
        />

          <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="거점 이름으로 검색하세요"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>

        {/* ❔ FAB 버튼 */}
        <View style={styles.fab}>
          <TouchableOpacity onPress={() => setGuideVisible(true)} style={styles.fabButton}>
            <Text style={{ fontSize: 22, color: "#fff" }}>❔</Text>
          </TouchableOpacity>
        </View>

        {/* 📘 이용 가이드 모달 */}
        <Modal
          visible={guideVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setGuideVisible(false)}
        >
          <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>CHAJAJJU 이용 가이드{"\n"}</Text>

          <View style={styles.guideRow}>
         
            <Text style={styles.guideText}>가까운 <Text style={styles.bold}>재활용 거점</Text>을 확인하세요{"\n"}</Text>
          </View>

          <View style={styles.guideRow}>
            
            <Text style={styles.guideText}>검색창에 ‘거점 이름’을 입력하면 바로 이동돼요{"\n"}</Text>
          </View>

          <View style={styles.guideRow}>
           
            <Text style={styles.guideText}>마커를 눌러 상세 주소와 연락처를 확인하세요{"\n"}</Text>
          </View>

                <View style={styles.guideRow}>
           
            <Text style={styles.guideText}>현장에서 QR을 스캔해 <Text style={styles.bold}>포인트를 즉시 적립</Text>하세요{"\n"}</Text>
          </View>

          <View style={styles.guideRow}>
            
            <Text style={styles.guideText}>예상 무게 입력 시 포인트를 <Text style={styles.bold}>미리 확인</Text>할 수 있어요.{"\n"}</Text>
          </View>

          <View style={styles.guideRow}>
           
            <Text style={styles.guideText}>모은 포인트로 쓰레기봉투 등 <Text style={styles.bold}> 보상 교환</Text>할 수 있어요{"\n"}</Text>
          </View>


          <TouchableOpacity onPress={() => setGuideVisible(false)} style={styles.closeBtn}>
            <Text >닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#2cd5431b",
    marginTop: 30,
  },

  serviceTitle: { fontSize: 20, fontWeight: "800", color: "#2cd5439e" },

  mapWrapper: {
    flex: 1,
    position: "relative",
    margin: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2cd5431b",
  },

  searchBoxWrapper: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: { fontSize: 15, color: "#333" },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
  },

  fabButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#2cd543",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  modalText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  
  },

  closeBtn: {
    backgroundColor: "#2cd543",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  guideRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},

icon: {
  marginRight: 10,
},

guideText: {
  fontSize: 15,
  color: "#333",
  lineHeight: 22,
},

bold: {
  fontWeight: "600",
  color: "#2E7D32",
},
});