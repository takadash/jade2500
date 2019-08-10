//var APPLICATIONKEY = "06db2b7bd610563bb16193294cdc6de82c19d2327ffeb8809f6dbfef3f0823f3";
//var CLIENTKEY      = "7517488f7998d991ae26599db9dd64e623bca6cd3ce2c856de334f344648905b";

//var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
//var TestData = ncmb.DataStore('example');

var map;
var stampclick = [];
var marker_g;
var circle;

//GoogleMapの表示
function initMap() {
  // #mapに地図を埋め込む
        map = new google.maps.Map(document.getElementById('map'), {
          center: { // 地図の中心を指定 (初期:千代田区)
            lat: 35.693944, // 緯度
            lng: 139.753611 // 経度
          },
          zoom: 15 // 地図のズームを指定
        });
};


// 現在位置プログラム
        function getMyPlace() {
        var output = document.getElementById("result");
        if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
          output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
        return;
      }
        function success(position) {
        var latitude  = position.coords.latitude;//緯度
        var longitude = position.coords.longitude;//経度
        //output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';
         
        // 位置情報
        var latlng = new google.maps.LatLng( latitude , longitude ) ;
        // マーカーの新規出力
        
        if(marker_g){
          marker_g.setMap(null);
        }
         marker_g = new google.maps.Marker( {
          map: map ,
          position: latlng ,
          icon: {
            url: 'human_pictures/human_black.png',//アイコンのURL
              anchor: new google.maps.Point(25,25),      
              scaledSize: new google.maps.Size(50, 50) //サイズ
          }
 
         
   
        });

        if(circle){
          circle.setMap(null);
        }
         circle = new google.maps.Circle({
         center: latlng,
         map: map ,
         radius: 100 , // 半径（m）
         fillColor: '#AFDFE7',   // 塗りつぶし色
         fillOpacity: 0.2,  // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
         strokeColor: '#3333FF',  // 外周色
         strokeOpacity: 1, // 外周透過度（0: 透明 ⇔ 1:不透明）
         strokeWeight: 5  // 外周太さ
        });
        circle.bindTo("center", marker_g, "position");
        
        
      };
      function error() {
       //エラーの場合
        output.innerHTML = "座標位置を取得できません";
      };
      navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
      }
      
