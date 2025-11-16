import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image,  ActivityIndicator,Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function reward() {
const router = useRouter();

      return (
         <View style={styles.container}>
             <Pressable style={styles.backButton} onPress={() => router.push("/footer/my")}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>
            <Text style={styles.box}>보상페이지</Text>
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
    });