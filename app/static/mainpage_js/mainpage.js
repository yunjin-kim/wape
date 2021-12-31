import { clickDate, setTimeOptionAtReserve, setClickDateArr, clickReserve, beforeReseveDelete } from "./mainpage_reserve.js";
// import { showSetGoalModal, getTodayStep, setStepGragh } from './mainpage_goal.js';
import { getTodayStepApi, showTodayWalkDate } from './mainpage_todayWalk.js';
import { setProfile, setUserTitle} from './mainpage_profile.js';

import HomeModel from "./model/HomeModel.js";
import HomeController from "./controller/HomeController.js";
import HomeQuoteView from "./views/HomeQuoteView.js";
import HomeWeatherView from "./views/HomeWeatherView.js";
import homeCalendarView from "./views/HomeCalendarView.js";
import HomeGoalView from "./views/HomeGoalView.js";


const $selectHour = document.querySelector(".selectHour");
const $selectMinute = document.querySelector(".selectMinute");

(function hasStepData() {
  const getStepDate = localStorage.getItem("STEP_DATA");
  const parseGetStepDate= JSON.parse(getStepDate);
  getTodayStepApi()
  // clickWalkGoalIcon()
  
  setDateAtReserve();
  setTimeOptionAtReserve()
  beforeReseveDelete();
  clickReserveDateButton();
  setReserve();
  showTodayWalkDate();
  setUserTitle();
  
  if (parseGetStepDate) {
    enterMainpage();
  }
  setProfile();
})()

function enterMainpage() {
  // stepGoal();
  // setGoalTodayStep();
  // setGoalGraph();
};


document.addEventListener("DOMContentLoaded", homeMain);

function homeMain() {
  const homeModel = new HomeModel();

  const views = {
    homeQuoteView: new HomeQuoteView(),
    homeWeatherView: new HomeWeatherView(),
    homeCalendarView: new homeCalendarView(),
    homeGoalView: new HomeGoalView(),
  }

  new HomeController(homeModel, views);
}




//목표 걸음 데이터
// export function stepGoal() {
//   const $stepGoal = document.querySelector(".setGoal");
//   const $setMoney = document.querySelector(".setMoney");
//   let myGoalStep = localStorage.getItem("STEP_GOAL");
//   let myGoalMoney = myGoalStep * 5;
//   if (!myGoalStep) {
//     myGoalStep = '목표를 설정해주세요';
//     myGoalMoney ='목표를 설정해주세요';
//   }
//   $stepGoal.textContent = myGoalStep;
//   $setMoney.textContent = myGoalMoney;
// }

//오늘 걸음 데이터
// function setGoalTodayStep() {
//   const $todayStep = document.querySelector(".todayStep");
//   const $todayMoney = document.querySelector(".todayMoney");
//   $todayStep.textContent = getTodayStep();
//   $todayMoney.textContent = getTodayStep() * 5;
// }

//목표 걸음 수 그래프 
// function setGoalGraph() {
//   const $myStepDataGragh = document.querySelector(".mainpage__walk__graph__my");
//   const $myMoneyDataGragph = document.querySelector(".mainpage__money__graph__my");
//   let stepGragh = 230*setStepGragh();
//   if (stepGragh > 230) {
//     stepGragh = 230;
//   }
//   $myStepDataGragh.style = `width: ${stepGragh}px`;
//   $myMoneyDataGragph.style = `width: ${stepGragh}px`;
// }

// function clickWalkGoalIcon() {
//   const $walkIcon = document.querySelector(".mainpage__walk__icon");
//   $walkIcon.addEventListener('click', (e) => {
//     showSetGoalModal(e);
//   })
// }

function showSetGoalModal(e) {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add("goalModal")

  const goalTitle = document.createElement('h3');
  goalTitle.classList.add("goalModalTitle");
  goalTitle.textContent = "목표 걸음 수";
  modalDiv.append(goalTitle);

  const modalClose = document.createElement('button');
  modalClose.textContent = "X";
  modalClose.classList.add("goalModalClose")
  modalDiv.append(modalClose);
  modalClose.addEventListener('click', () => {
    modalDiv.remove();
  })

  const goalInput = document.createElement('input');
  goalInput.classList.add("goalInput");
  goalInput.setAttribute('type','number');
  modalDiv.append(goalInput);
  goalInput.addEventListener('change', (e) => {
    localStorage.setItem("STEP_GOAL", e.target.value);
    stepGoal();
    setGoalGraph();
  })

  const goallSubmitBtn = document.createElement('button');
  goallSubmitBtn.classList.add("goalSubmitBtn");
  goallSubmitBtn.textContent = "목표 설정";
  goallSubmitBtn.addEventListener('click', () => {
    modalDiv.remove();
  });
  modalDiv.append(goallSubmitBtn);

  e.target.parentNode.parentNode.parentNode.parentNode.append(modalDiv);
}

//오늘 걸음 데이터
// function getTodayStep(){
//   const lastDateStepDataArr = localStorage.getItem("STEP_DATA");
//   if (JSON.parse(lastDateStepDataArr)) {
//     const lastDateStepData = JSON.parse(lastDateStepDataArr).steps_count[JSON.parse(lastDateStepDataArr).steps_count.length-2].value;
//     return lastDateStepData;
//   }
// }

//목표 걸음 수 그래프 
// function setStepGragh(){
//   const myGoal = localStorage.getItem("STEP_GOAL");
//   const goalGraphPercent = getTodayStep()/myGoal;

//   return goalGraphPercent;
// }









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

  setReserveDate(holeDayArr, holeDateArr)
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