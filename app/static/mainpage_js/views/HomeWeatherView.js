import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWeatherView extends View {
  constructor() {
    super(qs(".mainpage__weather"));
  }

  loadWeather(weatherData, tempData, maxTempData, minTempData) {
    const $atmosCon = qs(".mainpage__weather__weather");
    const $temp = qs(".mainpage__weather__temp");
    const $hightemp = qs(".mainpage__weather__hightemp");
    const $lowtemp = qs(".mainpage__weather__lowtemp");
    const $weatherLocation = qs(".mainpage__weather__dust__gu");
    
    if (weatherData) {
      $atmosCon.textContent = weatherData;
      $temp.textContent = tempData;
      $hightemp.textContent = maxTempData;
      $lowtemp.textContent = minTempData;
    } 
  }

}