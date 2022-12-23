import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWeatherView extends View {
  constructor() {
    super(qs(".mainpage__weather"));
    this.geocoder = new kakao.maps.services.Geocoder();

    this.template = new Template();

  }

  loadWeather(weatherData, tempData, maxTempData, minTempData) {
    const temperatureWrap = qs(".mainpage__weather__condi");
    temperatureWrap.innerHTML = this.template.weatherTemplate(weatherData, tempData, maxTempData, minTempData);
  }

  renderMap(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.searchAddrFromCoords(this.displayCenterInfo);
  }

  searchAddrFromCoords(callback) {
    this.geocoder.coord2RegionCode(this.longitude, this.latitude, callback);         
  }

  displayCenterInfo(result, status) {
    const locationInfoElement = qs(".mainpage__weather__location__value");
    if (status === kakao.maps.services.Status.OK) {
      locationInfoElement.innerHTML = _.filter(v => v.region_type === "H", result)[0].address_name;
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