import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { useRoute, useNavigation } from "@react-navigation/native";

const MapCategory = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);
  const route = useRoute();
  const { category } = route.params; // 네비게이션을 통해 전달받은 카테고리

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 부여되지 않았습니다.");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        Alert.alert("위치 정보를 가져올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const mapHtml = `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>카테고리로 장소 검색하기</title>
</head>
<body>

<div id="map" style="width:100%;height:100vh;"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e19c9e836c0df1b8953cd661cbec4df2&libraries=services"></script>
<script>
var infowindow = new kakao.maps.InfoWindow({zIndex:1});
var mapContainer = document.getElementById('map'), 
    mapOption = {
        center: new kakao.maps.LatLng(${
          location ? location.latitude : "37.566826"
        }, ${location ? location.longitude : "126.9786567"}), 
        level: 3 
    };  

var map = new kakao.maps.Map(mapContainer, mapOption); 

var ps = new kakao.maps.services.Places(map); 

// 선택한 카테고리로 장소 검색
ps.categorySearch('${category}', placesSearchCB, {useMapBounds:true});

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
        }       
    }
}

function displayMarker(place) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:7px; z-index:1; background-color: white; text-align: center;">' +
        '<div style="padding:5px;">' + place.place_name + '</div>' +
        '<hr>' +
        '<button style="display: block; padding:7px;" onclick="handleClick()">' + place.place_name + ' 리뷰쓰기' + '</button>' +
        '<button style="display: block; padding:7px;" onclick="handleReviewClick()">' + place.place_name + ' 리뷰보기' + '</button>' +
    '</div>');
        infowindow.open(map, marker);
    });

   
}
function handleClick(){
    window.ReactNativeWebView.postMessage('리뷰쓰기');
 }

 function handleReviewClick(){
    window.ReactNativeWebView.postMessage('리뷰보기');
 }
</script>
</body>
</html>
  `;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00BCD4" />
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHtml, baseUrl: "http://localhost:8081" }}
          style={styles.webview}
          onMessage={(event) => {
            if (event.nativeEvent.data === "리뷰쓰기") {
              navigation.navigate("ReviewPage");
            }
            if (event.nativeEvent.data === "리뷰보기") {
              navigation.navigate("Review");
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default MapCategory;
