import { showTimeOptionAtReserve } from './mainpage.js';

//언제 걸을까요 클릭하면 background색
const CLICK_GREEN = 'backgroundGreen';
const DATE_SPAN = 'dateSpan';
const COLORED_BOX = 'coloredBox';

export function clickDate(e) {
  if(e.target.classList.contains(COLORED_BOX)) {
    if(e.target.classList.contains(CLICK_GREEN)) {
      e.target.classList.remove(CLICK_GREEN);
    } else {
      e.target.classList.add(CLICK_GREEN);
    }
  } else if(e.target.classList.contains(DATE_SPAN)) {
    if(e.target.parentNode.classList.contains(CLICK_GREEN)) {
      e.target.parentNode.classList.remove(CLICK_GREEN);
    } else {
      e.target.parentNode.classList.add(CLICK_GREEN);
    }
  }
}

export function setTimeOptionAtReserve() {
  const hourArr = [];
  const minuteArr = [];
  
  for( let i = 1; i < 24; i++) { //몇시에 걸을까요 시 option값
    if (i < 10){
      i = "0" + i;
    }
    const option = document.createElement('option');
    option.textContent = i;
    hourArr.push(option);
  }
  
  for (let i = 1; i < 60; i++) { //몇시에 걸을까요 분 option값
    if (i < 10){
      i = "0" + i;
    }
    const option = document.createElement('option');
    option.textContent = i;
    minuteArr.push(option);
  }
  showTimeOptionAtReserve(hourArr, minuteArr)
}

//걷기 알림 날짜 클릭
let reserveArr = []; 
export function setClickDateArr(e) {
  if (e.target.classList.contains(COLORED_BOX)) {
    //박스가 초록색이라면
    if (e.target.classList.contains(CLICK_GREEN)) {
      reserveArr.filter((date, idx) => {
        date === e.target.children[1].textContent ? reserveArr.splice(idx, 1) : " ";
      });
    } else { //박스가 초록색이 아닐마면
      reserveArr.push(e.target.children[1].textContent);
    };
  } else if (e.target.classList.contains(DATE_SPAN)) { // span 클릭하면 
    if (e.target.parentNode.classList.contains(CLICK_GREEN)) { //부모 박스가 초록색이면
      if (e.target.parentNode.children[0]) { //요일 클릭
        e.target.parentNode.children[1].textContent;
        reserveArr.filter((date, idx) => {
          date === e.target.parentNode.children[1].textContent ? reserveArr.splice(idx, 1) : " ";
        });
      } else { //날짜 클릭
        reserveArr.filter((date, idx) => {
          date === e.target.textContent ? reserveArr.splice(idx, 1) : " ";
        });
      }
    } else { //부모 박스가 초록색이 아니라면
      //요일 클릭
      if(e.target.parentNode.children[0]) {
        reserveArr.push(e.target.parentNode.children[1].textContent);
      } else { //날짜 클릭
        reserveArr.push(e.target.textContent);
      }
    }
  }
}

//이전 걷기 예약 제거
export function beforeReseveDelete() {
  const date = new Date();
  const getReserveDate = localStorage.getItem("RESERVE_DATE");
  const parseGetReserveDate = JSON.parse(getReserveDate);

  if (parseGetReserveDate) {
    let subLastReserve = _.filter( //오늘 이전 예약 
      d => d.date < date.getDate(), parseGetReserveDate
    )
    if (subLastReserve) {
      let afterReserve = _.filter( //오늘 포함 이후 예약
        d => d.date >= date.getDate(), parseGetReserveDate
      )
      if (subLastReserve.length > 0) {
          localStorage.setItem("RESERVE_DATE",JSON.stringify(afterReserve));
      }
    }
  }
}

//예약 기능
export function clickReserve(reserveHour, reserveMinute) {
  const reserveObjArr = [];
  const getReserveDate = localStorage.getItem("RESERVE_DATE");
  let parseGetReserveDate = JSON.parse(getReserveDate);

  for (let reserveDate of reserveArr) {
    let reserveObj = {
      date: reserveDate,
      hour: reserveHour,
      minute: reserveMinute
    }
    reserveObjArr.push(reserveObj);
  }
  reserveArr = [];

  if (parseGetReserveDate) {
    localStorage.setItem("RESERVE_DATE",JSON.stringify(parseGetReserveDate.concat(reserveObjArr)));
  } else {
    localStorage.setItem("RESERVE_DATE",JSON.stringify(reserveObjArr));
  }
}

