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
  //showWalkBanner error 처리!!!!
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
  }
}

const $selectCourse = document.querySelector('.mappage__walkload__course');
const $courseImage = document.querySelector('.mappage__walkload__course__img__img');
const $courseDesc = document.querySelector('.mappage__walkload__course__desc');
const $courseName = document.querySelector('.mappage__walkload__course__name');
const $courseLocation = document.querySelector('.mappage__walkload__course__location');
const $courseDistance = document.querySelector('.mappage__walkload__course__distance');
const $courseMoney = document.querySelector('.mappage__walkload__course__money');
// const $courseLat = document.querySelector('.mappage__walkload__course__lat');
const $selectCourse2 = document.querySelector('.mappage__walkload__course2');
const $courseImage2 = document.querySelector('.mappage__walkload__course2__img__img');
const $courseDesc2 = document.querySelector('.mappage__walkload__course2__desc');
const $courseName2 = document.querySelector('.mappage__walkload__course2__name');
const $courseLocation2 = document.querySelector('.mappage__walkload__course2__location');
const $courseDistance2 = document.querySelector('.mappage__walkload__course2__distance');
const $courseMoney2 = document.querySelector('.mappage__walkload__course2__money');


let polygon;
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
      $selectCourse.setAttribute('id', pointArr[0][i].lat);
      $courseImage.setAttribute("src", pointArr[0][i].image);
      $courseDesc.setAttribute('id', pointArr[0][i].index);
      $courseName.textContent = pointArr[0][i].name;
      $courseLocation.textContent = pointArr[0][i].address;
      $courseDistance.textContent = pointArr[0][i].distance;
      $courseMoney.textContent = pointArr[0][i].money;
      //이거를 selectCourse 이런데에 넣어서 해보기
      // $courseLat.textContent = pointArr[0][i].lat;
    })
  }
    //걷기 코스 보여주기
    const hiddenClass = 'hidden';
    let courseF = false;
    const courseArr = [];
    const polygonArr = [];
    for(let i = 0; i < pointArr[0].length; i++){
        let polygonPath = [];
      for(let j = 0; j < pointArr[0][i].mapPoints.length; j++){
        polygonPath.push(new kakao.maps.LatLng(pointArr[0][i].mapPoints[j][0], pointArr[0][i].mapPoints[j][1]));
      }
      courseArr.push(polygonPath);
    }
    let polygon;
    for(let i = 0; i < courseArr.length; i++){
        polygon = new kakao.maps.Polygon({
        path: courseArr[i],
        stroke: 5,
        strokeColor: '#42AB34',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: 'none',
        fillOpacity: 0
      });
      polygon.setMap(map);
      polygonArr.push(polygon);
    }
    console.log(polygonArr)
    console.log(polygon.D.r.childNodes[1].style)
    let courseStokeStyle;
    setTimeout(()=>{
      courseStokeStyle = (polygon.D.r.childNodes[1].style.cssText)
      for(let i = 1; i <= polygonArr.length; i++){
        console.log("AAA")
        polygon.D.r.childNodes[i].style.cssText = ""
      }
    },10)
    //$selectCourse 모든 부분에서 잘 동작하는지 체크 path[1,2,3,4]
    //event에서 클릭한 배너의 인덱스를 polygoncssText cssArr인덱스로 해서 다시 넣어준다

    //이미지하고 설명 누르면 잘 되지만 딴거 누르면 오류 path number가 제각각 나중에 폰으로 해보고 결정
  // $courseDesc.addEventListener('click', (event)=>{
  //   let couresFirstLat = Number(event.target.parentNode.offsetParent.childNodes[3].id);
  //   if(polygonArr[couresFirstLat].Rg[0].Ma === Number(event.path[4].parentElement.firstElementChild.id)){
  //     console.log("SIBAL")
  //     polygon.D.r.childNodes[couresFirstLat+1].style.cssText = `${courseStokeStyle}`;
  //   }
  // })

  $selectCourse.addEventListener('click', (event) => {
    let couresFirstLat = Number(event.target.parentNode.offsetParent.childNodes[3].id);

    for(let i = 1; i <= polygonArr.length; i++){
      console.log("aaa")
      if(polygon.D.r.childNodes[i].style.cssText){
        console.log("bbb")
        polygon.D.r.childNodes[i].style.cssText = "";
      }
    } 
    if(polygonArr[couresFirstLat].Rg[0].Ma === Number(event.path[2].parentElement.firstElementChild.id)){
      console.log("ccc")
      polygon.D.r.childNodes[couresFirstLat+1].style.cssText = `${courseStokeStyle}`;
    }
  })

  $selectCourse2.addEventListener('click', (event) => {
    console.log(event)
    let couresFirstLat = Number(event.target.parentNode.offsetParent.childNodes[3].id);

    for(let i = 1; i <= polygonArr.length; i++){
      console.log("aaa")
      if(polygon.D.r.childNodes[i].style.cssText){
        console.log("bbb")
        polygon.D.r.childNodes[i].style.cssText = "";
      }
    } 
    if(polygonArr[couresFirstLat].Rg[0].Ma === Number(event.path[2].parentElement.lastElementChild.id)){
      console.log("ccc")
      polygon.D.r.childNodes[couresFirstLat+1].style.cssText = `${courseStokeStyle}`;
    }
  })

  
  //드래그로 지도 이동을 완료했을 때 마지막 파라미터로 넘어온 함수를 호출
  kakao.maps.event.addListener(map, 'dragend', showWalkBanner)
}


//배너를 클릭하면 해당 배너의 코스로 위치할 수 있도록!!!!!
function showWalkBanner() {
  dragged = true;
  console.log(dragged)
  let mapCenter = map.getCenter();
  let mapLevel = map.getLevel();
  let shortDistance = Number.MAX_SAFE_INTEGER;
  let firstNearMark;
  let secondNearMark;
  let first = 0;
  let second = Number.MAX_SAFE_INTEGER;

  pointArr[0].forEach((e,i)=>{
    let markToMark = Math.abs((Number(e.lat) + Number(e.lon)) - (mapCenter.Ma + mapCenter.La));
    if(markToMark < shortDistance){
      shortDistance = markToMark;
      first = shortDistance;
      firstNearMark = pointArr[0][i];
    }
    else if(markToMark > shortDistance){
      if(markToMark < second){
        second = markToMark;
        secondNearMark = pointArr[0][i];
      }
    }
  })
  $selectCourse.setAttribute('id', firstNearMark.lat);
  $courseImage.setAttribute("src", firstNearMark.image)
  $courseDesc.setAttribute('id', firstNearMark.index);
  $courseName.textContent = firstNearMark.name;
  $courseLocation.textContent = firstNearMark.address;
  $courseDistance.textContent = firstNearMark.distance;
  $courseMoney.textContent = firstNearMark.money;

  $selectCourse2.setAttribute('id', secondNearMark.lat);
  $courseImage2.setAttribute("src", secondNearMark.image)
  $courseDesc2.setAttribute('id', secondNearMark.index);
  $courseName2.textContent = secondNearMark.name;
  $courseLocation2.textContent = secondNearMark.address;
  $courseDistance2.textContent = secondNearMark.distance;
  $courseMoney2.textContent = secondNearMark.money;
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
