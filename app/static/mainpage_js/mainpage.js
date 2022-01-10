// import { clickDate, setTimeOptionAtReserve, setClickDateArr, clickReserve, beforeReseveDelete } from "./mainpage_reserve.js";
import { setProfile, setUserTitle } from "./mainpage_profile.js";

import HomeModel from "./model/HomeModel.js";
import HomeController from "./controller/HomeController.js";
import HomeQuoteView from "./views/HomeQuoteView.js";
import HomeWeatherView from "./views/HomeWeatherView.js";
import homeCalendarView from "./views/HomeCalendarView.js";
import HomeGoalView from "./views/HomeGoalView.js";
import HomeTodayWalkView from "./views/HomeTodayWalkView.js";
import HomeWalkReserveView from "./views/HomeWalkReserveView.js";

const $selectHour = document.querySelector(".selectHour");
const $selectMinute = document.querySelector(".selectMinute");

(function hasStepData() {
  // setDateAtReserve();
  // setTimeOptionAtReserve()
  // beforeReseveDelete();
  // clickReserveDateButton();
  // setReserve();
  setUserTitle();
  setProfile();
})();

document.addEventListener("DOMContentLoaded", homeMain);

function homeMain() {
  const homeModel = new HomeModel();

  const views = {
    homeQuoteView: new HomeQuoteView(),
    homeWeatherView: new HomeWeatherView(),
    homeCalendarView: new homeCalendarView(),
    homeGoalView: new HomeGoalView(),
    homeTodayWalkView: new HomeTodayWalkView(),
    homeWalkReserveView: new HomeWalkReserveView(),
  };

  new HomeController(homeModel, views);
}

//언제 걸을까요 버튼들
// function clickReserveDateButton() {
//   const $bookDate = document.querySelector(".mainpage__book__date");
//   $bookDate.addEventListener('click', (e) => {
//     setClickDateArr(e)
//     clickDate(e)
//   });
// }

//걷기 알림
// function setReserveDate(holeDayArr, holeDateArr) {
//   const $bookDate = document.querySelector(".mainpage__book__date");
//   const $bookDays = $bookDate.children;

//   for (let i = 0; i < 7; i++) {
//     $bookDays[i].children[0].textContent = holeDayArr[i];
//     $bookDays[i].children[1].textContent = holeDateArr[i];
//     $bookDays[i].children[0].classList.add("dateSpan");
//     $bookDays[i].children[1].classList.add("dateSpan");
//     $bookDays[i].classList.add("coloredBox");
//   }
// }

// function setDateAtReserve() {
//   const date = new Date();
//   const holeDayArr = [];
//   const holeDateArr = [];

//   const holeDay = ['일' ,'월', '화', '수', '목', '금', '토'];
//   const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//   let todayDay = date.getDay();
//   let todayDate = date.getDate();

//   for (let i = 0; i < 7; i++) {
//     if (todayDay === 7 ) todayDay = 0;
//     if (todayDate > thisLast.getDate()) todayDate = 1;
//     holeDayArr.push(holeDay[todayDay])
//     holeDateArr.push(todayDate)
//     todayDay++;
//     todayDate++;
//   }

//   setReserveDate(holeDayArr, holeDateArr)
// }

//예약버튼
function setReserve() {
  const $bookDate = document.querySelector(".mainpage__book__date");
  const $bookDays = $bookDate.children;
  const $reserveBtn = document.querySelector(".reserveBtn");
  $reserveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let reserveHour =
      $selectHour.options[$selectHour.selectedIndex].textContent;
    let reserveMinute =
      $selectMinute.options[$selectMinute.selectedIndex].textContent;

    for (let i = 0; i < 7; i++) {
      $bookDays[i].classList.remove("backgroundGreen");
    }
    //같은 날 같은 시 같은 분일 때 겹치는 문제
    clickReserve(reserveHour, reserveMinute);
    getResreveDate();
  });
}

const CLICK_GREEN = "backgroundGreen";
const DATE_SPAN = "dateSpan";
const COLORED_BOX = "coloredBox";

export function clickDate(e) {
  if (e.target.classList.contains(COLORED_BOX)) {
    if (e.target.classList.contains(CLICK_GREEN)) {
      e.target.classList.remove(CLICK_GREEN);
    } else {
      e.target.classList.add(CLICK_GREEN);
    }
  } else if (e.target.classList.contains(DATE_SPAN)) {
    if (e.target.parentNode.classList.contains(CLICK_GREEN)) {
      e.target.parentNode.classList.remove(CLICK_GREEN);
    } else {
      e.target.parentNode.classList.add(CLICK_GREEN);
    }
  }
}

// function setTimeOptionAtReserve() {
//   const hourArr = [];
//   const minuteArr = [];

//   for( let i = 1; i < 24; i++) { //몇시에 걸을까요 시 option값
//     if (i < 10) {
//       i = "0" + i;
//     }
//     const option = document.createElement('option');
//     option.textContent = i;
//     hourArr.push(option);
//   }

//   for (let i = 1; i < 60; i++) { //몇시에 걸을까요 분 option값
//     if (i < 10){
//       i = "0" + i;
//     }
//     const option = document.createElement('option');
//     option.textContent = i;
//     minuteArr.push(option);
//   }
//   showTimeOptionAtReserve(hourArr, minuteArr)
// }

//몇시에 걸을까요 시
// function showTimeOptionAtReserve(hourArr, minuteArr) {
//   for (let i = 0; i < hourArr.length; i++) {
//     $selectHour.append(hourArr[i])
//   }

//먗시에 걸을까요 분
//   for (let i = 0; i < minuteArr.length; i++) {
//     $selectMinute.append(minuteArr[i])
//   }
// }

//걷기 알림 날짜 클릭
let reserveArr = [];
function setClickDateArr(e) {
  if (e.target.classList.contains(COLORED_BOX)) {
    //박스가 초록색이라면
    if (e.target.classList.contains(CLICK_GREEN)) {
      reserveArr.filter((date, idx) => {
        date === e.target.children[1].textContent
          ? reserveArr.splice(idx, 1)
          : " ";
      });
    } else {
      //박스가 초록색이 아닐마면
      reserveArr.push(e.target.children[1].textContent);
    }
  } else if (e.target.classList.contains(DATE_SPAN)) {
    // span 클릭하면
    if (e.target.parentNode.classList.contains(CLICK_GREEN)) {
      //부모 박스가 초록색이면
      if (e.target.parentNode.children[0]) {
        //요일 클릭
        e.target.parentNode.children[1].textContent;
        reserveArr.filter((date, idx) => {
          date === e.target.parentNode.children[1].textContent
            ? reserveArr.splice(idx, 1)
            : " ";
        });
      } else {
        //날짜 클릭
        reserveArr.filter((date, idx) => {
          date === e.target.textContent ? reserveArr.splice(idx, 1) : " ";
        });
      }
    } else {
      //부모 박스가 초록색이 아니라면
      //요일 클릭
      if (e.target.parentNode.children[0]) {
        reserveArr.push(e.target.parentNode.children[1].textContent);
      } else {
        //날짜 클릭
        reserveArr.push(e.target.textContent);
      }
    }
  }
}

//이전 걷기 예약 제거
function beforeReseveDelete() {
  const date = new Date();
  const getReserveDate = localStorage.getItem("RESERVE_DATE");
  const parseGetReserveDate = JSON.parse(getReserveDate);

  if (parseGetReserveDate) {
    let subLastReserve = _.filter(
      //오늘 이전 예약
      (d) => d.date < date.getDate(),
      parseGetReserveDate
    );
    if (subLastReserve) {
      let afterReserve = _.filter(
        //오늘 포함 이후 예약
        (d) => d.date >= date.getDate(),
        parseGetReserveDate
      );
      if (subLastReserve.length > 0) {
        localStorage.setItem("RESERVE_DATE", JSON.stringify(afterReserve));
      }
    }
  }
}

//예약 기능
function clickReserve(reserveHour, reserveMinute) {
  const reserveObjArr = [];
  const getReserveDate = localStorage.getItem("RESERVE_DATE");
  let parseGetReserveDate = JSON.parse(getReserveDate);

  for (let reserveDate of reserveArr) {
    let reserveObj = {
      date: reserveDate,
      hour: reserveHour,
      minute: reserveMinute,
    };
    reserveObjArr.push(reserveObj);
  }
  reserveArr = [];

  if (parseGetReserveDate) {
    localStorage.setItem(
      "RESERVE_DATE",
      JSON.stringify(parseGetReserveDate.concat(reserveObjArr))
    );
  } else {
    localStorage.setItem("RESERVE_DATE", JSON.stringify(reserveObjArr));
  }
}
