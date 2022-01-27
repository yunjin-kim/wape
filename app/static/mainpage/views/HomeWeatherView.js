import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWeatherView extends View {
  constructor() {
    super(qs(".mainpage__weather"));
    this.geocoder = new kakao.maps.services.Geocoder();

    this.template = new Template();

    this.renderMap();
  }
  // weather 비동기로 바꾸는거 다시 해보기, 지도 기능도
  loadWeather(weatherData, tempData, maxTempData, minTempData) {
    const temperatureWrap = qs(".mainpage__weather__condi");
    temperatureWrap.innerHTML = this.template.weatherTemplate(weatherData, tempData, maxTempData, minTempData);
  }

  renderMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.searchAddrFromCoords(this.displayCenterInfo);
      })
    } else {
      console.log('error')
    }
  }

  searchAddrFromCoords(callback) {
    this.geocoder.coord2RegionCode(this.longitude, this.latitude, callback);         
  }

  displayCenterInfo(result, status) {
    const locationInfoElement = qs(".mainpage__weather__location__value");

    if (status === kakao.maps.services.Status.OK) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].region_type === 'H') {
          locationInfoElement.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  }

}

class Template {
  weatherTemplate(weatherData, tempData, maxTempData, minTempData) {
    return `
      <h4 class="mainpage__weather__weather">${weatherData}</h4>
        <div class="mainpage__weather__flex">
          <h2 class="mainpage__weather__temp">${tempData}</h2>
          <p>
            (<span class="mainpage__weather__lowtemp">${minTempData}</span>,
            <span class="mainpage__weather__hightemp">${maxTempData}</span>)
          </p>
        </div>
    `;
  }
}