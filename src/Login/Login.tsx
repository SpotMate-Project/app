import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Agree: undefined;
  MainPage: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
        if (res.success) {
          navigation.navigate("MainPage");
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
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/spotmateicon.png")}
          style={styles.icon}
        />
      </View>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("기능 구현해야함")}>
        <Text style={styles.forgotPasswordText}>비밀번호 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={handleRegister}
      >
        <Text style={styles.registerText}>아직 회원이 아니신가요?</Text>
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
    backgroundColor: "#fff",
  },
  iconContainer: {
    position: "absolute",
    top: height * 0.1,
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  input: {
    width: width * 0.8,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
  },
  loginButton: {
    width: width * 0.8,
    height: 40,
    backgroundColor: "#00BCD4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#00BCD4",
    marginVertical: 10,
  },
  registerContainer: {
    position: "absolute",
    bottom: 20,
  },
  registerText: {
    color: "#000",
    fontSize: 14,
  },
});

export default Login;
