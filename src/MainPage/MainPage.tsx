import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const handleReview = () => {
    navigation.navigate("Review");
  };

  const handleCategory = () => {
    navigation.navigate("Category");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Spotmate</Text>

        <View style={styles.banner}>
          <Image
            source={require("../../assets/bannerlogo.png")}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>우리 동네 주변에 뭐가 있지?</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={handleCategory}
            >
              <Image
                source={require("../../assets/categori.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>관심 카테고리</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={handleReview}
            >
              <Image
                source={require("../../assets/mainrev.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>리뷰</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
    marginTop: 80,
    marginBottom: 40,
  },
  banner: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  bannerText: {
    fontFamily: "Jua-Bold",
    fontSize: 18,
    color: "#00BCD4",

    textAlign: "center",
    marginTop: 10,
  },
  section: {
    marginTop: 80,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryItem: {
    width: "45%",
    alignItems: "center",
    marginVertical: 30,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#00BCD4",
    marginTop: 10,
  },
});

export default MainPage;
