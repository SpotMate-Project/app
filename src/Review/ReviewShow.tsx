import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const ReviewShow: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { review } = route.params;
  const [reviewdata, setreviewdata] = useState([]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(
          `http://spotweb.hysu.kr:1030/review/${review}`
        );
        const data = await response.json();
        if (data.success) {
          setreviewdata(data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch review details", error);
      }
    };
    fetchReviewDetails();
  }, [review]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>제목 : {reviewdata.title}</Text>
      <Text style={styles.bodyText}>리뷰 내용 : {reviewdata.body}</Text>
      <Text style={styles.dateText}>
        {new Date(reviewdata.created_at).toLocaleString()}
      </Text>
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
    fontSize: 22,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 20,
  },
  bodyText: {
    fontSize: 16,
    marginVertical: 20,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
  loadingText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ReviewShow;
