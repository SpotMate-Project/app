import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EmailVerificationPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigation();

  const verifyEmail = async () => {
    try {
      const response = await fetch("http://spotweb.hysu.kr:1030/user/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("성공", "이메일이 성공적으로 인증되었습니다.", [
          { text: "확인", onPress: () => navigation.navigate("PasswordReset", { email }) },
        ]);
      } else {
        Alert.alert("오류", "이메일 인증에 실패했습니다.");
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>이메일 인증</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.verifyButton} onPress={verifyEmail}>
        <Text style={styles.verifyButtonText}>인증하기</Text>
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
  verifyButton: {
    marginTop: 30,
    backgroundColor: "#00BCD4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  verifyButtonText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#fff",
  },
});

export default EmailVerificationPage;
