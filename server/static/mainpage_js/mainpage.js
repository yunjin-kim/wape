import { quoteSentence } from "./mainpage_quote.js";
import { getCookie } from "./mainpage_profile.js";

const $quote = document.querySelector('.quote');
$quote.innerText = quoteSentence;

const $atmosCon = document.querySelector('.mainpage__weather__weather');
const $temp = document.querySelector('.mainpage__weather__temp');
const $hightemp = document.querySelector('.mainpage__weather__hightemp');
const $lowtemp = document.querySelector('.mainpage__weather__lowtemp');

async function loadWeather(){
  let {weatherData, tempData, maxTempData, minTempData } = await import('./mainpage_weather.js');

  if(weatherData){
    $atmosCon.innerText = weatherData;
    $temp.innerText = tempData;
    $hightemp.innerText = maxTempData;
    $lowtemp.innerText = minTempData;
  }
  else{
    setTimeout(()=>{
      loadWeather()
    },10000)
  }
}
//동적으로 모듈 가져오기
loadWeather()

const $profileName = document.getElementById('profileName');

$profileName.innerText = getCookie();



