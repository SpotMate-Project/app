import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewPage: React.FC = () => {
  const navigation = useNavigation();
  const [reviewText, setReviewText] = useState("");
  const [title, setTitle] = useState("");
  const [userid, setUserid] = useState<number>();
  const created_at = new Date().toISOString();
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

  const handleReviewSubmit = () => {
    fetch("http://spotweb.hysu.kr:1030/review/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userid,
        title: title,
        body: reviewText,
        created_at: created_at,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          Alert.alert("리뷰 작성에 성공하였습니다.");
          navigation.goBack();
        } else {
          alert("문의작성에 실패하였습니다.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>리뷰 작성 </Text>
      <TextInput
        style={styles.titleInput}
        placeholder="리뷰를 쓸 장소 이름을 꼭 기입하여주세요"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="리뷰를 작성하세요..."
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleReviewSubmit}
      >
        <Text style={styles.submitButtonText}>리뷰 제출</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  backButton: {
    fontSize: 24,
    color: "#00BCD4",
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 22,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 20,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    height: 150,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#fff",
  },
});

export default ReviewPage;
