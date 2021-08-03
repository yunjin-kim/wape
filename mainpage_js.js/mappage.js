let mapOption;
let map;
let dragged = false;

if (navigator.geolocation) {
  getLocation();
  // setInterval(getLocation, 3000);
}
else {
  console.log('error');
}


function getLocation() {
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
  map = new kakao.maps.Map($showMap, mapOption);

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

  showMarker(pointArr);

}

const myLocArr = [];
setTimeout(() => {
  showWalkBanner();
  //내 위치가 변경되면 좌표를 반환한다. map을 재생성하는 것을 방지
  // navigator.geolocation.watchPosition(getMyLocation);
  //watchPosition로 하면 너무 부정확해서 setinerval로 보류
  setInterval(getMyLocation, 4000);
  function getMyLocation() {
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
    showMyLoc(myMapOption);
  };
}, 4000)

const $backToMyLoc = document.querySelector('.mappage__location__btn');

//클릭하면 dragged 가 false로 바뀌고 현재 위치로 바로 갈 수 있게
$backToMyLoc.addEventListener('click', () => {
  dragged = false;
  map.panTo(new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La));
})

//내 위치 표시
let currentMyLoc;
function showMyLoc(myMapOption) {
  console.log(dragged);
  console.log(myLocArr)
  const myLocIconImg = '../img/mylocation.png';
  const myLocIconSize = new kakao.maps.Size(10, 10);
  const myLocIcon = new kakao.maps.MarkerImage(myLocIconImg, myLocIconSize);
  let myLocPosition = new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La);

  if (dragged === false) {
    console.log('aaa')
    map.panTo(new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La));
  }

  if (myLocArr.length <= 0) {
    console.log('aa')
    currentMyLoc = new kakao.maps.Marker({
      map: map,
      position: myLocPosition,
      image: myLocIcon,
    });
    myLocArr.push(currentMyLoc);
    currentMyLoc.setMap(map);
  }
  else if (myLocArr.length > 0) {
    currentMyLoc.setPosition(myLocPosition);
    console.log('bb')
  }
}

const $selectCourse = document.querySelector('.mappage__walkload__course');
const $courseImage = document.querySelector('.mappage__walkload__course__img__img');
const $courseName = document.querySelector('.mappage__walkload__course__name');
const $courseLocation = document.querySelector('.mappage__walkload__course__location');
const $courseDistance = document.querySelector('.mappage__walkload__course__distance');
const $courseMoney = document.querySelector('.mappage__walkload__course__money');

//걷기 포인트 표시
function showMarker(pointArr) {
  const markImgSrc = '../img/loaction.png';
  const markImgSize = new kakao.maps.Size(18, 26);
  const markerImg = new kakao.maps.MarkerImage(markImgSrc, markImgSize);
  let markerArr = [];
  let marker;
  //걷기 포인트 표시
  for (let i = 0; i < pointArr[0].length; i++) {
    let markerPos = new kakao.maps.LatLng(pointArr[0][i].lat, pointArr[0][i].lon);
    marker = new kakao.maps.Marker({
      position: markerPos,
      image: markerImg
    });
    markerArr.push(marker);
    marker.setMap(map);
  }
  //배너에 정보 표시
  for (let i = 0; i < markerArr.length; i++) {
    markerArr[i].addListener('click', () => {
      $courseImage.setAttribute("src", pointArr[0][i].image)
      $courseName.textContent = pointArr[0][i].name;
      $courseLocation.textContent = pointArr[0][i].address;
      $courseDistance.textContent = pointArr[0][i].distance;
      $courseMoney.textContent = pointArr[0][i].money;
    })
  }
//걷기 코스 보여주기
  const arr = [];
for(let i = 0; i < pointArr[0].length; i++){
  let polygonPath = [];
  for(let j = 0; j < pointArr[0][i].mapPoints.length; j++){
    polygonPath.push(new kakao.maps.LatLng(pointArr[0][i].mapPoints[j][0], pointArr[0][i].mapPoints[j][1]));
  }
  arr.push(polygonPath);
}

for(let i = 0; i < arr.length; i++){
  var polygon = new kakao.maps.Polygon({
    path: arr[i],
    stroke: 5,
    strokeColor: '#42AB34',
    strokeOpacity: 1,
    strokeStyle: 'solid',
    fillColor: 'none',
    fillOpacity: 0
  });

  polygon.setMap(map);
}
    

  
  //드래그로 지도 이동을 완료했을 때 마지막 파라미터로 넘어온 함수를 호출
  kakao.maps.event.addListener(map, 'dragend', showWalkBanner)
}

// $selectCourse.addListener('click', () => {

    
// })





function showWalkBanner() {
  dragged = true;
  console.log(dragged)
  let mapCenter = map.getCenter();
  let mapLevel = map.getLevel();
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
