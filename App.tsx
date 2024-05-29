import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Login from "./src/Login/Login";
import Agree from "./src/Agree/Agree";
import mainpage from "./src/MainPage/MainPage";
import MainPage from "./src/MainPage/MainPage";
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Agree: undefined;
  MainPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          source={require("./assets/home.png")}
          style={styles.backgroundImage}
        />
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Agree" component={Agree} />
        <Stack.Screen name="MainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default App;
