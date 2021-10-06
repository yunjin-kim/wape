import { quoteSentence } from "./mainpage_quote.js";
import { getCookie } from "./mainpage_profile.js";
import { renderCalendar, thisYear, thisMonth, daysArray, date } from "./mainpage_calendar.js";

const $quote = document.querySelector('.quote');
$quote.innerText = quoteSentence;

const $profileName = document.getElementById('profileName');
$profileName.innerText = getCookie();

const $atmosCon = document.querySelector('.mainpage__weather__weather');
const $temp = document.querySelector('.mainpage__weather__temp');
const $hightemp = document.querySelector('.mainpage__weather__hightemp');
const $lowtemp = document.querySelector('.mainpage__weather__lowtemp');
const $weatherLocation = document.querySelector('.mainpage__weather__dust__gu');

async function loadWeather(){
  let {weatherData, tempData, maxTempData, minTempData, lat, lon } = await import('./mainpage_weather.js');
  console.log(lat, lon)
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

//달력 
const $thisYearMonth = document.querySelector('.thisYearMonth');
const $calendarDays = document.querySelector('.mainpage__calendar__day');
$thisYearMonth.textContent = `${thisYear}.${thisMonth+1}`;
$calendarDays.innerHTML = daysArray.join(' ');

renderCalendar()


