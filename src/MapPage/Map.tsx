import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const categories = [
  { id: 'MT1', name: '마트' },
  { id: 'CS2', name: '편의점' },
  { id: 'PM9', name: '약국' },
  { id: 'SC4', name: '학교' },
  { id: 'HP5', name: '병원' }
];

const Map: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const webviewRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 부여되지 않았습니다.");
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

  const handleCategoryPress = (category) => {
    setCategory(category);
    webviewRef.current.postMessage(category);
  };

  const mapHtml = location
    ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a08a47954994b951a68349823c015d30&libraries=services"></script>
      <style>
        html, body {width: 100%; height: 100%; margin: 0; padding: 0;}
        #map {width: 100%; height: 100%;}
        .placeinfo_wrap {position: absolute; left: 0; bottom: 0; width: 100%; box-sizing: border-box; padding: 5px; background-color: white; border: 1px solid #ccc; z-index: 1;}
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

        var ps = new kakao.maps.services.Places(map); 

        kakao.maps.event.addListener(map, 'idle', searchPlaces);

        contentNode.className = 'placeinfo_wrap';

        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        placeOverlay.setContent(contentNode);

        window.addEventListener('message', function(event) {
          currCategory = event.data;
          searchPlaces();
        });

        function addEventHandle(target, type, callback) {
            if (target.addEventListener) {
                target.addEventListener(type, callback);
            } else {
                target.attachEvent('on' + type, callback);
            }
        }

        function searchPlaces() {
            if (!currCategory) {
                return;
            }
            
            placeOverlay.setMap(null);
            removeMarker();
            ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                displayPlaces(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                // No results
            } else if (status === kakao.maps.services.Status.ERROR) {
                // Error
            }
        }

        function displayPlaces(places) {
            for ( var i=0; i<places.length; i++ ) {
                var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x));
                (function(marker, place) {
                    kakao.maps.event.addListener(marker, 'click', function() {
                        displayPlaceInfo(place);
                    });
                })(marker, places[i]);
            }
        }

        function addMarker(position) {
            var marker = new kakao.maps.Marker({
                position: position
            });

            marker.setMap(map);
            markers.push(marker);

            return marker;
        }

        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }

        function displayPlaceInfo (place) {
            var content = '<div class="placeinfo">' +
                          '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   
            if (place.road_address_name) {
                content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                           '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            }  else {
                content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            }                
            content += '    <span class="tel">' + place.phone + '</span>' + 
                       '</div>' + 
                       '<div class="after"></div>';

            contentNode.innerHTML = content;
            placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
            placeOverlay.setMap(map);  
        }
        
        // Add a marker for current location
        var currentLocationMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(${location.latitude}, ${location.longitude}),
            map: map
        });

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
          <View style={styles.categoryContainer}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryButton}
                onPress={() => handleCategoryPress(cat.id)}
              >
                <Text>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <WebView
            ref={webviewRef}
            originWhitelist={["*"]}
            source={{ html: mapHtml }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => {
              // Handle messages from the WebView here if needed
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView HTTP error: ', nativeEvent);
            }}
          />
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
  },
  categoryButton: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
});

export default Map;
