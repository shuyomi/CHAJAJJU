import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function GuideModal({ visible, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>

            <Text style={styles.modalTitle}>분리수거 가이드</Text>
             <Text style={styles.pointNotice}>*포인트 관련 기준은 임시로 지정하였습니다.{"\n"}</Text>
            <Text style={styles.modalText}>
           
              CHAJAJJU는 분리수거 무게(kg)를 기준으로 {"\n"}포인트를 계산합니다.
              {"\n"}
              - 기본 포인트: 700P 지급{"\n"}
              - 품목별 가중치 × 무게(kg) 만큼 추가 포인트 적립{"\n"}
              {"\n"}
              예) 플라스틱 1.2kg → 700P + (1.2 × 150P) = 880P{"\n"}
              {"\n"}
              ※ 깨끗한 분리배출은 더 좋은 환경을 만들 수 있어요.
            </Text>

            <Text style={styles.modalTitle}>품목별 가중치</Text>
            <Text style={styles.modalText}>
              - 투명페트병: kg당 180P{"\n"}
              - 플라스틱: kg당 150P{"\n"}
              - 알루미늄 캔: kg당 200P{"\n"}
              - 철 캔: kg당 200P{"\n"}
              - 비닐: kg당 120P{"\n"}
              - 종이팩: kg당 100P{"\n"}
              - 신문: kg당 100P{"\n"}
              - 의류: kg당 150P{"\n"}
              - 소주병: kg당 50P{"\n"}
              - 맥주병: kg당 50P{"\n"}
              - 기타병: kg당 50P{"\n"}
            </Text>

            <Text style={styles.modalTitle}>계산 공식</Text>
            <Text style={styles.modalText}>
              총 적립 포인트 = 700P + (무게 × 품목별 가중치){"\n"}
              {"\n"}
              예) 알루미늄 캔 0.5kg → 700 + (0.5 × 200P) = 800P{"\n"}
            </Text>
</ScrollView>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>

          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
     shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
     alignItems: "center",
     padding:15,  
  
  },
  
 modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  pointNotice: {
  fontWeight: "700",
  color: "#d32f2f", // 빨간 강조 색
  marginTop: 10,
  marginBottom: 4,
},

  modalText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    marginBottom: 18,
  },

  closeButton: {
    width: 300,
    backgroundColor: "#2cd543ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
