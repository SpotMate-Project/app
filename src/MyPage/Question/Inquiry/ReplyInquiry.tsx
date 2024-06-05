import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ReplyInquiry = ({ route }) => {
  const navigation = useNavigation();
  const { inquiry } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>답변</Text>
      <Text style={styles.questionText}>제목: {inquiry.title}</Text>
      <Text style={styles.contentText}>문의내용 : {inquiry.body}</Text>
      <Text style={styles.input}>
        Re : 문의를 주셔셔감사합니다{"\n"}
        {"\n"}
        -> {inquiry.answer}
      </Text>
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

export default ReplyInquiry;
