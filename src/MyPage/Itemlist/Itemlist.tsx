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

const Itemlist: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('음식점');
  const [likedItems, setLikedItems] = useState(new Set());

  const categories = [
    "음식점", "술집", "카페", "패션+뷰티", "편의점", "병원+약국", "헬스",
    "미용", "도서", "영화", "오락", "은행", "세탁소", "교육", "기타",
  ];

  const reviews = {
    "음식점": [
      { title: "미쳐버린닭 숭실대점", rating: 4, count: 32 },
      { title: "지코바 새러마을점", rating: 5, count: 48 },
      { title: "매일한식", rating: 3, count: 22 },
    ],
    "술집": [
      { title: "친구포차", rating: 4, count: 25 },
      { title: "호프앤비어", rating: 3, count: 19 },
    ],
    "카페": [
      { title: "스타벅스", rating: 5, count: 120 },
      { title: "이디야", rating: 4, count: 89 },
    ],
    "패션+뷰티": [
      { title: "미샤", rating: 4, count: 50 },
      { title: "아리따움", rating: 5, count: 60 },
    ],
    "편의점": [
      { title: "GS25", rating: 3, count: 30 },
      { title: "CU", rating: 4, count: 40 },
    ],
    "병원+약국": [
      { title: "온누리약국", rating: 4, count: 20 },
      { title: "메디컬센터", rating: 5, count: 18 },
    ],
    "헬스": [
      { title: "짐스타", rating: 5, count: 55 },
      { title: "헬스존", rating: 4, count: 45 },
    ],
    "미용": [
      { title: "헤어샵", rating: 4, count: 15 },
      { title: "네일아트", rating: 5, count: 25 },
    ],
    "도서": [
      { title: "교보문고", rating: 5, count: 100 },
      { title: "영풍문고", rating: 4, count: 80 },
    ],
    "영화": [
      { title: "CGV", rating: 5, count: 200 },
      { title: "메가박스", rating: 4, count: 150 },
    ],
    "오락": [
      { title: "PC방", rating: 5, count: 75 },
      { title: "노래방", rating: 4, count: 65 },
    ],
    "은행": [
      { title: "국민은행", rating: 5, count: 90 },
      { title: "신한은행", rating: 4, count: 70 },
    ],
    "세탁소": [
      { title: "크린토피아", rating: 5, count: 35 },
      { title: "워시엔조이", rating: 4, count: 25 },
    ],
    "교육": [
      { title: "대성학원", rating: 5, count: 45 },
      { title: "메가스터디", rating: 4, count: 30 },
    ],
    "기타": [
      { title: "기타", rating: 4, count: 50 },
      { title: "기타2", rating: 3, count: 20 },
    ],
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

  const toggleLike = (itemTitle: string) => {
    setLikedItems(prevState => {
      const updatedLikes = new Set(prevState);
      if (updatedLikes.has(itemTitle)) {
        updatedLikes.delete(itemTitle);
      } else {
        updatedLikes.add(itemTitle);
      }
      return updatedLikes;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>찜 목록</Text>
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
          <Text style={styles.noReviewText}>목록 없음</Text>
        ) : (
          reviews[selectedTab].map((item, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(item.rating)}
                  <Text style={styles.reviewCount}>({item.count})</Text>
                </View>
                <TouchableOpacity onPress={() => toggleLike(item.title)}>
                  <FontAwesome
                    name={likedItems.has(item.title) ? "heart" : "heart-o"}
                    size={24}
                    color="#00BCD4"
                  />
                </TouchableOpacity>
              </View>
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

export default Itemlist;