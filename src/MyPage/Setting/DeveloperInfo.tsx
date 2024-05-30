import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DeveloperInfo: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>개발자 정보</Text>
      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>박현수</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>고강호</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>이건욱</Text>
        </TouchableOpacity>
        <View style={styles.line} />
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
    paddingTop: 50,
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
  contentContainer: {
    flex: 1,
    marginTop: 120,
  },
  item: {
    paddingVertical: 10
  },
  itemText: {
    fontFamily: "Jua",
    fontSize: 22,
    color: "#00BCD4",
    textAlign: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#00BCD4",
    marginVertical: 10,
  },
  bottomLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00BCD4",
    marginVertical: 20,
  },
});

export default DeveloperInfo;
