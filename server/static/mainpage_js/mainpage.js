import { quoteSentence } from "./mainpage_quote.js";
import { getCookie } from "./mainpage_profile.js";
import { renderCalendar, thisYear, thisMonth, daysArray } from "./mainpage_calendar.js";
import { holeDayArr, holeDateArr, clickDate, hourArr, minuteArr } from "./mainpage_reserve.js";

//걷기 효능
const $quote = document.querySelector('.quote');
$quote.innerText = quoteSentence;

//프로필
const $profileName = document.getElementById('profileName');
$profileName.innerText = getCookie();

//오늘 날씨
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
//1일 되면 다음달로 넘어가는지 확인 필요
const $thisYearMonth = document.querySelector('.thisYearMonth');
const $calendarDays = document.querySelector('.mainpage__calendar__day');
$thisYearMonth.textContent = `${thisYear}.${thisMonth+1}`;
$calendarDays.innerHTML = daysArray.join(' ');

renderCalendar()

//걷기 알림
//이번달의 마지막날도 불러와서 예약할 날짜가 마지막 날짜를 넘어가면 1일로 바뀔 수 있게 되는지 확인 필요
const $bookDate = document.querySelector('.mainpage__book__date');
const DATE_SPAN = 'dateSpan';
const COLORED_BOX = 'coloredBox';
const bookDays = $bookDate.children;

for(let i = 0; i < 7; i++){
  bookDays[i].children[0].textContent = holeDayArr[i];
  bookDays[i].children[1].textContent = holeDateArr[i];
  bookDays[i].children[0].classList.add(DATE_SPAN);
  bookDays[i].children[1].classList.add(DATE_SPAN);
  bookDays[i].classList.add(COLORED_BOX)
}

$bookDate.addEventListener('click', (e)=>{
  clickDate(e)
})


const $selectHour = document.querySelector(".selectHour");
for(let i = 0; i < hourArr.length; i++){
  $selectHour.append(hourArr[i])
}

const $selectMinute = document.querySelector(".selectMinute");
for(let i = 0; i < minuteArr.length; i++){
  $selectMinute.append(minuteArr[i])
}

