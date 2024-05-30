import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const MyReview: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('음식점');

  const categories = [
    "음식점", "술집", "카페", "패션+뷰티", "편의점", "병원+약국", "헬스",
    "미용", "도서", "영화", "오락", "은행", "세탁소", "교육", "기타",
  ];

  const reviews = {
    "음식점": [
      { title: "미쳐버린닭 숭실대점", rating: 4, count: 32, text: "정말 맛있는 치킨!" },
      { title: "지코바 새러마을점", rating: 5, count: 48, text: "순살 양념구이 최고!" },
      { title: "매일한식", rating: 3, count: 22, text: "제육볶음이 맛있어요." },
    ],
    "술집": [],
    "카페": [],
    "패션+뷰티": [],
    "편의점": [],
    "병원+약국": [],
    "헬스": [],
    "미용": [],
    "도서": [],
    "영화": [],
    "오락": [],
    "은행": [],
    "세탁소": [],
    "교육": [],
    "기타": [],
  };

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={16}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>나의 리뷰</Text>
      <View style={styles.tabContainerWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabItem,
                selectedTab === category && styles.selectedTabItem,
              ]}
              onPress={() => setSelectedTab(category)}
            >
              <Text style={styles.tabText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.reviewContainer}>
        {reviews[selectedTab].length === 0 ? (
          <Text style={styles.noReviewText}>리뷰 없음</Text>
        ) : (
          reviews[selectedTab].map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(review.rating)}
                  <Text style={styles.reviewCount}>({review.count})</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))
        )}
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
    paddingTop: 30, // Reduced paddingTop to minimize top spacing
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
    marginVertical: 5, // Reduced marginVertical to minimize spacing
  },
  tabContainerWrapper: {
    alignItems: "center", // Center the tabContainer horizontally
    marginVertical: 5, // Reduced marginVertical to minimize spacing
  },
  tabContainer: {
    flexDirection: "row",
    width: "80%", // Set a fixed width for the tab container
  },
  tabItem: {
    paddingVertical: 5, // Reduced paddingVertical to minimize height
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedTabItem: {
    borderBottomColor: "#00BCD4",
  },
  tabText: {
    fontFamily: "Jua",
    fontSize: 16,
    color: "#00BCD4",
  },
  reviewContainer: {
    flex: 1,
    marginTop: 5, // Reduced marginTop to minimize spacing
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewTitle: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#aaa",
    marginLeft: 5,
  },
  reviewText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
  },
  noReviewText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 10, // Reduced marginVertical to minimize spacing
  },
});

export default MyReview;