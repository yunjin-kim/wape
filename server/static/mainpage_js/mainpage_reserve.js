import { _filter, _map } from "../fx.js";

//언제 걸을끼요 날짜
const date = new Date();
const todoayDate = new Date();
const onToday = todoayDate.getDate();

let todoyDay = date.getDay();
const holeDay = ['월','화','수','목','금','토','일'];
let todayDate = date.getDate();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth();
const thisLast = new Date(thisYear, thisMonth+1, 0)
const thisLastDate = thisLast.getDate();

export const holeDayArr = [];
export const holeDateArr = [];

for(let i = 0; i < 7; i++){
  if(todoyDay >= 8) todoyDay = 1;
  holeDayArr.push(holeDay[todoyDay-1]);
  todoyDay++;

  if(todayDate >= thisLastDate) todayDate = 1;
  holeDateArr.push(todayDate)
  todayDate++;
}

//언제 걸을까요 클릭하면 background색
const CLICK_GREEN = 'backgroundGreen';
const DATE_SPAN = 'dateSpan';
const COLORED_BOX = 'coloredBox';

export function clickDate(e){
  if(e.target.classList.contains(COLORED_BOX)){

    if(e.target.classList.contains(CLICK_GREEN)){
      e.target.classList.remove(CLICK_GREEN)
    }
    else{
      e.target.classList.add(CLICK_GREEN)
    }
  }

  else if(e.target.classList.contains(DATE_SPAN)){
    
    if(e.target.parentNode.classList.contains(CLICK_GREEN)){
      e.target.parentNode.classList.remove(CLICK_GREEN)
    }
    else{
      e.target.parentNode.classList.add(CLICK_GREEN)
    }
  }
}

//몇시에 걸을까요 시 option값
export const hourArr = [];
  for(let i = 1; i < 24; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    // option.classList.add('hour');
    hourArr.push(option);
  }

//몇시에 걸을까요 분 option값
export const minuteArr = [];
  for(let i = 1; i < 60; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    // option.classList.add('minute');
    minuteArr.push(option);
  }

export const reserveArr = []; 
export function setClickDateArr(e){
  if(e.target.classList.contains(COLORED_BOX)){
    //박스가 초록색이라면
    if(e.target.classList.contains(CLICK_GREEN)){
      reserveArr.filter((date, idx)=>{
        date === e.target.children[1].innerText ? reserveArr.splice(idx, 1) : " ";
      })
    }
    //박스가 초록색이 아닐마면
    else{
      reserveArr.push(e.target.children[1].innerText)
    }
  }
    // span 클릭하면 
  else if(e.target.classList.contains(DATE_SPAN)){
    //부모 박스가 초록색이면
    if(e.target.parentNode.classList.contains(CLICK_GREEN)){
      //요일 클릭
      if(e.target.parentNode.children[0]){
        e.target.parentNode.children[1].innerText
        reserveArr.filter((date, idx)=>{
          date === e.target.parentNode.children[1].innerText ? reserveArr.splice(idx, 1) : " ";
        });
      }
      //날짜 클릭
      else{
        reserveArr.filter((date, idx)=>{
          date === e.target.innerText ? reserveArr.splice(idx, 1) : " ";
        });
      }
    }
    //부모 박스가 초록색이 아니라면
    else{
      //요일 클릭
      if(e.target.parentNode.children[0]){
        reserveArr.push(e.target.parentNode.children[1].innerText)
      }
      //날짜 클릭
      else{
        reserveArr.push(e.target.innerText)
      }
    }
  }
}

//예약 기능
export function clickReserve(reserveHour, reserveMinute){
  const reserveObjArr = [];

  for(let reserveDate of reserveArr){
    let reserveObj = {
      date: reserveDate,
      hour: reserveHour,
      minute: reserveMinute
    }
    reserveObjArr.push(reserveObj);
  }

  let getReserveDate = localStorage.getItem("RESERVE_DATE")
  let parseGetReserveDate = JSON.parse(getReserveDate);

  if(parseGetReserveDate){
    //어제 예약
    let subLastReserve = _filter(
      d => d.date < onToday, parseGetReserveDate)
    //오늘 이후 예약
    let afterReserve = _filter(
      d => d.date >= onToday, parseGetReserveDate)

      if(subLastReserve){
        localStorage.setItem("RESERVE_DATE",JSON.stringify(afterReserve));
      }
    localStorage.setItem("RESERVE_DATE",JSON.stringify(parseGetReserveDate.concat(reserveObjArr)));
  }
  else{
    localStorage.setItem("RESERVE_DATE",JSON.stringify(reserveObjArr));
  }
  
}

