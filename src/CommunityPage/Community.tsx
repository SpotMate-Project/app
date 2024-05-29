import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const SettingsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>커뮤니티 제작해야함</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default SettingsPage;
