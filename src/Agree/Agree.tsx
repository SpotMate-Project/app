import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Agree: React.FC = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [phnum, setPhnum] = useState("");
  const [name, setName] = useState("");
  const [confirmpw, setConfirmPw] = useState("");
  const [auth_code, setAuthCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 상태

  const handlesignup = () => {
    if (!isEmailVerified) {
      Alert.alert("회원가입 실패", "이메일 인증을 완료해주세요.");
      return;
    }

    fetch("http://spotweb.hysu.kr:1030/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pw,
        passwordCheck: confirmpw,
        nickname: name,
        ph_num: phnum,
        address: address,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          Alert.alert("회원가입 성공", "회원가입이 완료되었습니다.");
          navigation.goBack();
        } else {
          alert(JSON.stringify(pw));
          Alert.alert(
            "회원가입 실패",
            res.message || "정보를 다시 입력해주세요."
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "회원가입 실패",
          "서버 오류가 발생했습니다. 나중에 다시 시도해주세요."
        );
      });
  };

  const sendEmail = () => {
    fetch("http://spotweb.hysu.kr:1030/user/auth/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          Alert.alert("이메일 전송 성공", "이메일이 전송되었습니다.");
        } else {
          Alert.alert(
            "이메일 전송 실패",
            res.message || "이메일을 다시 확인해주세요."
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "이메일 전송 실패",
          "서버 오류가 발생했습니다. 나중에 다시 시도해주세요."
        );
      });
  };

  const verifyEmail = () => {
    fetch("http://spotweb.hysu.kr:1030/user/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        auth_code: auth_code,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsEmailVerified(true);
          Alert.alert("인증 성공", "이메일 인증이 완료되었습니다.");
        } else {
          Alert.alert(
            "인증 실패",
            res.message || "인증 코드가 일치하지 않습니다."
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "인증 실패",
          "서버 오류가 발생했습니다. 나중에 다시 시도해주세요."
        );
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Spotmate</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.sectionHeaderText}>회원 가입</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>주소</Text>
          <TextInput
            style={styles.input}
            placeholder="서울특별시"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.horizontalGroup}>
          <View style={styles.smallInputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="홍길동"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.smallInputGroup}>
            <Text style={styles.label}>전화번호</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="010-1234-5678"
              value={phnum}
              onChangeText={setPhnum}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="PassWord"
            secureTextEntry={true}
            value={pw}
            onChangeText={setPw}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            placeholder="PassWord 확인"
            secureTextEntry={true}
            value={confirmpw}
            onChangeText={setConfirmPw}
          />
        </View>
        <View style={styles.horizontalGroup}>
          <View style={styles.emailInputGroup}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="Test@Test.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity style={styles.sendEmailButton} onPress={sendEmail}>
            <Text style={styles.buttonText}>인증번호 발송</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalGroup}>
          <TextInput
            style={styles.smallInput}
            placeholder="인증 번호"
            value={auth_code}
            onChangeText={setAuthCode}
          />
          <TouchableOpacity style={styles.verifyButton} onPress={verifyEmail}>
            <Text style={styles.buttonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handlesignup}>
          <Text style={styles.submitButtonText}>회원가입 완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  backButtonText: {
    fontFamily: "Jua",
    color: "#fff",
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 20,
  },
  logoContainer: {
    alignItems: "flex-end",
    marginTop: -10,
  },
  logo: {
    width: 100,
    height: 50,
  },
  sectionHeaderText: {
    fontFamily: "Jua",
    fontSize: 24,
    textAlign: "left",
    color: "#00BCD4",
    marginVertical: 20,
  },
  inputGroup: {
    marginVertical: 10,
  },
  horizontalGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  emailInputGroup: {
    flex: 1,
    marginRight: 10,
  },
  smallInputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#000",
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#00BCD4",
    padding: 8,
    fontSize: 14,
    fontFamily: "Jua",
    borderRadius: 5,
  },
  smallInput: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#00BCD4",
    padding: 8,
    fontSize: 14,
    fontFamily: "Jua",
    borderRadius: 5,
  },
  sendEmailButton: {
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  verifyButton: {
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: "Jua",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#fff",
  },
});

export default Agree;
