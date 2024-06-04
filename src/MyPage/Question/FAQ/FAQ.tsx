import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const FAQ: React.FC = () => {
  const navigation = useNavigation();
  const faqs = [
    {
      question: "SpotMate는 어떤 앱인가요?",
      answer: "SpotMate는 주변 지역 상권을 알려주기위해" + "제작한 앱입니다.",
    },
    {
      question: "따로 문의를 드리고싶으면 어떻게 해야하나요?",
      answer: "1:1 문의 이용하여 문의를 해주시면 됩니다.",
    },
    {
      question: "리뷰는 어떤식으로 볼수있나요?",
      answer:
        "메인화면의 리뷰를 누르면 전체의 리뷰를 볼수있고 마이페이지의 리뷰를 누르면 내가 쓴 리뷰를 볼수 있습니다.",
    },
    {
      question: "아이디를 변경하고 싶은데 어떻게하면되나요?",
      answer:
        "새로 회원가입을 해주시거나 1:1 문의를 통해서 변경하실수있습니다.",
    },
    {
      question: "어떤 상황에서 사용하면 좋나요?",
      answer: "주변의 상권이 어떤게 있는지 확인하고 싶을때 사용하시면 됩니다!",
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>자주 묻는 질문</Text>
      <ScrollView style={styles.contentContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <View style={styles.line} />
            <Text style={styles.itemText}>{faq.question}</Text>
            <Text style={styles.answerText}>{faq.answer}</Text>
            <View style={styles.line} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 20,
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
    marginVertical: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
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
  faqItem: {
    paddingVertical: 10,
  },
  answerText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 5,
  },
});

export default FAQ;
