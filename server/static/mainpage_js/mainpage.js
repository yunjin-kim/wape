import { quoteSentence } from "./mainpage_quote.js";
import { getCookie } from "./mainpage_profile.js";
import { renderCalendar, thisYear, thisMonth, daysArray } from "./mainpage_calendar.js";

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

//이번달의 마지막날도 불러와서 예약할 날짜가 마지막 날짜를 넘어가면 1일로 바뀔 수 있게
const date = new Date();
let todoyDay = date.getDay()
console.log(date.getDate())
console.log(date.getDay())

const $bookDate = document.querySelector('.mainpage__book__date');

const bookDays = $bookDate.children;
console.log(bookDays)

const dayday = ['월','화','수','목','금','토','일']

for(let i = 0; i < 7; i++){
  if(todoyDay >= 8) todoyDay = 1;
  bookDays[i].children[0].textContent = dayday[todoyDay-1];
  todoyDay++;
}