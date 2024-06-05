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

  const [answer, setAnswer] = useState(inquiry.answer || "");

  const handleSubmit = () => {
    // Here you would typically update the inquiry's answer in your data source (e.g., server or local state)
    // This is a placeholder implementation, replace it with actual data handling logic
    console.log(`Updated answer for inquiry ${inquiry.id}: ${answer}`);
    inquiry.answer = answer; // Update the local state (in real app, update server or global state)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>답변 작성</Text>
      <Text style={styles.questionText}>제목: {inquiry.question}</Text>
      <Text style={styles.contentText}>
        내용: 이곳에 문의 내용이 들어갑니다. 예시로 작성된 내용입니다.
      </Text>
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
