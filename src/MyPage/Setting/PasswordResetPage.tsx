import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

const PasswordResetPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const route = useRoute();
  const { email } = route.params as { email: string };

  const resetPassword = async () => {
    try {
      const response = await fetch("http://spotweb.hysu.kr:1030/user/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("성공", "비밀번호가 성공적으로 변경되었습니다.");
      } else {
        Alert.alert("오류", "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>비밀번호 변경</Text>
      <TextInput
        style={styles.input}
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetPassword}>
        <Text style={styles.resetButtonText}>변경하기</Text>
      </TouchableOpacity>
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
  input: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: "#00BCD4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  resetButtonText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#fff",
  },
});

export default PasswordResetPage;
