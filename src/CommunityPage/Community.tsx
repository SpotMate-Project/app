import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = [
  "FD6", // 음식점
  "CE7", // 카페
  "PUB", // 술집
  "FB1", // 패션+뷰티
  "CS2", // 편의점
  "HP8", // 병원+약국
  "SW8", // 헬스
  "BK9", // 미용, 은행
  "LIB", // 도서
  "CT1", // 영화, 오락
  "CLT", // 세탁소
  "SC4", // 교육
  "ETC", // 기타
];

const Category: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>관심 카테고리</Text>
      <ScrollView style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => navigation.navigate("Map", { category })}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
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
    paddingTop: 50,
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
  categoryContainer: {
    flex: 1,
  },
  categoryItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    textAlign: "center",
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default Category;
