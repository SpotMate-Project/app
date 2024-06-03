import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const SettingsPage: React.FC = () => {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [imageurl, setProfileImage] = useState<String>();

  const handleEditProfilePage = () => {
    navigation.navigate("EditProfilePage");
  };

  const handleDeveloperInfo = () => {
    navigation.navigate("DeveloperInfo");
  };
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("@user_email");
      if (storedEmail) {
        const response = await fetch("http://spotweb.hysu.kr:1030/user/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: storedEmail,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setEmail(data.data[0].email);
          setNickname(data.data[0].nickname);
          setProfileImage(data.data[0].imageUrl);
        }
      }
    } catch (error) {
      console.error("유저 정보가 없습니다:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, [])
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Settings</Text>
      <View style={styles.profileContainer}>
        {imageurl ? (
          <Image
            source={{ uri: imageurl }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("../../../assets/profile.png")}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.userName}>{nickname}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText} onPress={handleEditProfilePage}>
            회원정보 수정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleDeveloperInfo}>
          <Text style={styles.menuText}>개발자 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={styles.menuLogout}>로그아웃</Text>
        </TouchableOpacity>
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
    paddingTop: 80,
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
    overflow: "hidden",
  },
  userName: {
    fontFamily: "Jua",
    fontSize: 25,
    color: "#00BCD4",
    marginTop: 10,
  },
  userEmail: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
    marginTop: 5,
  },
  menuContainer: {
    flex: 1,
    marginTop: 50,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#00BCD4",
  },
  menuLogout: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "red",
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default SettingsPage;
