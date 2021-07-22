navigator.geolocation.getCurrentPosition(getGeo);

function getGeo(event){
  console.log(event);
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;

  const mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  
    getMap(mapOption);
};

const $showMap = document.getElementById('showmap');
const $mapText = document.querySelector('.mappage__location__text ');
const geocoder = new kakao.maps.services.Geocoder();// 주소-좌표 변환 객체를 생성합니다
const pointArr = [];

async function getMap(mapOption){
  // 지도를 생성합니다    
  const map = new kakao.maps.Map($showMap, mapOption); 

  // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);

  // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
        }   
    });
  });
  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  });


  await loadMapPoint()
    .then(points => {
    getData(points)
  })
  .catch(console.log)

  function loadMapPoint(){
    return fetch('../data/mappoint.json')
    .then(response => response.json())
    .then(json => json.points)
  }

  function getData(points){
    pointArr.push(points);
  }
  showMarker(map, pointArr);
}

function showMarker(map ,pointArr){
  const imgSrc = '../img/loc.png';
  const imgSize = new kakao.maps.Size(18,26);
  const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
  let marker;

  for(let i = 0; i < pointArr[0].length; i++){
    let markerPos = new kakao.maps.LatLng(pointArr[0][i].lat, pointArr[0][i].lon);
    marker = new kakao.maps.Marker({
      position: markerPos,
      image: markerImg
    });

    marker.setMap(map);
  }

  console.log(marker)
  kakao.maps.event.addListener(marker, 'click', ()=>{
    console.log("aa")
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
          for(let i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                $mapText.innerHTML = result[i].address_name;
                break;
            }
        }
    }    
}
