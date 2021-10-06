const date = new Date();
let todoyDay = date.getDay();
const holeDay = ['월','화','수','목','금','토','일'];

export const holeDayArr = []

for(let i = 0; i < 7; i++){
  if(todoyDay >= 8) todoyDay = 1;
  holeDayArr.push(holeDay[todoyDay-1]);
  todoyDay++;
}

