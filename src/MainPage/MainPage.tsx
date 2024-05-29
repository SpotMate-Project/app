import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const MainPage: React.FC = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Spotmate</Text>

        <View style={styles.banner}>
          <Image
            source={require("../../assets/gear.png")}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>우리 동네 주변에 뭐가 있지?</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/gear.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>관심 카테고리</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/gear.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>리뷰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/gear.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>핫 플레이스</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image
                source={require("../../assets/gear.png")}
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>추천 스팟</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomLine} />
      <View style={styles.bottomMenuContainer}>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Image
            source={require("../../assets/zip.png")}
            style={styles.bottomMenuIcon}
          />
          <Text style={styles.bottomMenuText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Image
            source={require("../../assets/map2.png")}
            style={styles.bottomMenuIcon}
          />
          <Text style={styles.bottomMenuText}>MAP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Image
            source={require("../../assets/munity.png")}
            style={styles.bottomMenuIcon}
          />
          <Text style={styles.bottomMenuText}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem}>
          <Image
            source={require("../../assets/human.png")}
            style={styles.bottomMenuIcon}
          />
          <Text style={styles.bottomMenuText}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontFamily: "Jua",
    fontSize: 30,
    textAlign: "center",
    color: "#00BCD4",
    marginVertical: 5,
  },
  banner: {
    alignItems: "center",
    marginVertical: 10,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  bannerText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  section: {
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
    marginVertical: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
  },
  categoryText: {
    fontFamily: "Jua",
    fontSize: 18,
    color: "#00BCD4",
    marginTop: 5,
  },
  bottomLine: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  bottomMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomMenuItem: {
    alignItems: "center",
  },
  bottomMenuIcon: {
    width: 30,
    height: 30,
  },
  bottomMenuText: {
    fontFamily: "Jua",
    fontSize: 14,
    color: "#00BCD4",
    marginTop: 5,
  },
});

export default MainPage;
