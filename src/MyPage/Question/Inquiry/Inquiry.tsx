import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Inquiry: React.FC = () => {
  const navigation = useNavigation();

  const inquiries = [
    { id: 1, question: "저 1:1 문의 요청합니다!", answer: "답변살라살라" },
    { id: 2, question: "문의 2", answer: "답변 2" },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>1:1 문의</Text>
      <ScrollView style={styles.contentContainer}>
        {inquiries.map((inquiry) => (
          <View key={inquiry.id} style={styles.inquiryItem}>
            <Text style={styles.itemText}>{inquiry.question}</Text>
            <Text style={styles.answerText}>{inquiry.answer}</Text>
          </View>
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
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    textAlign: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#00BCD4",
    marginVertical: 10,
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
  inquiryItem: {
    paddingVertical: 10,
  },
  answerText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 5,
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
  },
  fabText: {
    fontSize: 36,
    color: "#fff",
  },
});

export default Inquiry;
