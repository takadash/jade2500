var APPLICATIONKEY = "26cec09426087ef56de1ba79b2291caccf7990b7165dac6910465d5334355ab5";
var CLIENTKEY      = "0ee8fb824e95468f1d7cff3d933ae7373c462f6f523d4bfdee63c7861856be23";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var kabukiData = ncmb.DataStore('kabuki');

var map;
var marker1 = [];
var infoWindow1 = [];
var currentInfoWindow = null;
var stampclick1 = [];
var stamplat1 = [];
var stamplng1 = [];
//var lat2;
//var lng2;
var maker_is_displayed = 0;
var cnt1=0;

kabukiData.order("createData",true)
  .fetchAll()
  .then(function(results){
//全件検索に成功した場合の処理
// alert('取得に成功');

var lat1 = [];
var lng1 = [];
var title = [];
var text = [];
var name = [];
var bibliography = [];
var volume =[];
var page = [];

for (var i = 0; i < results.length; i++,cnt1++) {
    var object = results[i];
    lat1[i] = object.lat;
    lng1[i] = object.lng;
    name[i] = object.name;
    title[i] = object.title;
    text[i] = object.text;
    bibliography[i] = object.bibliography;
    volume[i] = object.volume;
    page[i] = object.page;

    stamplat1[i] = lat1[i];
    stamplng1[i] = lng1[i];
    stampclick1[i] =  '<div id="stamp"><button onmouseup ="stamp_push1(' + i + ')">スタンプ</button></div>' + '<div id="btn">'
//ピンたて
    markerLatLng = {lat:lat1[i], lng:lng1[i]};
        marker1[i] = new google.maps.Marker({
          position: markerLatLng,
          map: map,
          visible: false, // 最初は非表示
          icon: {
		        url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }
        });
    
    infoWindow1[i] = new google.maps.InfoWindow({ // 吹き出しの追加
         content: '<div class="map">' + title[i] + '</div>' + '地名　　　　　　' + name[i] + '<br>参考文献　　　　' + bibliography[i] + volume[i] + page[i] + '<br>' + title[i] + text[i] + '<br>' + stampclick1[i]// 吹き出しに表示する内容
       });
       markerEvent1(i); // マーカーにクリックイベントを追加

  }

        // マーカーにクリックイベントを追加
function markerEvent1(i) {
    marker1[i].addListener('click', function() { // マーカーをクリックしたとき
    if(currentInfoWindow){ //currentInfoWindowに値があるならば
      currentInfoWindow.close();  //開いていた吹き出しを閉じる
    }
      infoWindow1[i].open(map, marker1[i]); // 吹き出しの表示
      currentInfoWindow = infoWindow1[i];
  });
}
  
})
.catch(function(error){
//全件検索に失敗した場合の処理
//alert('取得に失敗しました');
});

function stamp_push1(i){
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
   stamp_lat = stamplat1[i];
   stamp_lng = stamplng1[i];
   
 
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
    function kabuki() {
      // checkboxのElementを取得
      var cb = document.getElementById("cb1");

      if (cb.checked == true) {
        // チェックボックスがチェックされていればマーカ表示
        //alert('true');
        for(var i=0; i<cnt1; i++){
          marker1[i].setVisible(true);
          
        }
      } else {
        // チェックボックスがチェックされていなければ非表示
        //alert('false');
        for(var i=0; i<cnt1; i++){
          marker1[i].setVisible(false);
        }
      }
    }

