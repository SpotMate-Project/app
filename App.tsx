// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Login from "./src/Login/Login";
import Agree from "./src/Agree/Agree";
import MainPage from "./src/MainPage/MainPage";
import MyPage from "./src/MyPage/MyPage";
import MyReview from "./src/MyPage/MyReview/MyReview";
import Map from "./src/MapPage/Map";
import Community from "./src/CommunityPage/Community";
import { UserProvider } from "./src/UserContext";
import SettingsPage from "./src/MyPage/Setting/Setting";
import Itemlist from "./src/MyPage/Itemlist/Itemlist";
import Question from "./src/MyPage/Question/Question";
import Visit from "./src/MyPage/Visit/Visit";
import Review from "./src/Review/Review";
import Rspot from "./src/Rspot/Rspot";
import HotPlace from "./src/HotPlace/HotPlace";
import Category from "./src/Category/Category";
import ReviewPage from "./src/Review/ReviewPage";
import EditProfilePage from "./src/MyPage/Setting/EditProfilePage";
import DeveloperInfo from "./src/MyPage/Setting/DeveloperInfo";
import FAQ from "./src/MyPage/Question/FAQ/FAQ";
import Notice from "./src/MyPage/Question/Notice/Notice";
import Inquiry from "./src/MyPage/Question/Inquiry/Inquiry";
import MapCategory from "./src/MapPage/MapCategory";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Agree: undefined;
  MainPage: undefined;
  MyReview: undefined;
  Setting: undefined;
  Itemlist: undefined;
  Question: undefined;
  Visit: undefined;
  Review: undefined;
  Rspot: undefined;
  HotPlace: undefined;
  Category: undefined;
  ReviewPage: undefined;
  EditProfilePage: undefined;
  DeveloperInfo: undefined;
  Map: undefined;
  MapCategory: { category: string };
  FAQ: undefined;
  Notice: undefined;
  Inquiry: undefined;
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
      <Tab.Screen
        name="메인페이지"
        component={MainPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <UserProvider>
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
          <Stack.Screen
            name="MyReview"
            component={MyReview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting"
            component={SettingsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Itemlist"
            component={Itemlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Question"
            component={Question}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Visit"
            component={Visit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Review"
            component={Review}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rspot"
            component={Rspot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HotPlace"
            component={HotPlace}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfilePage"
            component={EditProfilePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeveloperInfo"
            component={DeveloperInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReviewPage"
            component={ReviewPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FAQ"
            component={FAQ}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notice"
            component={Notice}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inquiry"
            component={Inquiry}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MapCategory" component={MapCategory} />
        </Stack.Navigator>
      </UserProvider>
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
