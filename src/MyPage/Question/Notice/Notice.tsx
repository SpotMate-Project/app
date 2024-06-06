import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Notice: React.FC = () => {
  const navigation = useNavigation();

  const notice = {
    title: `공지사항 `,
    content: `SpotMate를 이용해주시는 사용자분들에게 
    대단히 감사하다는 말씀을 올립니다.
SpotMate는 3명의 개발자로 만든 
지역상권을 리뷰해주는 앱이며 
문제나 추가적인 오류 발생시 1:1문의 통해 
알려주시면 감사하겠습니다.
끊임 없이 발전하는 SpotMate 앱이되겠습니다.`,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{notice.title}</Text>

      <View style={styles.contentContainer}>
        <View style={styles.line} />
        <Text style={styles.contentText}>{notice.content}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
};
const styles = StyleSheet.create({
  contentText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  backButton: {
    fontSize: 24,
    color: "#00BCD4",
    marginTop: 35,
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

export default Notice;
