import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const HotPlace: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("음식점");
  const [likedItems, setLikedItems] = useState(new Set());
  const [sortCriteria, setSortCriteria] = useState("visits");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const categories = [
    "음식점",
    "술집",
    "카페",
    "패션+뷰티",
    "편의점",
    "병원+약국",
    "헬스",
    "미용",
    "도서",
    "영화",
    "오락",
    "은행",
    "세탁소",
    "교육",
    "기타",
  ];

  const hotPlaces = {
    음식점: [
      {
        title: "미쳐버린닭 숭실대점",
        rating: 4,
        count: 32,
        visits: 120,
        address: "서울특별시 동작구 상도로 369",
        description: "매콤한 닭요리 전문점.",
        contact: "02-123-4567",
      },
      {
        title: "지코바 새러마을점",
        rating: 5,
        count: 48,
        visits: 150,
        address: "서울특별시 동작구 상도로 370",
        description: "달콤한 간장치킨이 일품인 치킨집.",
        contact: "02-234-5678",
      },
      {
        title: "매일한식",
        rating: 3,
        count: 22,
        visits: 90,
        address: "서울특별시 동작구 상도로 371",
        description: "집밥 느낌의 한식당.",
        contact: "02-345-6789",
      },
    ],
    술집: [
      {
        title: "친구포차",
        rating: 4,
        count: 25,
        visits: 85,
        address: "서울특별시 동작구 상도로 372",
        description: "편안한 분위기의 술집.",
        contact: "02-456-7890",
      },
      {
        title: "호프앤비어",
        rating: 3,
        count: 19,
        visits: 65,
        address: "서울특별시 동작구 상도로 373",
        description: "다양한 맥주를 즐길 수 있는 곳.",
        contact: "02-567-8901",
      },
    ],
    카페: [],
    "패션+뷰티": [],
    편의점: [],
    "병원+약국": [],
    헬스: [],
    미용: [],
    도서: [],
    영화: [],
    오락: [],
    은행: [],
    세탁소: [],
    교육: [],
    기타: [],
  };

  const renderStars = (rating) => {
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

  const toggleLike = (itemTitle) => {
    setLikedItems((prevState) => {
      const updatedLikes = new Set(prevState);
      if (updatedLikes.has(itemTitle)) {
        updatedLikes.delete(itemTitle);
      } else {
        updatedLikes.add(itemTitle);
      }
      return updatedLikes;
    });
  };

  const sortPlaces = (places) => {
    switch (sortCriteria) {
      case "reviews":
        return places.sort((a, b) => b.count - a.count);
      case "likes":
        return places.sort(
          (a, b) => (likedItems.has(b.title) ? 1 : 0) - (likedItems.has(a.title) ? 1 : 0)
        );
      case "visits":
      default:
        return places.sort((a, b) => b.visits - a.visits);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>핫플레이스</Text>
      <View style={styles.tabContainerWrapper}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
        >
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
      <View style={styles.sortContainer}>
        <Text style={styles.realTimeText}>실시간 인기 스팟</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity onPress={() => setShowSortOptions(!showSortOptions)}>
            <Text style={styles.sortButtonText}>
              {sortCriteria === "visits" ? "방문자 수" : sortCriteria === "reviews" ? "리뷰 수" : "찜 수"}
            </Text>
          </TouchableOpacity>
          {showSortOptions && (
            <View style={styles.sortOptions}>
              <TouchableOpacity onPress={() => {
                setSortCriteria("reviews");
                setShowSortOptions(false);
              }}>
                <Text style={styles.sortOptionText}>리뷰 수</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSortCriteria("likes");
                setShowSortOptions(false);
              }}>
                <Text style={styles.sortOptionText}>찜 수</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ScrollView style={styles.reviewContainer}>
        {hotPlaces[selectedTab].length === 0 ? (
          <Text style={styles.noReviewText}>목록 없음</Text>
        ) : (
          sortPlaces(hotPlaces[selectedTab]).map((item, index) => (
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
              <Text style={styles.reviewDescription}>{item.description}</Text>
              <Text style={styles.reviewAddress}>{item.address}</Text>
              <Text style={styles.reviewContact}>{item.contact}</Text>
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
    paddingTop: 30,
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
  tabContainerWrapper: {
    alignItems: "center",
    marginVertical: 5,
  },
  tabContainer: {
    flexDirection: "row",
    width: "80%",
  },
  tabItem: {
    paddingVertical: 5,
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
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  realTimeText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#00BCD4",
    marginRight: 10,
  },
  sortButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#00BCD4",
    marginHorizontal: 10,
  },
  sortOptions: {
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    zIndex: 1,
  },
  sortOptionText: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#00BCD4",
    padding: 10,
  },
  reviewContainer: {
    flex: 1,
    marginTop: 5,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewCount: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#aaa",
    marginLeft: 5,
  },
  reviewDescription: {
    fontFamily: "Jua",
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  reviewAddress: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#888",
  },
  reviewContact: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#888",
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
    marginVertical: 10,
  },
});

export default HotPlace;
