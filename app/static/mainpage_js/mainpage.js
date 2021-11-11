import { quoteSentence } from "./mainpage_quote.js";
import { getCookie } from "./mainpage_profile.js";
import { renderCalendar, date, daysArray, clickReserveDate } from "./mainpage_calendar.js";
import { clickDate, holeDay, setTimeOptionAtReserve, setClickDateArr, clickReserve, beforeReseveDelete } from "./mainpage_reserve.js";
import { showSetGoalModal, getTodayStep, setStepGragh } from './mainpage_goal.js';
import { getTodayStepData, showTodayWalkDate } from './mainpage_todayWalk.js';

const $thisYearMonth = document.querySelector('.thisYearMonth');
const $calendarDays = document.querySelector('.mainpage__calendar__day');
const $bookDate = document.querySelector('.mainpage__book__date');
const $bookDays = $bookDate.children;
const $selectHour = document.querySelector(".selectHour");
const $selectMinute = document.querySelector(".selectMinute");

(function hasStepData() {
  let getStepDate = localStorage.getItem("STEP_DATA");
  let parseGetStepDate= JSON.parse(getStepDate);
  getTodayStepData()
  setDateAtReserve();
  setTimeOptionAtReserve()
  beforeReseveDelete();
  showTodayWalkDate();
  
  if(parseGetStepDate) {
    enterMainpage();
  }
  renderCalendar();
  loadWeather();
  setProfile();
  setQuote();
})()

function enterMainpage() {
  stepGoal();
  setGoalTodayStep();
  setGoalGraph();
};

//걷기 효능
function setQuote() {
  const $quote = document.querySelector('.quote');
  $quote.textContent = quoteSentence;
}

//프로필
function setProfile() {
  const $profileName = document.getElementById('profileName');
  $profileName.textContent = getCookie();
}

//오늘 날씨
async function loadWeather() {
  const $atmosCon = document.querySelector('.mainpage__weather__weather');
  const $temp = document.querySelector('.mainpage__weather__temp');
  const $hightemp = document.querySelector('.mainpage__weather__hightemp');
  const $lowtemp = document.querySelector('.mainpage__weather__lowtemp');
  const $weatherLocation = document.querySelector('.mainpage__weather__dust__gu');

  let {weatherData, tempData, maxTempData, minTempData, lat, lon } = await import('./mainpage_weather.js');
  console.log(lat, lon)
  if(weatherData) {
    $atmosCon.textContent = weatherData;
    $temp.textContent = tempData;
    $hightemp.textContent = maxTempData;
    $lowtemp.textContent = minTempData;
  }
  else{
    //동적으로 모듈 가져오기
    setTimeout(() => {
      loadWeather()
    },10000)
  }
}

//달력 
$thisYearMonth.textContent = `${date.getFullYear()}.${date.getMonth()+1}`;
$calendarDays.innerHTML = daysArray.join(' ');

$calendarDays.addEventListener('click', (e) => {
  if(e.target.classList.contains("walkingDay")) {
    clickReserveDate(e);
  }
})

function setDateAtReserve() {
  const holeDayArr = [];
  const holeDateArr = [];
  const thisLast = new Date(date.getFullYear(), date.getMonth()+1, 0);
  let todayDay = date.getDay();
  let todayDate = date.getDate();
  
  for(let i = 0; i < 7; i++) {
    todayDay--;
    if(todayDay === -1) todayDay = 6;
    holeDayArr.push(holeDay[todayDay]);
  
    if(todayDate > thisLast.getDate()) todayDate = 1;
    holeDateArr.push(todayDate)
    todayDate++;
  }
  setReserveDate(holeDayArr, holeDateArr);
}

//걷기 알림
function setReserveDate(holeDayArr, holeDateArr) {
  for(let i = 0; i < 7; i++) {
    $bookDays[i].children[0].textContent = holeDayArr[i];
    $bookDays[i].children[1].textContent = holeDateArr[i];
    $bookDays[i].children[0].classList.add("dateSpan");
    $bookDays[i].children[1].classList.add("dateSpan");
    $bookDays[i].classList.add("coloredBox");
  }
}

//언제 걸을까요 버튼들
$bookDate.addEventListener('click', (e) => {
  setClickDateArr(e)
  clickDate(e)
})

//몇시에 걸을까요 시
export function showTimeOptionAtReserve(hourArr, minuteArr) {
  for(let i = 0; i < hourArr.length; i++) {
    $selectHour.append(hourArr[i])
  }

  //먗시에 걸을까요 분
  for(let i = 0; i < minuteArr.length; i++) {
    $selectMinute.append(minuteArr[i])
  }
}


//예약버튼
const $reserveBtn = document.querySelector(".reserveBtn");
$reserveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let reserveHour = $selectHour.options[$selectHour.selectedIndex].textContent;
  let reserveMinute = $selectMinute.options[$selectMinute.selectedIndex].textContent;

  for(let i = 0; i < 7; i++) {
    $bookDays[i].classList.remove("backgroundGreen");
  }
  //같은 날 같은 시 같은 분일 때 겹치는 문제
  clickReserve(reserveHour, reserveMinute);
  getResreveDate();
})

//달력에 예약한 날짜 아이콘으로 표시
export function getResreveDate() {
  let getReserveDate = localStorage.getItem("RESERVE_DATE");
  let parseGetReserveDate = JSON.parse(getReserveDate);

  if(parseGetReserveDate) {
    for(let i = 0; i < $calendarDays.children.length; i++) {
      $calendarDays.children[i].classList.remove("walkingDay");
      if($calendarDays.children[i].classList.contains("thisMonth")) {
        parseGetReserveDate.forEach((reDate) => {
          if(reDate.date === $calendarDays.children[i].textContent) {
            $calendarDays.children[i].classList.add("walkingDay");
          }
        })
      }
    }
  };
}
getResreveDate();

//목표 걸음 모달
const $walkIcon = document.querySelector(".mainpage__walk__icon");
$walkIcon.addEventListener('click', (e) => {
  showSetGoalModal(e);
})

//목표 걸음 데이터
export function stepGoal() {
  const $stepGoal = document.querySelector(".setGoal");
  const $setMoney = document.querySelector(".setMoney");
  let myGoalStep = localStorage.getItem("STEP_GOAL");
  let myGoalMoney = myGoalStep*5;
  if(!myGoalStep) {
    myGoalStep = '목표를 설정해주세요';
    myGoalMoney ='목표를 설정해주세요';
  }
  $stepGoal.textContent = myGoalStep;
  $setMoney.textContent = myGoalMoney;
}

//오늘 걸음 데이터
function setGoalTodayStep() {
  const $todayStep = document.querySelector(".todayStep");
  const $todayMoney = document.querySelector(".todayMoney");
  $todayStep.textContent = getTodayStep();
  $todayMoney.textContent = getTodayStep()*5;
}

//목표 걸음 수 그래프 
export function setGoalGraph() {
  const $myStepDataGragh = document.querySelector(".mainpage__walk__graph__my");
  const $myMoneyDataGragph = document.querySelector(".mainpage__money__graph__my");
  let stepGragh = 230*setStepGragh();
  if(stepGragh > 230) {
    stepGragh = 230;
  }
  $myStepDataGragh.style = `width: ${stepGragh}px`;
  $myMoneyDataGragph.style = `width: ${stepGragh}px`;
}


// let result = fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=BzZsuCgHXGI%2FYCjfzw%2FNkrz87G%2FhlhrZaMqZ%2FnWF1q3Vps0xav1YgYj3%2FprpYmYi%2BHjNVTBhtkXHMIQKAenR1g%3D%3D&pageNo=1&numOfRows=50&dataType=JSON&base_date=20211010&base_time=1700&nx=55&ny=127', {
// 	method : 'get'
// 	})
//     result.then(function(response) {
//       console.log('response', response)
//       console.log('header', response.headers.get('Content-Type'))
//       return response.text()
//     }).then(function(text) {
//       console.log('got text', text)
//     }).catch(function(ex) {
//       console.log('failed', ex)
//     });


// let response = await fetch('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=BzZsuCgHXGI%2FYCjfzw%2FNkrz87G%2FhlhrZaMqZ%2FnWF1q3Vps0xav1YgYj3%2FprpYmYi%2BHjNVTBhtkXHMIQKAenR1g%3D%3D&pageNo=1&numOfRows=50&dataType=JSON&base_date=20211010&base_time=1700&nx=55&ny=127', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Methods': 'GET',
//     'Access-Control-Allow-Headers' : 'Content-Type',
//     'Access-Control-Allow-Origin': 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=BzZsuCgHXGI%2FYCjfzw%2FNkrz87G%2FhlhrZaMqZ%2FnWF1q3Vps0xav1YgYj3%2FprpYmYi%2BHjNVTBhtkXHMIQKAenR1g%3D%3D&pageNo=1&numOfRows=50&dataType=JSON&base_date=20211010&base_time=1700&nx=55&ny=127'
//   }
// });

// console.log(response)

// navigator.geolocation.getCurrentPosition(getWeatherInfo);

// function getWeatherInfo(event){
//   let latt = parseInt(event.coords.latitude)
//   let lonn = parseInt(event.coords.longitude)
//   let url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=BzZsuCgHXGI%2FYCjfzw%2FNkrz87G%2FhlhrZaMqZ%2FnWF1q3Vps0xav1YgYj3%2FprpYmYi%2BHjNVTBhtkXHMIQKAenR1g%3D%3D&pageNo=1&numOfRows=50&dataType=JSON&base_date=20211010&base_time=1700&nx=${latt}&ny=${lonn}`;

//     getWeatherDetail(url);
// }

// function getWeatherDetail(url){
//   fetch(url)
//   .then(response => console.log(response))
//   .catch(console.log)
// }

// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     if (xhr.readyState === xhr.DONE) {
//         // if (xhr.status === 200 || xhr.status === 201) {
//             console.log(xhr.response);
//         // } else {
//         //     console.error(xhr.responseText);
//         // }
//     }
// };
// xhr.open('GET', 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=BzZsuCgHXGI%2FYCjfzw%2FNkrz87G%2FhlhrZaMqZ%2FnWF1q3Vps0xav1YgYj3%2FprpYmYi%2BHjNVTBhtkXHMIQKAenR1g%3D%3D&pageNo=1&numOfRows=50&dataType=JSON&base_date=20211010&base_time=1700&nx=55&ny=127');
// xhr.send();