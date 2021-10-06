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

