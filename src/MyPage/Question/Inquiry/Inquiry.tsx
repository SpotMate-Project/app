import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Inquiry = () => {
  const navigation = useNavigation();

  // Dummy data for inquiries
  const inquiries = [
    {
      id: 1,
      question: "저 1:1 문의 요청합니다!",
      answer: "답변살라살라",
      author: "user1",
    },
    { id: 2, question: "문의 2", answer: "답변 2", author: "user2" },
  ];

  // Dummy user data
  const currentUser = { id: "user1", role: "admin" }; // Change role to 'admin' to test as admin

  const handleInquiryPress = (inquiry) => {
    if (currentUser.role === "admin") {
      navigation.navigate("AnswerInquiry", { inquiry });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>1:1 문의</Text>
      <ScrollView style={styles.contentContainer}>
        {inquiries
          .filter(
            (inquiry) =>
              currentUser.role === "admin" || inquiry.author === currentUser.id
          )
          .map((inquiry) => (
            <TouchableOpacity
              key={inquiry.id}
              style={styles.inquiryItem}
              onPress={() => handleInquiryPress(inquiry)}
            >
              <Text style={styles.itemText}>{inquiry.question}</Text>
              <Text style={styles.answerText}>{inquiry.answer}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NewInquiry")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  },
  contentContainer: {
    flex: 1,
  },
  itemText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    textAlign: "center",
  },
  inquiryItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 8,
    borderColor: "#00BCD4",
    borderWidth: 1,
  },
  answerText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: "#00BCD4",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  fabText: {
    fontSize: 36,
    color: "#fff",
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default Inquiry;
