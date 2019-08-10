var APPLICATIONKEY = "26cec09426087ef56de1ba79b2291caccf7990b7165dac6910465d5334355ab5";
var CLIENTKEY      = "0ee8fb824e95468f1d7cff3d933ae7373c462f6f523d4bfdee63c7861856be23";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var kyodenData = ncmb.DataStore('kyoden');

var map;
var marker2 = [];
var infoWindow2 = [];
var currentInfoWindow = null;
var stampclick2 = [];
var stamplat2 = [];
var stamplng2 = [];
//var lat2;
//var lng2;
var maker_is_displayed = 0;
var cnt2=0;

kyodenData.order("createData",true)
  .fetchAll()
  .then(function(results){
//全件検索に成功した場合の処理


var lat2 = [];
var lng2 = [];
var title2 = [];
var text2 = [];
var name2 = [];
var bibliography2 = [];
var volume2 =[];
var page2 = [];

for (var i = 0; i < results.length; i++,cnt2++) {
    var object = results[i];
    lat2[i] = object.lat;
    lng2[i] = object.lng;
    name2[i] = object.name;
    title2[i] = object.title;
    text2[i] = object.text;
    bibliography2[i] = object.biblio;
    volume2[i] = object.volume;
    page2[i] = object.page;

    stamplat2[i] = lat2[i];
    stamplng2[i] = lng2[i];
    stampclick2[i] =  '<div id="stamp"><button onclick="stamp_push2(' + i + ')">スタンプ</button></div>' + '<div id="btn">'
//ピンたて
    markerLatLng = {lat:lat2[i], lng:lng2[i]};
        marker2[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map,
          visible: false, // 最初は非表示
          icon: {
		        url:'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
          }
        });
    
    infoWindow2[i] = new google.maps.InfoWindow({ // 吹き出しの追加
         content: '<div class="map">' + title2[i] + '</div>' + '地名　　　　　　' + name2[i] + '<br>参考文献　　　　' + bibliography2[i] + volume2[i] + page2[i] + '<br>' + title2[i] + text2[i] + '<br>' + stampclick2[i]// 吹き出しに表示する内容
       });
       markerEvent2(i); // マーカーにクリックイベントを追加

  }

        // マーカーにクリックイベントを追加
function markerEvent2(i) {
    marker2[i].addListener('click', function() { // マーカーをクリックしたとき
    if(currentInfoWindow){ //currentInfoWindowに値があるならば
      currentInfoWindow.close();  //開いていた吹き出しを閉じる
    }
      infoWindow2[i].open(map, marker2[i]); // 吹き出しの表示
      currentInfoWindow = infoWindow2[i];
  });
}
  
})
.catch(function(error){
//全件検索に失敗した場合の処理
//alert('取得に失敗しました');
});

    
    function stamp_push2(i){
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
   stamp_lat = stamplat2[i];
   stamp_lng = stamplng2[i];
   
 
   // 現在位置プログラム
        if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
          hyouzi.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
        return;
      }
        function Success(pos) {
        var now_lat  = pos.coords.latitude;//緯度
        var now_lng = pos.coords.longitude;//経度
         
        // 位置情報
        var latlng1 = new google.maps.LatLng( now_lat , now_lng ) ;
        
        //距離の計算//
     function getDistance(now_lat, now_lng, stamp_lat, stamp_lng) {
 
        function radians(deg){
           return deg * Math.PI / 180;
        }
 
        var result = 6378.14 * Math.acos(Math.cos(radians(now_lat))* 
         Math.cos(radians(stamp_lat))*
         Math.cos(radians(stamp_lng)-radians(now_lng))+
         Math.sin(radians(now_lat))*
         Math.sin(radians(stamp_lat)));
 
         result = result / 0.62137;
         
         if(result <= 1.0){
           return true;
         }
         return false;
     }
     //結果
     var now_success = getDistance(now_lat,now_lng,stamp_lat,stamp_lng);

     if(now_success == true){
       //hyouzi.innerHTML('<img src="human_pictures/human_red.png">');
       hyouzi.style.display ="none";

       btn_display.insertAdjacentHTML('afterbegin','<img src="human_pictures/human_red.png">');
     }else{
       alert('遠くてスタンプが押せませんでした');
       //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
     }
 };
      function error() {
       //エラーの場合
        hyouzi.innerHTML = "座標位置を取得できません";
      };
      navigator.geolocation.getCurrentPosition(Success, error);//成功と失敗を判断

}

// チェックボックスがクリックされると呼び出されるfunction
    function kyoden() {
      // checkboxのElementを取得
      var cb2 = document.getElementById("cb2");

      if (cb2.checked == true) {
        // チェックボックスがチェックされていればマーカ表示
        //alert('true');
        for(var i=0; i<cnt2; i++){
          marker2[i].setVisible(true);
          
        }
      } else {
        // チェックボックスがチェックされていなければ非表示
        //alert('false');
        for(var i=0; i<cnt2; i++){
          marker2[i].setVisible(false);
        }
      }
    }



