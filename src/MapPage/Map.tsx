import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

const Map: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 거부됨", "위치 정보 접근 권한이 필요합니다.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    })();
  }, []);

  const getMapHtml = (latitude: number, longitude: number) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Naver Map</title>
    </head>
    <body>
      <div id="map" style="width:100%;height:100vh;"></div>
      <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=fl22ic9fqgg"></script>
      <script>
        var mapOptions = {
          center: new naver.maps.LatLng(${latitude}, ${longitude}),
          zoom: 10
        };
        var map = new naver.maps.Map('map', mapOptions);
      </script>
    </body>
    </html>
  `;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <WebView
          originWhitelist={["*"]}
          source={{
            html: getMapHtml(
              location.coords.latitude,
              location.coords.longitude
            ),
          }}
          style={{ flex: 1 }}
        />
      ) : (
        <Text>위치 정보를 가져올 수 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
