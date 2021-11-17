let map;
let dragged = false;

(function enterMapPage() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getGeo);
  }
  else {
    console.log('error');
  }
})();

function getGeo(event) {
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;
  let mapOption;
  try {
    mapOption = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 2 // 지도의 확대 레벨
    };
  }
  catch (e) {
    mapErrorModal();
  }

  getMap(mapOption);
};

const $showMap = document.getElementById('showmap');
const $mapText = document.querySelector('.mappage__location__text ');
const geocoder = new kakao.maps.services.Geocoder();// 주소-좌표 변환 객체를 생성합니다
const pointArr = [];

function getMap(mapOption) {
  // 지도를 생성합니다
  map = new kakao.maps.Map($showMap, mapOption);

  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);

  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'idle', function () {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  });

  getBannerData();
}

async function getBannerData() {
  let canLoadBanner = false;
  
  try {
    const mapPointResponse = await fetch('../data/mappoint.json');
    const maoPointData = await mapPointResponse.json();
    pointArr.push(maoPointData.points);
    canLoadBanner = true;

    refreshMyLoaction(canLoadBanner);
    showBannerInfo(pointArr);
    setMapPolygon(pointArr);
    showWalkBanner();
  }
  catch (e) {
    mapErrorModal();
  }
}

function mapErrorModal() {
  const $mapWrap = document.querySelector(".mapWrap");
  const mapErrorModalDiv = document.createElement('div');
  mapErrorModalDiv.classList.add("mapErrorModal")

  const mapErrorModalText = document.createElement('p');
  mapErrorModalText.classList.add("mapErrorModalText");
  mapErrorModalText.innerHTML = "데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";

  mapErrorModalDiv.append(mapErrorModalText);
  $mapWrap.append(mapErrorModalDiv);
}

function refreshMyLoaction(canLoadBanner) {
  if (canLoadBanner === true) {
    getMyLocationData();
    //watchPosition로 하면 너무 부정확해서 setinerval로 보류
    setInterval(getMyLocationData, 4000);
  }
}

function getMyLocationData() {
  navigator.geolocation.getCurrentPosition(getMyGeo);
}

function getMyGeo(event) {
  const lat1 = event.coords.latitude;
  const lon1 = event.coords.longitude;
  let myMapOption = {
    center: new kakao.maps.LatLng(lat1, lon1), // 지도의 중심좌표
    level: 2 // 지도의 확대 레벨
  };

  showMyLoction(myMapOption);
};

const $backToMyLoc = document.querySelector('.mappage__location__btn');

//클릭하면 dragged 가 false로 바뀌고 현재 위치로 바로 갈 수 있게
$backToMyLoc.addEventListener('click', () => {
  dragged = false;
  map.panTo(new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La));
})

//내 위치 표시
const myLocArr = [];
let currentMyLoc;
function showMyLoction(myMapOption) {
  const myLocIconImg = '../img/mylocation.png';
  const myLocIconSize = new kakao.maps.Size(10, 10);
  const myLocIcon = new kakao.maps.MarkerImage(myLocIconImg, myLocIconSize);
  let myLocPosition = new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La);

  if (dragged === false) {
    map.panTo(new kakao.maps.LatLng(myMapOption.center.Ma, myMapOption.center.La));
  }
  if (myLocArr.length <= 0) {
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

const $firstSelectCourse = document.querySelector('.mappage__walkload__course');
const $firstSourseImage = document.querySelector('.mappage__walkload__course__img__img');
const $firstCourseDesc = document.querySelector('.mappage__walkload__course__desc');
const $firstCourseName = document.querySelector('.mappage__walkload__course__name');
const $firstCourseLocation = document.querySelector('.mappage__walkload__course__location');
const $firstCourseDistance = document.querySelector('.mappage__walkload__course__distance');
const $firstCourseMoney = document.querySelector('.mappage__walkload__course__money');

const $secondSelectCourse = document.querySelector('.mappage__walkload__course2');
const $secondCourseImageSecond = document.querySelector('.mappage__walkload__course2__img__img');
const $secondCourseDesc = document.querySelector('.mappage__walkload__course2__desc');
const $secondCourseName = document.querySelector('.mappage__walkload__course2__name');
const $secondCourseLocation = document.querySelector('.mappage__walkload__course2__location');
const $secondCourseDistance = document.querySelector('.mappage__walkload__course2__distance');
const $secondCourseMoney = document.querySelector('.mappage__walkload__course2__money');

function showBannerInfo(pointArr) {
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
      $firstSelectCourse.setAttribute('id', pointArr[0][i].lat);
      $firstSourseImage.setAttribute("src", pointArr[0][i].image);
      $firstCourseDesc.setAttribute('id', pointArr[0][i].index);
      $firstCourseName.textContent = pointArr[0][i].name;
      $firstCourseLocation.textContent = pointArr[0][i].address;
      $firstCourseDistance.textContent = pointArr[0][i].distance;
      $firstCourseMoney.textContent = pointArr[0][i].money;
    })
  }
}

function setMapPolygon(pointArr) {
  const courseArr = [];
  const polygonArr = [];
  let polygon;

  for (let i = 0; i < pointArr[0].length; i++) {
    let polygonPath = [];
    for (let j = 0; j < pointArr[0][i].mapPoints.length; j++) {
      polygonPath.push(new kakao.maps.LatLng(pointArr[0][i].mapPoints[j][0], pointArr[0][i].mapPoints[j][1]));
    }
    courseArr.push(polygonPath);
  }

  for (let i = 0; i < courseArr.length; i++) {
    polygon = new kakao.maps.Polygon({
      path: courseArr[i], stroke: 5, strokeColor: '#42AB34', strokeOpacity: 1, strokeStyle: 'solid', fillColor: 'none', fillOpacity: 0
    });
    polygon.setMap(map);
    polygonArr.push(polygon);
  }

  showMapPoint(polygon, polygonArr)
}

//걷기 포인트 표시
function showMapPoint(polygon, polygonArr) {
  let courseStokeStyle = (polygon.G.r.childNodes[1].style.cssText);

  for (let i = 1; i <= polygonArr.length; i++) {
    polygon.G.r.childNodes[i].style.cssText = "";
  }
    
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

  //첫번째 배너 클릭하면 배너의 코스 보여주고 코스 출발 지점으로 이동
  $firstSelectCourse.addEventListener('click', (event) => {
    let couresFirstLat = Number(event.target.parentNode.offsetParent.childNodes[3].id);
    map.panTo(new kakao.maps.LatLng(polygonArr[couresFirstLat].Sg[0].Ma, polygonArr[couresFirstLat].Sg[0].La));

    for(let i = 1; i <= polygonArr.length; i++) {
      if(polygon.G.r.childNodes[i].style.cssText) {
        polygon.G.r.childNodes[i].style.cssText = "";
      }
    }
    if(polygonArr[couresFirstLat].Sg[0].Ma === Number(event.path[2].parentElement.firstElementChild.id)) {
      polygon.G.r.childNodes[couresFirstLat+1].style.cssText = `${courseStokeStyle}`;
    }
  })

  //두번째 배너 클릭하면 배너의 코스 보여주고 코스 출발 지점으로 이동
  $secondSelectCourse.addEventListener('click', (event) => {
    let couresFirstLat = Number(event.target.parentNode.offsetParent.childNodes[3].id);
    map.panTo(new kakao.maps.LatLng(polygonArr[couresFirstLat].Sg[0].Ma, polygonArr[couresFirstLat].Sg[0].La));

    for(let i = 1; i <= polygonArr.length; i++) {
      if(polygon.G.r.childNodes[i].style.cssText) {
        polygon.G.r.childNodes[i].style.cssText = "";
      }
    } 
    if(polygonArr[couresFirstLat].Sg[0].Ma === Number(event.path[2].parentElement.lastElementChild.id)) {
      polygon.G.r.childNodes[couresFirstLat+1].style.cssText = `${courseStokeStyle}`;
    }
  })
  
  //드래그로 지도 이동을 완료했을 때 마지막 파라미터로 넘어온 함수를 호출
  kakao.maps.event.addListener(map, 'dragend', showWalkBanner);
}

function showWalkBanner() {
  dragged = true;
  let mapCenter = map.getCenter();
  let shortDistance = Number.MAX_SAFE_INTEGER;
  let firstNearMark;
  let secondNearMark;
  let secondShortDistance = Number.MAX_SAFE_INTEGER;

  pointArr[0].forEach((e, i) => {
    let markToMark = Math.abs((Number(e.lat) + Number(e.lon)) - (mapCenter.Ma + mapCenter.La));
    if(markToMark < shortDistance) {
      shortDistance = markToMark;
      firstNearMark = pointArr[0][i];
    }
    else if(markToMark > shortDistance) {
      if(markToMark < secondShortDistance) {
        secondShortDistance = markToMark;
        secondNearMark = pointArr[0][i];
      }
    }
  })

  $firstSelectCourse.setAttribute('id', firstNearMark.lat);
  $firstSourseImage.setAttribute("src", firstNearMark.image)
  $firstCourseDesc.setAttribute('id', firstNearMark.index);
  $firstCourseName.textContent = firstNearMark.name;
  $firstCourseLocation.textContent = firstNearMark.address;
  $firstCourseDistance.textContent = firstNearMark.distance;
  $firstCourseMoney.textContent = firstNearMark.money;

  $secondSelectCourse.setAttribute('id', secondNearMark.lat);
  $secondCourseImageSecond.setAttribute("src", secondNearMark.image)
  $secondCourseDesc.setAttribute('id', secondNearMark.index);
  $secondCourseName.textContent = secondNearMark.name;
  $secondCourseLocation.textContent = secondNearMark.address;
  $secondCourseDistance.textContent = secondNearMark.distance;
  $secondCourseMoney.textContent = secondNearMark.money;
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
