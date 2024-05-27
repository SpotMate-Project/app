import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Agree: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const handleLogin = () => {
    fetch("http://spotweb.hysu.kr:1030/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res["success"]) {
          alert("로그인 성공");
        } else {
          alert("로그인 실패");
        }
      });
  };

  const handleRegister = () => {
    navigation.navigate("Agree");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/spotmateicon.png")}
        style={styles.icon}
      />
      <TextInput placeholder="이메일" value={email} onChangeText={setemail} />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setpassword}
      />
      <Button title="Login" onPress={handleLogin} />

      <Text>비밀번호 찾기</Text>

      <TouchableOpacity onPress={handleRegister}>
        <Text>아직 회원이 아니신가요?</Text>
      </TouchableOpacity>
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
