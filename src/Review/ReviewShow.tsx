import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const ReviewShow: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { review } = route.params;
  const [reviewdata, setreviewdata] = useState([]);
  alert(review);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(
          `http://spotweb.hysu.kr:1030/review/${review}`
        );
        const data = await response.json();
        if (data.success) {
          alert(JSON.stringify(data.data));
          setreviewdata(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch review details", error);
      }
    };
    fetchReviewDetails();
  }, [review]);

  alert(JSON.stringify(reviewdata) + "마지막alert");
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{reviewdata.title}</Text>
      <Text style={styles.bodyText}>{reviewdata.body}</Text>
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
