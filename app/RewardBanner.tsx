import React, { useRef, useEffect } from "react";
import { Animated, View, Text, StyleSheet, Dimensions } from "react-native";

export default function RewardBanner() {
  const screenWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    const animation = () => {
      translateX.setValue(screenWidth);
      Animated.timing(translateX, {
        toValue: -screenWidth * 1.5,
        duration: 8000,
        useNativeDriver: true,
      }).start(() => animation());
    };

    animation();
  }, []);

  return (
    <View style={styles.bannerContainer}>
      <Animated.Text
        style={[
          styles.bannerText,
          { transform: [{ translateX }] },
        ]}
      >
        ⚠️ 본 보상 서비스는 추후 운영 기능으로 임시 제공되는 페이지입니다.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: "120%",
    overflow: "hidden",
    backgroundColor: "#c9c8c892",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 50,
    borderWidth: 1,
    top:20,
    right:40,
   // borderColor: "#e4d7a1ff",
  },
  bannerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000ff",
    paddingHorizontal: 10,
   
  },
});