import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const NewInquiry = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [userid, setUserid] = useState<number>();
  const navigation = useNavigation();
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
            setUserid(data.data[0].id);
          }
        }
      } catch (error) {
        console.error("유저 정보가 없습니다.", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = () => {
    fetch("http://spotweb.hysu.kr:1030/api/Inquiry/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid,
        title: title,
        body: question,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          Alert.alert("1:1 문의를 해주셔서 감사합니다");
          navigation.goBack();
        } else {
          alert("문의작성에 실패하였습니다.");
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>1:1 문의 작성</Text>
      <TextInput
        style={styles.textInput}
        placeholder="문의 제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="문의 내용을 입력하세요"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>제출</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    fontSize: 24,
    color: "#00BCD4",
    marginTop: 40,
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#00BCD4",
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 30,
  },
  textArea: {
    height: 350,
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Jua",
  },
});

export default NewInquiry;
