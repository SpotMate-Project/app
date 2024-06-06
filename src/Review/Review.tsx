import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Review: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [searchQuery, reviews]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://spotweb.hysu.kr:1030/review/get");
      const data = await response.json();
      setReviews(data.data); // 'data' 객체의 'data' 배열을 설정
    } catch (error) {
      console.error(error);
    }
  };

  const filterReviews = () => {
    const filtered = reviews.filter(
      (review) =>
        review.title &&
        review.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const navigateToReviewPage = (review) => {
    navigation.navigate("ReviewShow", { review });
  };

  const navigateToWriteReviewPage = () => {
    navigation.navigate("ReviewPage");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>리뷰 </Text>
      <TouchableOpacity
        style={styles.writeButton}
        onPress={navigateToWriteReviewPage}
      >
        <Text style={styles.writeButtonText}>리뷰 쓰기</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="리뷰 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView style={styles.reviewContainer}>
        {filteredReviews.length === 0 ? (
          <Text style={styles.noReviewText}>목록 없음</Text>
        ) : (
          filteredReviews.map((review) => (
            <TouchableOpacity
              key={review.review_id}
              onPress={() => navigateToReviewPage(review.review_id)}
            >
              <View style={styles.reviewItem}>
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <Text style={styles.reviewDate}>
                  {review.created_at
                    ? new Date(review.created_at).toLocaleString()
                    : "날짜 없음"}
                </Text>
              </View>
            </TouchableOpacity>
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
    marginTop: 20,
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  writeButton: {
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  writeButtonText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#fff",
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
  reviewTitle: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
  },
  reviewDate: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#888",
    marginTop: 5,
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

export default Review;
