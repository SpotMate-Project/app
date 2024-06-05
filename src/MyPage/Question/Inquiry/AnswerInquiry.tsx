import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AnswerInquiry = ({ route }) => {
  const navigation = useNavigation();
  const { inquiry } = route.params;
  const answer_id = inquiry.inquiry_id;
  const [answer, setAnswer] = useState(inquiry.answer || "");
  const handleSubmit = () => {
    fetch(`http://spotweb.hysu.kr:1030/api/answer/${inquiry.inquiry_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inquiry_id: answer_id,
        answer: answer,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setAnswer(answer);
          navigation.goBack();
        } else {
          alert("답변작성실패");
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>답변 작성</Text>
      <Text style={styles.questionText}>제목: {inquiry.title}</Text>
      <Text style={styles.contentText}>문의내용 : {inquiry.body}</Text>
      <TextInput
        style={styles.input}
        multiline
        value={answer}
        onChangeText={setAnswer}
        placeholder="답변을 입력하세요"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>제출</Text>
      </TouchableOpacity>
    </View>
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
  questionText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    textAlign: "center",
    marginVertical: 20,
  },
  contentText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 200,
    borderColor: "#00BCD4",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
  },
  submitButtonText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
});

export default AnswerInquiry;
