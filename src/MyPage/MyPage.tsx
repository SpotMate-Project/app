import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const MyPage: React.FC = () => {
  const navigation = useNavigation();
  const handleReview = () => {
    navigation.navigate("MyReview");
  };
  const handleSetting = () => {
    navigation.navigate("Setting");
  };
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("@user_email");
        if (storedEmail) {
          const response = await fetch(
            "http://spotweb.hysu.kr:1030/user/info",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: storedEmail,
              }),
            }
          );
          const data = await response.json();
          if (data.success) {
            setNickname(data.data[0].nickname);
          }
        }
      } catch (error) {
        console.error("유저정보가 없습니다:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spotmate</Text>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{nickname}</Text>
        <View style={styles.separator} />
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../assets/zzim.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>찜 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../assets/review.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>방문 기록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleReview}>
            <Image
              source={require("../../assets/review1.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>나의 리뷰</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuRow, { paddingHorizontal: 30 }]}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../assets/question.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>문의 사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleSetting}>
            <Image
              source={require("../../assets/gear.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>설정</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  userName: {
    fontFamily: "Jua",
    fontSize: 25,
    color: "#00BCD4",
    marginTop: 10,
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#00BCD4",
    marginVertical: 10,
  },
  menuContainer: {
    flex: 1,
    marginTop: 50,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 60,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    width: 60,
    height: 60,
  },
  menuText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#00BCD4",
    marginTop: 10,
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default MyPage;
