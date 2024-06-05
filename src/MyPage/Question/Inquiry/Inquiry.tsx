import React, { useState, useEffect } from "react"; // useState, useEffect 추가
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Inquiry = () => {
  const navigation = useNavigation();
  const [inquiries, setInquiries] = useState([]);
  const [userid, setuserid] = useState<number>();
  const [state, setstate] = useState<number>();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch(
          "http://spotweb.hysu.kr:1030/api/Inquiry",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        setInquiries(res.data);
      } catch (error) {
        console.error("오류 데이터 전송", error);
      }
    };
    fetchInquiries();
  }, []);

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
            setuserid(data.data[0].id);
            setstate(data.data[0].state);
          }
        }
      } catch (error) {
        console.error("유저 정보가 없습니다.", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleInquiryPress = (inquiry) => {
    if (inquiry.user_id == userid || state == 3) {
      navigation.navigate("AnswerInquiry", { inquiry });
    } else {
      Alert.alert("알림", "작성자 및 개발자만 해당 문의를 볼 수 있습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>1:1 문의</Text>
      <ScrollView style={styles.contentContainer}>
        {inquiries.map((inquiry) => (
          <TouchableOpacity
            key={inquiry.inquiry_id}
            style={styles.inquiryItem}
            onPress={() => handleInquiryPress(inquiry)}
          >
            <Text style={styles.itemText}>{inquiry.title}</Text>
            <Text style={styles.answerText}>{inquiry.body}</Text>
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
