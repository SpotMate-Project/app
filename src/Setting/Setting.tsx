import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const SettingsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>UserName</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>회원정보 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>개발자 정보</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>로그아웃</Text>
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
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default SettingsPage;