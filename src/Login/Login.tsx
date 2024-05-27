import * as React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/spotmateicon.png")}
        style={styles.icon}
      />
      <Text>Login</Text>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: height * 0.05,
    width: width,
    height: (width / 3) * 1.5,
    resizeMode: "contain",
  },
});

export default Login;
