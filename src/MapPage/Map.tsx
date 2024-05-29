import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const Map: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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

  const mapHtml = location
    ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=e19c9e836c0df1b8953cd661cbec4df2"></script>
      <style>
        html, body {width: 100%; height: 100%; margin: 0; padding: 0;}
        #map {width: 100%; height: 100%;}
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
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          style={styles.map}
        />
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
});

export default Map;
