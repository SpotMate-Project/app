import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const NewInquiry = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("New Inquiry Submitted:", { title, question });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>새 문의 작성</Text>
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
