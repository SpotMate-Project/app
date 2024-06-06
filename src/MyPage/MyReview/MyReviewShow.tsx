import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const MyReviewShow: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { review } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>제목 : {review.title}</Text>
      <Text style={styles.reviewText}>리뷰 내용 : {review.body}</Text>
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
    marginTop: 20,
  },
  reviewText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#555",
    margin: 20,
  },
});

export default MyReviewShow;
