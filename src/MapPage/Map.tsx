import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const Map: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 부여되지않았습니다.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`searchCategory('${category}');`);
    }
  };

  const mapHtml = location
    ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=e19c9e836c0df1b8953cd661cbec4df2&libraries=services"></script>
      <style>
        html, body {width: 100%; height: 100%; margin: 0; padding: 0;}
        #map {width: 100%; height: 100%;}
        .category {position: absolute; top: 10px; left: 10px; z-index: 10; background: white; padding: 5px;}
        .category button {margin: 5px;}
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var mapContainer = document.getElementById('map'), 
            mapOption = { 
                center: new kakao.maps.LatLng(${location.latitude}, ${location.longitude}), 
                level: 3 
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
            contentNode = document.createElement('div'), 
            markers = [], 
            currCategory = ''; 

        contentNode.className = 'placeinfo_wrap';
        placeOverlay.setContent(contentNode);

        function addEventHandle(target, type, callback) {
          if (target.addEventListener) {
              target.addEventListener(type, callback);
          } else {
              target.attachEvent('on' + type, callback);
          }
        }

        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        function searchCategory(category) {
          currCategory = category;
          searchPlaces();
        }

        function searchPlaces() {
          if (!currCategory) {
            return;
          }

          placeOverlay.setMap(null);
          removeMarker();

          var ps = new kakao.maps.services.Places(map);
          ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
        }

        function placesSearchCB(data, status) {
          if (status === kakao.maps.services.Status.OK) {
            displayPlaces(data);
          }
        }

        function displayPlaces(places) {
          var order = 0; // Define your order logic here

          for (var i = 0; i < places.length; i++) {
            var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

            (function(marker, place) {
              kakao.maps.event.addListener(marker, 'click', function() {
                displayPlaceInfo(place);
              });
            })(marker, places[i]);
          }
        }

        function addMarker(position, order) {
          var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png',
              imageSize = new kakao.maps.Size(27, 28),
              imgOptions =  {
                  spriteSize: new kakao.maps.Size(72, 208),
                  spriteOrigin: new kakao.maps.Point(46, (order * 36)),
                  offset: new kakao.maps.Point(11, 28)
              },
              markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
              marker = new kakao.maps.Marker({
                  position: position,
                  image: markerImage 
              });

          marker.setMap(map);
          markers.push(marker);
          return marker;
        }

        function removeMarker() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }   
          markers = [];
        }

        function displayPlaceInfo(place) {
          var content = '<div class="placeinfo">' +
                        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

          if (place.road_address_name) {
              content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                          '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
          } else {
              content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
          }

          content += '    <span class="tel">' + place.phone + '</span>' + 
                     '</div>' + 
                     '<div class="after"></div>';

          contentNode.innerHTML = content;
          placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
          placeOverlay.setMap(map);  
        }
      </script>
    </body>
    </html>
  `
    : "";

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00BCD4" />
      ) : (
        <>
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            source={{ html: mapHtml }}
            style={styles.map}
          />
          <View style={styles.buttonContainer}>
            <Button title="카페" onPress={() => handleCategoryClick("CE7")} />
            <Button title="음식점" onPress={() => handleCategoryClick("FD6")} />
            <Button
              title="관광명소"
              onPress={() => handleCategoryClick("AT4")}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});

export default Map;
