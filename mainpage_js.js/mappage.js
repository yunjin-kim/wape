const array = [];
// 드래그 해서 중심 좌표 변경할 수 있게 map을 어떻게 쓸수 있게
// let level1;
// let latlng1;
// kakao.maps.event.addListener(map, 'center_change', function(){
//   level1  = map.getLevel();
//   latlng1 = map.getCenter();
// })
// console.log(level1)
// console.log(latlng1)
let mapOption;
let map;

function getLocation(){
  navigator.geolocation.getCurrentPosition(getGeo);
}
function getGeo(event) {
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;

  mapOption = {
    center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
    level: 2 // 지도의 확대 레벨
  };
  getMap(mapOption);
};

const $showMap = document.getElementById('showmap');
const $mapText = document.querySelector('.mappage__location__text ');
const geocoder = new kakao.maps.services.Geocoder();// 주소-좌표 변환 객체를 생성합니다
console.log(geocoder)
const pointArr = [];

async function getMap(mapOption) {

  // 지도를 생성합니다
  if(array.length < 1){
    map = new kakao.maps.Map($showMap, mapOption);
    array.push(map);
  }
  else if(array.length >= 1){
    // mapOption = {
    //   center: new kakao.maps.LatLng(latlng1), // 지도의 중심좌표
    //   level:level1 // 지도의 확대 레벨
    // };
    map = new kakao.maps.Map($showMap, mapOption);
    array.push(map);
    array.shift();
  }
  console.log(array);
  console.log(array.length)

  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);


  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'idle', function () {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  });

  await loadMapPoint()
    .then(points => {
      getData(points)
    })
    .catch(console.log)

  function loadMapPoint() {
    return fetch('../data/mappoint.json')
      .then(response => response.json())
      .then(json => json.points)
  };

  function getData(points) {
    pointArr.push(points);
  };
  
  showMarker(map, pointArr);

}

setTimeout(()=>{
  navigator.geolocation.watchPosition(getMyLocation);

  function getMyLocation(){
    navigator.geolocation.getCurrentPosition(getMyGeo);
  }
  function getMyGeo(event) {
    const lat1 = event.coords.latitude;
    const lon1 = event.coords.longitude;
    console.log(lat1, lon1)
  
    myMapOption = {
      center: new kakao.maps.LatLng(lat1, lon1), // 지도의 중심좌표
      level: 2 // 지도의 확대 레벨
    };
    // myLocation(myMapOption);
    gps_tracking(myMapOption);
  };
},4000)


//내 위치 표시  
// function myLocation(myMapOption){
//       console.log("내 위치 탐색");
//       const locImg = '../img/mylocation.png';
//       const myLocSize = new kakao.maps.Size(14,14);
//       const myLocImg = new kakao.maps.MarkerImage(locImg, myLocSize);
//       let myLoc = new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La);
//       console.log(myMapOption.center.Ma, myMapOption.center.La);
//       let mypos = new kakao.maps.Marker({
//         map: map,
//         position: myLoc,
//         image: myLocImg,
//       })
//       mypos.setMap(map);
// }

function gps_tracking(myMapOption){
  console.log('위치 최신화')
      map.panTo(new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La));
      const gps_content = '<img src="../img/mylocation.png" />';
      var currentOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La),
          content: gps_content,
      });
      currentOverlay.setMap(map);
}


if(navigator.geolocation){
  getLocation();
  // setInterval(getLocation, 3000);
}
else{
  console.log('error');
}


const $courseImage = document.querySelector('.mappage__walkload__course__img__img');
const $courseName = document.querySelector('.mappage__walkload__course__name');
const $courseLocation = document.querySelector('.mappage__walkload__course__location');
const $courseDistance = document.querySelector('.mappage__walkload__course__distance');
const $courseMoney = document.querySelector('.mappage__walkload__course__money');
//걷기 포인트 표시
function showMarker(map, pointArr) {
  const imgSrc = '../img/loc.png';
  const imgSize = new kakao.maps.Size(18, 26);
  const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
  let markerArr = [];
  let marker;

  for (let i = 0; i < pointArr[0].length; i++) {
    let markerPos = new kakao.maps.LatLng(pointArr[0][i].lat, pointArr[0][i].lon);

    marker = new kakao.maps.Marker({
      position: markerPos,
      image: markerImg
    });
    markerArr.push(marker);
    marker.setMap(map);
  }

  for (let i = 0; i < markerArr.length; i++) {
    markerArr[i].addListener('click', () => {
      $courseImage.setAttribute("src", pointArr[0][i].image)
      $courseName.textContent = pointArr[0][i].name;
      $courseLocation.textContent = pointArr[0][i].address;
      $courseDistance.textContent = pointArr[0][i].distance;
      $courseMoney.textContent = pointArr[0][i].money;
    })
  }


  //드래그로 지도 이동을 완료했을 때 마지막 파라미터로 넘어온 함수를 호출
  kakao.maps.event.addListener(map, 'dragend', function () {
    let mapLevel = map.getLevel();
    let mapCenter = map.getCenter();
    let shortDistance = Number.MAX_SAFE_INTEGER;
    let nearMark;
    for (let i = 0; i < pointArr[0].length; i++) {
      let markToMark = Math.abs((Number(pointArr[0][i].lat) + Number(pointArr[0][i].lon)) - (mapCenter.Ma + mapCenter.La));
      if (markToMark < shortDistance) {
        shortDistance = markToMark;
        nearMark = pointArr[0][i];
      }
    }
    $courseImage.setAttribute("src", nearMark.image)
    $courseName.textContent = nearMark.name;
    $courseLocation.textContent = nearMark.address;
    $courseDistance.textContent = nearMark.distance;
    $courseMoney.textContent = nearMark.money;

    return mapLevel;
  })
}


function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    for (let i = 0; i < result.length; i++) {
      // 행정동의 region_type 값은 'H' 이므로
      if (result[i].region_type === 'H') {
        $mapText.innerHTML = result[i].address_name;
        break;
      }
    }
  }
}
