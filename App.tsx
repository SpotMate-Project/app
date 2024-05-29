import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Login from "./src/Login/Login";
import Agree from "./src/Agree/Agree";
import MainPage from "./src/MainPage/MainPage";
import MyPage from "./src/MyPage/MyPage";
import Map from "./src/MapPage/Map";
import Community from "./src/CommunityPage/Community";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Agree: undefined;
  MainPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "메인페이지") {
            iconName = require("./assets/zip.png");
          } else if (route.name === "Map") {
            iconName = require("./assets/map2.png");
          } else if (route.name === "커뮤니티") {
            iconName = require("./assets/munity.png");
          } else if (route.name === "마이페이지") {
            iconName = require("./assets/human.png");
          }
          return <Image source={iconName} style={styles.bottomMenuIcon} />;
        },
        tabBarActiveTintColor: "#00BCD4",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="메인페이지" component={MainPage} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="커뮤니티" component={Community} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Agree"
          component={Agree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
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
  bottomMenuIcon: {
    width: 30,
    height: 30,
  },
});

export default App;
