import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Button,
} from "react-native";

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/spotmateicon.png")}
        style={styles.icon}
      />
      <TextInput placeholder="이메일"></TextInput>
      <TextInput placeholder="비밀번호"></TextInput>
      <Button title="Login" />

      <Text>비밀번호 찾기</Text>

      <Text>아직 회원이 아니신가요?</Text>
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
    top: height * 0.08,
    width: width,
    height: (width / 3) * 1.5,
    resizeMode: "contain",
  },
});

export default Login;
