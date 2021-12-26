import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWeatherView extends View {
  constructor() {
    super(qs(".mainpage__weather"));
  }

  loadWeather(weatherData, tempData, maxTempData, minTempData) {
    const $atmosCon = document.querySelector('.mainpage__weather__weather');
    const $temp = document.querySelector('.mainpage__weather__temp');
    const $hightemp = document.querySelector('.mainpage__weather__hightemp');
    const $lowtemp = document.querySelector('.mainpage__weather__lowtemp');
    const $weatherLocation = document.querySelector('.mainpage__weather__dust__gu');
    
    if (weatherData) {
      $atmosCon.textContent = weatherData;
      $temp.textContent = tempData;
      $hightemp.textContent = maxTempData;
      $lowtemp.textContent = minTempData;
    } 
  }

}