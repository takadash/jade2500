var APPLICATIONKEY = "26cec09426087ef56de1ba79b2291caccf7990b7165dac6910465d5334355ab5";
var CLIENTKEY      = "0ee8fb824e95468f1d7cff3d933ae7373c462f6f523d4bfdee63c7861856be23";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var TestData = ncmb.DataStore('taiheimatoi');
//var taiheiStamp = ncmb.DataStore('stamp');

var map;
var marker4 = [];
var infoWindow4 = [];
var currentInfoWindow = null;
var stampclick4 = [];
var stamplat = [];
var stamplng = [];
var stamp_lat;
var stamp_lng;
var maker_is_displayed = 0;
var cnt=0;

TestData.order("createData",true)
  .fetchAll()
  .then(function(results){
//全件検索に成功した場合の処理
//alert('取得に成功');

var lat = [/*results.length*/];
var lng = [/*results.length*/];
var kumi = [/*results.length*/];
var town_name = [];
var center_town = [];
var center_moji = [];
var town_name_cur = [];
var tyo_in =[];
var zinsoku = [];

for (var i = 0; i < results.length; i++,cnt++) {
    var object = results[i];
    lat[i] = object.lat;
    lng[i] = object.lng;
    kumi[i] = object.kumi;
    town_name[i] = object.town_name;
    center_town[i] = object.center_town;
    center_moji[i] = object.center_moji;
    town_name_cur[i] = object.town_name_cur;
    tyo_in[i] = object.tyo_in;
    zinsoku[i] = object.zinsoku;

    stamplat[i] = lat[i];
    stamplng[i] = lng[i];
    stampclick4[i] =  '<button onclick="stamp_push4(' + i + ')">スタンプ' + '</button><div id="stamp"></div>'
    
    
//ピンたて
    markerLatLng = {lat:lat[i], lng:lng[i]};
        marker4[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map,
          visible: false, // 最初は非表示
          icon: {
		        url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });
    
    infoWindow4[i] = new google.maps.InfoWindow({ // 吹き出しの追加
         content: '<div class="map">' + kumi[i] + '</div>' + '町員　　　　　　' + tyo_in[i] + '<br>人足　　　　　　' + zinsoku[i] + '<br>中心地(文字配当図)' + center_moji[i] + '<br>中心地(先頭町名)　' + center_town[i] + '<br><br>'  + town_name[i] + '<br>' + stampclick4[i]// 吹き出しに表示する内容
       });
       markerEvent4(i); // マーカーにクリックイベントを追加

  }

$(document).on("click", "#button", function() {
  // clickイベントの処理
  //<div id="stamp"></div>
});

        // マーカーにクリックイベントを追加
function markerEvent4(i) {
    marker4[i].addListener('click', function() { // マーカーをクリックしたとき
    if(currentInfoWindow){ //currentInfoWindowに値があるならば
      currentInfoWindow.close();  //開いていた吹き出しを閉じる
    }
      infoWindow4[i].open(map, marker4[i]); // 吹き出しの表示
      currentInfoWindow = infoWindow4[i];
  });
}
  
})
.catch(function(error){
//全件検索に失敗した場合の処理
//alert('取得に失敗しました');
});

function stamp_push4(i){
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
   stamp_lat = stamplat[i];
   stamp_lng = stamplng[i];
   
 
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
       hyouzi.style.display ="none";

       btn_display.insertAdjacentHTML('afterbegin','<img src="human_pictures/human_red.png">');
     }else{
       //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
       alert('遠くてスタンプが押せませんでした');
     }
 };
      function error() {
       //エラーの場合
        hyouzi.innerHTML = "座標位置を取得できません";
      };
      navigator.geolocation.getCurrentPosition(Success, error);//成功と失敗を判断

}
    

// チェックボックスがクリックされると呼び出されるfunction
    function taihei() {
      // checkboxのElementを取得
      var cb = document.getElementById("cb4");

      if (cb.checked == true) {
        // チェックボックスがチェックされていればマーカ表示
        //alert('true');
        for(var i=0; i<cnt; i++){
          marker4[i].setVisible(true);
          
        }
      } else {
        // チェックボックスがチェックされていなければ非表示
        //alert('false');
        for(var i=0; i<cnt; i++){
          marker4[i].setVisible(false);
        }
      }
    }
