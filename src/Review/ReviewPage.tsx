import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ReviewPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params as { title: string };
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    console.log(`Review for ${title}: ${reviewText}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>리뷰 작성 - {title}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="리뷰를 작성하세요..."
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleReviewSubmit}
      >
        <Text style={styles.submitButtonText}>리뷰 제출</Text>
      </TouchableOpacity>
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
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    height: 150,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#fff",
  },
});

export default ReviewPage;
