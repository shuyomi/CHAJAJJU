import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RewardBanner from "./RewardBanner";
import * as Linking from "expo-linking";
import Rewardimage from "../assets/images/Reward.png";
import Rewardimage2 from "../assets/images/Reward2.png";
import Rewardimage3 from "../assets/images/Reward3.png";
import Rewardimage4 from "../assets/images/Reward4.png";




export default function reward() {
  const router = useRouter();

  const items = [
    { id: 1, title: "일반쓰레기 5L", point: 2000, img: Rewardimage },
    { id: 2, title: "일반쓰레기 10L", point: 3500, img: Rewardimage },
    { id: 3, title: "음식물쓰레기 3L", point: 1400, img: Rewardimage3 },
    { id: 4, title: "음식물쓰레기 5L", point: 2300, img: Rewardimage2 },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // scale animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSelect = (item) => {
    setSelectedItem(item);

    // 카드 scale 효과
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleExchange = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    router.push("/footer/my"); // 포인트 이력 페이지 이동
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <View style={styles.container}>
        {/* 뒤로가기 */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/footer/my")}
        >
          <Ionicons name="arrow-back" size={30} color="#000" />
        </Pressable>

        <RewardBanner />

        {/* 기부하기 카드 */}
        <Pressable
          style={styles.donateCard}
          onPress={() =>
            Linking.openURL(
              "https://www.animals.or.kr/support/intro"
            )
          }
        >
          <Image source={Rewardimage4} style={styles.donateImage} />
          <Text style={styles.donateTitle}>❤️ 기부하기</Text>
          <Text style={styles.donateDesc}>
            포인트로 기부하고 선한 영향력을 만들어요
          </Text>
        </Pressable>

        {/* 종량제 카드 */}
        <View style={styles.grid}>
          {items.map((item) => (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                selectedItem?.id === item.id && styles.selectedCard,
                {
                  transform: [
                    {
                      scale:
                        selectedItem?.id === item.id ? scaleAnim : 1,
                    },
                  ],
                },
              ]}
            >
              <Pressable onPress={() => handleSelect(item)}>
                <Image source={item.img} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardPoint}>{item.point}P</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* 선택된 상품 + 교환 버튼 */}
        {selectedItem && (
          <View style={styles.bottomBox}>
            <Text style={styles.selectedText}>
              선택한 상품: {selectedItem.title} ({selectedItem.point}P)
            </Text>

            <Pressable style={styles.exchangeBtn} onPress={handleExchange}>
              <Text style={styles.exchangeText}>교환하기</Text>
            </Pressable>
          </View>
        )}

        {/* 교환 완료 모달 */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Ionicons
                name="checkmark-circle"
                size={60}
                color="#22C55E"
              />
              <Text style={styles.modalText}>
                {selectedItem?.title} 교환이 완료되었습니다!
              </Text>

              <Pressable
                style={styles.modalButton}
                onPress={handleConfirm}
              >
                <Text style={styles.modalButtonText}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

/* ------------------------- 스타일 ---------------------------- */

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },

  /* 기부 카드 */
  donateCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 25,
    elevation: 4,
    alignItems: "center",
  },
  donateImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  donateTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#DC2626",
  },
  donateDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  /* 종량제 카드 */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#22C55E",
    shadowColor: "#22C55E",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  cardPoint: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  bottomBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 5,
  },
  selectedText: {
    fontSize: 16,
    marginBottom: 10,
  },
  exchangeBtn: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  exchangeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* 모달 */
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 25,
    borderRadius: 14,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
