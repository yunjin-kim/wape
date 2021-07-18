navigator.geolocation.getCurrentPosition(getGeo);
const showMap = document.getElementById('showmap');

function getGeo(event){
  console.log(event);
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;

  const mapOption = {
    center: new kakao.maps.LatLng(lat, lon), 
    level: 3
  };
  
  getMap(mapOption)
}

function getMap(mapOption){
  new kakao.maps.Map(showMap, mapOption)
}

var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({zindex:1});

searchAddrFromCoords(map.getCenter(), displayCenterInfo);

kakao.maps.event.addListener(map, 'click', function(mouseEvent){
  searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status){
    if(status === kakao.maps,services.Status.OK){
      var detailAddr = !!result[0].road_address ? '<div>도로명주소 : '+ result[0].road_address.address_name +'</div>' : '';
      detailAddr += '<div>지번주소 : '+ result[0].address.address_name +'</div>';

      var content = '<div class="bAddr">'+'<span class="title">벙정동 주소 정보</span>'+detailAddr+'</div>';

      marker.setPosition(mouseEvent.latLng);
      marker.setMap(map);

      infowindow.setContent(content);
      infowindow.setMap(map);

    }
  })
})

      kakao.maps.event.addListener(map, 'idle', function(){
        searchAddrFromCoords(map.getCenter(), displatCenterInfo);
      });

      function searchAddrFromCoords(coords, callback){
        geocoder.corod2RegionCode(coords.getLng(), callback);
      }

      function searchDetailAddrFromCoords(coords, callback){
        geocoder.coord2Address(coord.getLng(), coords.getLng(), callback);
      }

      function displayCenterInfo(result, status){
        if(status === kakao.maps.services.Status.OK){
          var infoDiv = document.getElementById('centerAddr');

          for(let i = 0; i < result.length; i++){
            if(result[i].region_type === 'H'){
              infoDiv.innerHTML = result[i].address_name;
              break;
            }
          }
        }
      }

  