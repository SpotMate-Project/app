import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const Map: React.FC = () => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 부여되지 않았습니다.");
        setLoading(false);
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

  const sendMessageToReactNative = (page: string) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(page);
    }
  };

  // 웹페이지에서 전달된 메시지를 처리하는 함수
  const handleMessageFromWeb = (event: WebViewMessageEvent) => {
    const page = event.nativeEvent.data;
    if (page === "ReviewPage") {
      navigation.navigate("ReviewPage"); // ReviewPage.tsx로 네비게이션
    }
  };

  const mapHtml = location
    ? `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>키워드로 장소검색하고 목록으로 표출하기</title>
      <style>
      .map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
      .map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
      .map_wrap {position:relative;width:100%;height:1800px;}
      #menu_wrap {position:absolute;top:10px;left:10px;width:25%;height:25%;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
      .bg_white {background:#fff;}
      #menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
      #menu_wrap .option{text-align: center;}
      #menu_wrap .option p {margin:10px 0;}  
      #menu_wrap .option button {margin-left:5px;}
      #placesList {max-height: calc(100% - 60px); overflow-y: auto;}
      #placesList li {list-style: none;}
      #placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
      #placesList .item span {display: block;margin-top:4px;}
      #placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
      #placesList .item .info{padding:10px 0 10px 55px;}
      #placesList .info .gray {color:#8a8a8a;}
      #placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
      #placesList .info .tel {color:#009900;}
      #placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
      #placesList .item .marker_1 {background-position: 0 -10px;}
      #placesList .item .marker_2 {background-position: 0 -56px;}
      #placesList .item .marker_3 {background-position: 0 -102px}
      #placesList .item .marker_4 {background-position: 0 -148px;}
      #placesList .item .marker_5 {background-position: 0 -194px;}
      #placesList .item .marker_6 {background-position: 0 -240px;}
      #placesList .item .marker_7 {background-position: 0 -286px;}
      #placesList .item .marker_8 {background-position: 0 -332px;}
      #placesList .item .marker_9 {background-position: 0 -378px;}
      #placesList .item .marker_10 {background-position: 0 -423px;}
      #placesList .item .marker_11 {background-position: 0 -470px;}
      #placesList .item .marker_12 {background-position: 0 -516px;}
      #placesList .item .marker_13 {background-position: 0 -562px;}
      #placesList .item .marker_14 {background-position: 0 -608px;}
      #placesList .item .marker_15 {background-position: 0 -654px;}
      #pagination {margin:10px auto;text-align: center;}
      #pagination a {display:inline-block;margin-right:10px;}
      #pagination .on {font-weight: bold; cursor: default;color:#777;}
    </style>
  </head>
  <body>
  <div class="map_wrap">
  <div id="map" style="width:100%; height:100%;"></div>

  
      <div id="menu_wrap" class="bg_white">
          <div class="option">
              <div>
                  <form onsubmit="searchPlaces(); return false;">
                      키워드 : <input type="text" id="keyword" size="15"> 
                      <button type="submit">검색하기</button> 
                  </form>
              </div>
          </div>
          <hr>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
      </div>
  </div>
  
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e19c9e836c0df1b8953cd661cbec4df2&libraries=services"></script>
  <script>
  var markers = [];
  
  var mapContainer = document.getElementById('map'), 
      mapOption = { 
          center: new kakao.maps.LatLng(${location.latitude}, ${location.longitude}), 
          level: 3 
      };
  
  var map = new kakao.maps.Map(mapContainer, mapOption); 
  
  var ps = new kakao.maps.services.Places();  
  
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  
  function searchPlaces() {
      var keyword = document.getElementById('keyword').value;
  
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
      }
  
      ps.keywordSearch(keyword, placesSearchCB, {
        location: new kakao.maps.LatLng(${location.latitude}, ${location.longitude})
      }); 
  }
  
  function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data);
          displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
      } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
      }
  }
  
  function displayPlaces(places) {
      var listEl = document.getElementById('placesList'), 
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(), 
      bounds = new kakao.maps.LatLngBounds(), 
      listStr = '';
      
      removeAllChildNods(listEl);
      removeMarker();
      
      for ( var i=0; i<places.length; i++ ) {
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
              marker = addMarker(placePosition, i), 
              itemEl = getListItem(i, places[i]);
  
          bounds.extend(placePosition);
  
          (function(marker, title) {
              kakao.maps.event.addListener(marker, 'click', function() {
                  displayInfowindow(marker, title);
                  
              });
  
              itemEl.onclick =  function () {
                  displayInfowindow(marker, title);
              };
          })(marker, places[i].place_name);
  
          fragment.appendChild(itemEl);
      }
  
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
      map.setBounds(bounds);
  }
  
  function getListItem(index, places) {
      var el = document.createElement('li'),
      itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                  '<div class="info">' +
                  '   <h5>' + places.place_name + '</h5>';
  
      if (places.road_address_name) {
          itemStr += '    <span>' + places.road_address_name + '</span>' +
                      '   <span class="jibun gray">' +  places.address_name  + '</span>';
      } else {
          itemStr += '    <span>' +  places.address_name  + '</span>'; 
      }
                  
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                  '</div>';           
  
      el.innerHTML = itemStr;
      el.className = 'item';
  
      return el;
  }
  
  function addMarker(position, idx) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
          imageSize = new kakao.maps.Size(36, 37),  
          imgOptions =  {
              spriteSize : new kakao.maps.Size(36, 691), 
              spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), 
              offset: new kakao.maps.Point(13, 37) 
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
  
  function addCurrentLocationMarker(position) {
      var marker = new kakao.maps.Marker({
          position: position,
          image: new kakao.maps.MarkerImage(
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
              new kakao.maps.Size(24, 35)
          )
      });
  
      marker.setMap(map);
      markers.push(marker);
  }
  
  function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
  }
  
  function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
          fragment = document.createDocumentFragment(),
          i; 
  
      while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild (paginationEl.lastChild);
      }
  
      for (i=1; i<=pagination.last; i++) {
          var el = document.createElement('a');
          el.href = "#";
          el.innerHTML = i;
  
          if (i===pagination.current) {
              el.className = 'on';
          } else {
              el.onclick = (function(i) {
                  return function() {
                      pagination.gotoPage(i);
                  }
              })(i);
          }
  
          fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
  }
  
  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px; z-index:1; background-color: white; text-align: center;">' +
        '<div style="padding:5px;">' + title + '</div>' +
        '<hr>' +
        '<button style="display: block; padding:5px;" onclick="handleClick()">' + title + ' 리뷰쓰기' + '</button>' +
        '<button style="display: block; padding:5px;" onclick="handleReviewClick()">' + title + ' 리뷰보기' + '</button>' +
    '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 function handleClick(title){
    window.ReactNativeWebView.postMessage('리뷰쓰기');
 }

 function handleReviewClick(){
    window.ReactNativeWebView.postMessage('리뷰보기');
 }

  
  function removeAllChildNods(el) {   
      while (el.hasChildNodes()) {
          el.removeChild (el.lastChild);
      }
  }

  addCurrentLocationMarker(new kakao.maps.LatLng(${location.latitude}, ${location.longitude}));
  </script>
  </body>
  </html>
  `
    : null;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
  webview: {
    flex: 1,
  },
});

export default Map;
