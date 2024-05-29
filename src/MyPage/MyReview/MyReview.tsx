import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const ReviewPage: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>My Reviews</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>음식점</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>편의시설</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>취미시설</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.reviewContainer}>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewTitle}>미쳐버린닭 숭실대점</Text>
          <Text style={styles.reviewText}>후라이드반+양념반 세트</Text>
          <Text style={styles.reviewDate}>지난 주</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewTitle}>지코바 새러마을점</Text>
          <Text style={styles.reviewText}>순살 양념구이</Text>
          <Text style={styles.reviewDate}>이번 달</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewTitle}>매일한식</Text>
          <Text style={styles.reviewText}>매콤제육 정식</Text>
          <Text style={styles.reviewDate}>이번 달</Text>
        </View>
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
    paddingTop: 50,
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  tabItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#00BCD4",
  },
  tabText: {
    fontFamily: "Jua",
    fontSize: 20,
    color: "#00BCD4",
  },
  reviewContainer: {
    flex: 1,
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reviewTitle: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    marginBottom: 5,
  },
  reviewText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
  },
  reviewDate: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#aaa",
    marginTop: 10,
    textAlign: "right",
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default ReviewPage;
