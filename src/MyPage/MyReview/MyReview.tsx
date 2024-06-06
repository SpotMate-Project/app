import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyReview: React.FC = () => {
  const navigation = useNavigation();
  const [userid, setUserid] = useState<number>();
  const [reviews, setReviews] = useState<any[]>([]);

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
            setUserid(data.data[0].id);
          }
        }
      } catch (error) {
        console.error("유저 정보가 없습니다.", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      if (userid) {
        try {
          const response = await fetch(
            `http://spotweb.hysu.kr:1030/review/myreview/${userid}`
          );
          const data = await response.json();
          if (data.success) {
            setReviews(data.data);
          }
        } catch (error) {
          console.error("리뷰를 가져올 수 없습니다.", error);
        }
      }
    };
    fetchReviewDetails();
  }, [userid]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>나의 리뷰</Text>
      <ScrollView style={styles.reviewContainer}>
        {reviews.length === 0 ? (
          <Text style={styles.noReviewText}>리뷰 없음</Text>
        ) : (
          reviews.map((review, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reviewItem}
              onPress={() => navigation.navigate("MyReviewShow", { review })}
            >
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}> {review.title}</Text>
                <Text style={styles.dateText}>
                  {new Date(review.created_at).toLocaleString()}
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
    marginTop: 30,
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
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
    marginVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
});

export default MyReview;
