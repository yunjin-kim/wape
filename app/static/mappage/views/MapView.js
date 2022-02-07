import { on, qs } from "../../helper.js";
import View from "./View.js";

export default class MapView extends View {
  constructor() {
    super(qs(".mapWrap"));
    this.map;
    this.mapOption;
    this.currentLocationArr = [];
    this.dragged = false;
    this.canLoadBanner = false;
    this.geocoder = new kakao.maps.services.Geocoder();// 주소-좌표 변환 객체를 생성합니다
    this.courseLine;
    this.courseLineArr = [];
    this.courseStokeStyle = `stroke: rgb(66, 171, 52); stroke-opacity: 1; stroke-width: 3px; color: rgb(66, 171, 52); stroke-linecap: round; display: block`;
    this.courseArr = [];

    this.template = new Template();

    this.firstCourseElement = qs('.mappage__walkload__course');
    this.firstCourseImage = qs('.mappage__walkload__course__img__img');
    this.firstCourseDesc = qs('.mappage__walkload__course__desc');
    this.firstCourseName = qs('.mappage__walkload__course__name');
    this.firstCourseLocation = qs('.mappage__walkload__course__location');
    this.firstCourseDistance = qs('.mappage__walkload__course__distance');
    this.firstCourseMoney = qs('.mappage__walkload__course__money');
    this.secondCourseElement = qs('.mappage__walkload__course2');
    this.secondCourseImage = qs('.mappage__walkload__course2__img__img');
    this.secondCourseDesc = qs('.mappage__walkload__course2__desc');
    this.secondCourseName = qs('.mappage__walkload__course2__name');
    this.secondCourseLocation = qs('.mappage__walkload__course2__location');
    this.secondCourseDistance = qs('.mappage__walkload__course2__distance');
    this.secondCourseMoney = qs('.mappage__walkload__course2__money');

    this.bindEvent();

  }

  renderMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.mapOption = {
          center: new kakao.maps.LatLng(this.latitude, this.longitude),
          level: 2
        }
        this.getMap();
        this.backToMyLocation();
      })
    } else {
      console.log('error')
    }
  }

  getMap() {
    const mapElement = qs("#showmap");
    this.map = new kakao.maps.Map(mapElement, this.mapOption);
    this.searchAddrFromCoords(this.displayCenterInfo); // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다

    kakao.maps.event.addListener(this.map, 'idle', () => { // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합
      this.searchAddrFromCoords(this.displayCenterInfo)
    });

    this.getWalkCourse();
  }

  searchAddrFromCoords(callback) {// 좌표로 행정동 주소 정보를 요청
    this.geocoder.coord2RegionCode(this.map.getCenter().La, this.map.getCenter().Ma, callback);         
  }

  
  displayCenterInfo(result, status) {// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수
    const locationInfoElement = qs(".mappage__location__text");

    if (status === kakao.maps.services.Status.OK) {
      locationInfoElement.innerHTML = _.filter(v => v.region_type === "H", result)[0].address_name;
    }
  }

  refreshMyLoaction() {
    // if (this.canLoadBanner === true) {
      this.getMyLocationData();
      //watchPosition로 하면 너무 부정확해서 setinerval로 보류
      setInterval(this.getMyLocationData.bind(this), 4000);
    // }
  }

  getMyLocationData() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLatitude = position.coords.latitude;
      this.currentLongitude = position.coords.longitude;
      this.myMapOption = {
        center: new kakao.maps.LatLng(this.currentLatitude, this.currentLongitude), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
      };
      this.showMyLoction();
    })
  }

  //내 위치 표시
  showMyLoction() {
    const currentLocationIconImage = '../img/mylocation.png';
    const currentLocationIconSize = new kakao.maps.Size(10, 10);
    const currentLocationIcon = new kakao.maps.MarkerImage(currentLocationIconImage, currentLocationIconSize);
    const currentLocationPosition = new kakao.maps.LatLng(this.currentLatitude, this.currentLongitude);

    if (this.dragged === false && this.map) {
      this.map.panTo(new kakao.maps.LatLng(this.currentLatitude, this.currentLongitude))
    }

    if (this.currentLocationArr.length <= 0 && this.map) {
      this.currentMyLoc = new kakao.maps.Marker({
        map: this.map,
        position: currentLocationPosition,
        image: currentLocationIcon,
      });
      this.currentLocationArr.push(this.currentMyLoc);
      this.currentMyLoc.setMap(this.map);
    } else if (this.currentLocationArr.length > 0) {
      this.currentMyLoc.setPosition(currentLocationPosition)
    }
  }


  async getWalkCourse() {
    try {
      const walkCourseResponse = await fetch('https://yunjin-kim.github.io/mappoint.json');
      const walkCourseData = await walkCourseResponse.json();
      this.walkCourseList = walkCourseData.points;
      this.canLoadBanner = true;

      this.showBannerInfo();
      this.setMapPolygon();
      this.showWalkBanner();
    } catch (e) {
      this.mapErrorModal()
      console.log(e)
    }
  }

  mapErrorModal() {
    const $mapWrap = document.querySelector(".mapWrap");
    const mapErrorModalDiv = document.createElement('div');
    mapErrorModalDiv.classList.add("mapErrorModal")

    const mapErrorModalText = document.createElement('p');
    mapErrorModalText.classList.add("mapErrorModalText")
    mapErrorModalText.innerHTML = "데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요"

    mapErrorModalDiv.append(mapErrorModalText)
    $mapWrap.append(mapErrorModalDiv)
  }

  

  backToMyLocation() {
    const currentLocationIcon = qs('.mappage__location__btn');
    // 클릭하면 dragged 가 false로 바뀌고 현재 위치로 바로 갈 수 있게
    on(currentLocationIcon, 'click', () => this.handleCurrentLocation());
  }

  handleCurrentLocation() {
    this.dragged = false;
    this.map.panTo(new kakao.maps.LatLng(this.currentLatitude, this.currentLongitude))
  }

  showBannerInfo() {
    const markImgSrc = '../img/loaction.png';
    const markImgSize = new kakao.maps.Size(18, 26);
    const markerImg = new kakao.maps.MarkerImage(markImgSrc, markImgSize);
    let markerArr = [];
    let marker;
    //걷기 포인트 표시
    for (let i = 0; i < this.walkCourseList[0].length; i++) {
      let markerPosition = new kakao.maps.LatLng(this.walkCourseList[0][i].lat, this.walkCourseList[0][i].lon);
      marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImg
      });
      markerArr.push(marker)
      marker.setMap(this.map)
    }
    //배너에 정보 표시
    for (let i = 0; i < markerArr.length; i++) {
      markerArr[i].addListener('click', () => {
        this.firstCourseElement.setAttribute('id', walkCouseList[0][i].lat);
        this.firstCourseImage.setAttribute("src", walkCouseList[0][i].image);
        this.firstCourseDesc.setAttribute('id', walkCouseList[0][i].index);
        this.firstCourseName.textContent = walkCouseList[0][i].name;
        this.firstCourseLocation.textContent = walkCouseList[0][i].address;
        this.firstCourseDistance.textContent = walkCouseList[0][i].distance;
        this.firstCourseMoney.textContent = walkCouseList[0][i].money;
      })
    }
  }

  setMapPolygon() {
    for (let i = 0; i < this.walkCourseList[0].length; i++) {
      let polygonPath = [];
      for (let j = 0; j < this.walkCourseList[0][i].mapPoints.length; j++) {
        polygonPath.push(new kakao.maps.LatLng(this.walkCourseList[0][i].mapPoints[j][0], this.walkCourseList[0][i].mapPoints[j][1]))
      }
      this.courseArr.push(polygonPath)
    }
  
    for (let i = 0; i < this.courseArr.length; i++) {
      this.courseLine = new kakao.maps.Polygon({
        path: this.courseArr[i], stroke: 5, strokeColor: '#42AB34', strokeOpacity: 1, strokeStyle: 'solid', fillColor: 'none', fillOpacity: 0, 
      });
      this.courseLine.setMap(this.map)
      this.courseLineArr.push(this.courseLine)
    }
  
  }

  bindEvent() {
    on(this.firstCourseElement, 'click', (event) => this.handleFirstWalkCourse(event));
    on(this.secondCourseElement, 'click', (event) => this.handleSecondWalkCourse(event));
  }

  handleFirstWalkCourse(event) {
    const courseIndex = Number(event.target.parentNode.offsetParent.childNodes[3].id);
    this.map.panTo(new kakao.maps.LatLng(this.courseLineArr[courseIndex].Sg[0].Ma, this.courseLineArr[courseIndex].Sg[0].La))
  
    for (let i = 1; i <= this.courseLineArr.length; i++) {
      if (this.courseLine.G.r.childNodes[i].style.cssText) {
        this.courseLine.G.r.childNodes[i].style.cssText = "";
      }
    }
    if (this.courseLineArr[courseIndex].Sg[0].Ma === Number(event.path[2].parentElement.firstElementChild.id)) {
      this.courseLine.G.r.childNodes[courseIndex+1].style.cssText = `${this.courseStokeStyle}`;
    }
  }

  handleSecondWalkCourse(event) {
    const courseIndex = Number(event.target.parentNode.offsetParent.childNodes[3].id);
    this.map.panTo(new kakao.maps.LatLng(this.courseLineArr[courseIndex].Sg[0].Ma, this.courseLineArr[courseIndex].Sg[0].La));
  
    for (let i = 1; i <= this.courseLineArr.length; i++) {
      if (this.courseLine.G.r.childNodes[i].style.cssText) {
        this.courseLine.G.r.childNodes[i].style.cssText = "";
      }
    }
    if (this.courseLineArr[courseIndex].Sg[0].Ma === Number(event.path[2].parentElement.lastElementChild.id)) {
      this.courseLine.G.r.childNodes[courseIndex+1].style.cssText = `${this.courseStokeStyle}`;
    }
  }

  showMapPoint() {
    for (let i = 1; i <= this.courseLineArr.length; i++) { // find
      this.courseLine.G.r.childNodes[i].style.cssText = "";
    }
    
    //드래그로 지도 이동을 완료했을 때 마지막 파라미터로 넘어온 함수를 호출
    this.map && kakao.maps.event.addListener(this.map, 'dragend', this.showWalkBanner.bind(this))
  }

  showWalkBanner() {
    this.dragged = true;
    let mapCenter = this.map.getCenter();
    let shortDistance = Number.MAX_SAFE_INTEGER;
    let firstNearMark;
    let secondNearMark;
    let secondShortDistance = Number.MAX_SAFE_INTEGER;
    this.walkCourseList.forEach((courePoint, i) => {
      let markToMark = Math.abs((Number(courePoint.lat) + Number(courePoint.lon)) - (mapCenter.Ma + mapCenter.La));
      if (markToMark < shortDistance) {
        shortDistance = markToMark;
        firstNearMark = this.walkCourseList[i];
      } else if (markToMark > shortDistance) {
        if (markToMark < secondShortDistance) {
          secondShortDistance = markToMark;
          secondNearMark = this.walkCourseList[i];
        }
      }
    })
  
    this.firstCourseElement.setAttribute('id', firstNearMark.lat);
    this.firstCourseDesc.setAttribute('id', firstNearMark.index);
    this.firstCourseName.textContent = firstNearMark.name;
    this.firstCourseLocation.textContent = firstNearMark.address;
    this.firstCourseDistance.textContent = firstNearMark.distance;
    this.firstCourseMoney.textContent = firstNearMark.money;
    this.secondCourseElement.setAttribute('id', secondNearMark.lat);
    this.secondCourseDesc.setAttribute('id', secondNearMark.index);
    this.secondCourseName.textContent = secondNearMark.name;
    this.secondCourseLocation.textContent = secondNearMark.address;
    this.secondCourseDistance.textContent = secondNearMark.distance;
    this.secondCourseMoney.textContent = secondNearMark.money;
  
    this.courseImgLazyload(firstNearMark.image, secondNearMark.image);
  }

  courseImgLazyload(firstImgSrc, secondImgSrc) {
    const firstCourseWrap = qs(".mappage__walkload__course");
    const secondCourseWrap = qs(".mappage__walkload__course2");
    this.firstCourseImage.setAttribute("src", firstImgSrc);
    this.secondCourseImage.setAttribute("src", secondImgSrc);
    new Promise(resolve => {
      this.firstCourseImage.onload = () => resolve(
        firstCourseWrap.classList.add("showContent"),
        secondCourseWrap.classList.add("showContent")
      )
    })
  }

}

class Template {

  walkCourseTemplate() {
    return `
      <div class="mappage__walkload__course">
          <div class="mappage__walkload__course__img">
            <img class="mappage__walkload__course__img__img" src="" lazy-src="" />
          </div>
          <div class="mappage__walkload__course__desc">
            <h4 class="mappage__walkload__course__name"></h4>
            <p class="mappage__walkload__course__location"></p>
            <div class="mappage__walkload__course__detail">
              <img src="../img/maploaction.png" alt="위차아이콘" />
              <h5><span class="mappage__walkload__course__distance"></span>km</h5>
              <img src="../img/mapcoin.png" alt="동전아이콘" />
              <h5><span class="mappage__walkload__course__money"></span>원</h5>
            </div>
          </div>
        </di>
    `;
  }

}