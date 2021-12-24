// import { quoteSentence } from "./mainpage_quote.js";
import { renderCalendar, clickReserveDate } from "./mainpage_calendar.js";
import { clickDate, setTimeOptionAtReserve, setClickDateArr, clickReserve, beforeReseveDelete } from "./mainpage_reserve.js";
import { showSetGoalModal, getTodayStep, setStepGragh } from './mainpage_goal.js';
import { getTodayStepApi, showTodayWalkDate } from './mainpage_todayWalk.js';
import { getCurrentLoaction } from './mainpage_weather.js'
import { setProfile, setUserTitle} from './mainpage_profile.js';

import HomeModel from "./model/HomeModel.js";
import HomeController from "./controller/HomeController.js";
import HomeQuoteView from "./views/HomeQuoteView.js";

document.addEventListener("DOMContentLoaded", homeMain);

function homeMain() {
  const homeModel = new HomeModel();

  const views = {
    homeQuoteView: new HomeQuoteView(),
  }

  new HomeController(homeModel, views);
}


const $calendarDays = document.querySelector(".mainpage__calendar__day");
const $selectHour = document.querySelector(".selectHour");
const $selectMinute = document.querySelector(".selectMinute");

(function hasStepData() {
  const getStepDate = localStorage.getItem("STEP_DATA");
  const parseGetStepDate= JSON.parse(getStepDate);
  getCurrentLoaction();
  getTodayStepApi()
  setDateAtReserve();
  setTimeOptionAtReserve()
  beforeReseveDelete();
  clickReserveDateButton();
  setReserve();
  showTodayWalkDate();
  setUserTitle();
  clickCalendarDate();
  getResreveDate();
  
  if (parseGetStepDate) {
    enterMainpage();
  }
  setProfile();
})()

function enterMainpage() {
  stepGoal();
  setGoalTodayStep();
  setGoalGraph();
  clickWalkGoalIcon();
};





//오늘 날씨
export function loadWeather(weatherData, tempData, maxTempData, minTempData) {
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





//달력 
function clickCalendarDate() {
  const date = new Date();
  const $thisYearMonth = document.querySelector(".thisYearMonth");
  $thisYearMonth.textContent = `${date.getFullYear()}.${date.getMonth()+1}`;
  $calendarDays.innerHTML = renderCalendar().join(' ');
  
  $calendarDays.addEventListener('click', (e) => {
    if (e.target.classList.contains("walkingDay")) {
      clickReserveDate(e);
    }
  })
}

function setDateAtReserve() {
  const date = new Date();  
  const holeDayArr = [];
  const holeDateArr = [];
  const holeDay = ['일' ,'월', '화', '수', '목', '금', '토'];
  const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let todayDay = date.getDay();
  let todayDate = date.getDate();

  for (let i = 0; i < 7; i++) {
    if (todayDay === 7 ) todayDay = 0;
    if (todayDate > thisLast.getDate()) todayDate = 1;
    holeDayArr.push(holeDay[todayDay])
    holeDateArr.push(todayDate)
    todayDay++;
    todayDate++;
  }
  setReserveDate(holeDayArr, holeDateArr);
}

//걷기 알림
function setReserveDate(holeDayArr, holeDateArr) {
  const $bookDate = document.querySelector(".mainpage__book__date");
  const $bookDays = $bookDate.children;

  for (let i = 0; i < 7; i++) {
    $bookDays[i].children[0].textContent = holeDayArr[i];
    $bookDays[i].children[1].textContent = holeDateArr[i];
    $bookDays[i].children[0].classList.add("dateSpan");
    $bookDays[i].children[1].classList.add("dateSpan");
    $bookDays[i].classList.add("coloredBox");
  }
}

//언제 걸을까요 버튼들
function clickReserveDateButton() {
  const $bookDate = document.querySelector(".mainpage__book__date");
  $bookDate.addEventListener('click', (e) => {
    setClickDateArr(e)
    clickDate(e)
  });
}


//몇시에 걸을까요 시
export function showTimeOptionAtReserve(hourArr, minuteArr) {
  for (let i = 0; i < hourArr.length; i++) {
    $selectHour.append(hourArr[i])
  }

  //먗시에 걸을까요 분
  for (let i = 0; i < minuteArr.length; i++) {
    $selectMinute.append(minuteArr[i])
  }
}


//예약버튼
function setReserve() {
  const $bookDate = document.querySelector(".mainpage__book__date");
  const $bookDays = $bookDate.children;
  const $reserveBtn = document.querySelector(".reserveBtn");
  $reserveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let reserveHour = $selectHour.options[$selectHour.selectedIndex].textContent;
    let reserveMinute = $selectMinute.options[$selectMinute.selectedIndex].textContent;
  
    for (let i = 0; i < 7; i++) {
      $bookDays[i].classList.remove("backgroundGreen");
    }
    //같은 날 같은 시 같은 분일 때 겹치는 문제
    clickReserve(reserveHour, reserveMinute);
    getResreveDate();
  })
}


//달력에 예약한 날짜 아이콘으로 표시
export function getResreveDate() {
  const getReserveDate = localStorage.getItem("RESERVE_DATE");
  const parseGetReserveDate = JSON.parse(getReserveDate);

  if (parseGetReserveDate) {
    for (let i = 0; i < $calendarDays.children.length; i++) {
      $calendarDays.children[i].classList.remove("walkingDay");
      if ($calendarDays.children[i].classList.contains("thisMonth")) {
        parseGetReserveDate.forEach((reDate) => {
          if (reDate.date === $calendarDays.children[i].textContent) {
            $calendarDays.children[i].classList.add("walkingDay");
          }
        })
      }
    }
  };
}

function clickWalkGoalIcon() {
  const $walkIcon = document.querySelector(".mainpage__walk__icon");
  $walkIcon.addEventListener('click', (e) => {
    showSetGoalModal(e);
  })
}

//목표 걸음 데이터
export function stepGoal() {
  const $stepGoal = document.querySelector(".setGoal");
  const $setMoney = document.querySelector(".setMoney");
  let myGoalStep = localStorage.getItem("STEP_GOAL");
  let myGoalMoney = myGoalStep * 5;
  if (!myGoalStep) {
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
  $todayMoney.textContent = getTodayStep() * 5;
}

//목표 걸음 수 그래프 
export function setGoalGraph() {
  const $myStepDataGragh = document.querySelector(".mainpage__walk__graph__my");
  const $myMoneyDataGragph = document.querySelector(".mainpage__money__graph__my");
  let stepGragh = 230*setStepGragh();
  if (stepGragh > 230) {
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