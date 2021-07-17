console.log(API_KEY)
const showMap = document.getElementById('showmap');

function getMap(lat, lon){
  console.log(lat, lon)
  return (lat, lon)
}
  var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), 
    level: 3
  };

  function mappp(){
    new kakao.maps.Map(showMap, mapOption)
  }
  
  mappp();