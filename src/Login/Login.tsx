import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Login </Text>
      <Text>로그인 페이지 구상</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
