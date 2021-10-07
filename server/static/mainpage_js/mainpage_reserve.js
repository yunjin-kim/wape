const date = new Date();

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

  export const hourArr = [];
  for(let i = 1; i < 24; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    hourArr.push(option);
  }

  export const minuteArr = [];
  for(let i = 1; i < 60; i++){
    if(i < 10){
      i = "0"+i;
    }
    let option = document.createElement('option');
    option.textContent = i;
    minuteArr.push(option);
  }