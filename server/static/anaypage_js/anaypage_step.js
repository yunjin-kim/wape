import { onToday, holeDay, todayDay } from '../mainpage_js/mainpage_reserve.js';
import { _filter } from '../fx.js';
const googleStepCountUrl = 'https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days';
//처음에 데이터가 로컬에 없다면 로컬에 저장되는건 되지만 chart배열에 값이 들어가지는 않음 함수 다시 실해오딜 수 있게

//걸음수 api
//로컬스토리지에 걸음수를 저장해놯으니까 오늘 날짜랑 로컬스토리에 있는 데이터 날짜 값이랑 비교해서 오늘 날짜의 데이터가 없다면 그 때 url을 통해 불어올 수 있도록
export function onStepData(){
  let getStepDate = localStorage.getItem("STEP_DATA");

  //로컬에 저장된 데이터가 없다면
  if(!getStepDate){
    console.log("로컬에 데이터 없다")
    getGoogleStepCount(googleStepCountUrl);
  }
  if(getStepDate){
    let parseGetStepDate= JSON.parse(getStepDate);

    //onToday 날짜랑 로컬 데이터의 endtime에 날짜랑 비교해서 onToday 날짜가 크면 데이터 새로 불러올 수 있게
    let localLastDate = parseGetStepDate.steps_count[28].endTime[0]+parseGetStepDate.steps_count[28].endTime[1];

    if(localLastDate == onToday){
      console.log("다음날이 되었다")
      getGoogleStepCount(googleStepCountUrl);
    }
  
    rangeStepData(parseGetStepDate)
  }
  setStepDate()
}

function getGoogleStepCount(googleStepCountUrl){
  console.log("API 호출")
  return fetch(googleStepCountUrl)
  .then(response => response.json())
  .then(json => saveStepToLocal(json))
  .catch(error => console.log('error', error));
};

//한달 주기로 데이터 저장하므로 concat은 하지 않는다
function saveStepToLocal(json){
  localStorage.setItem("STEP_DATA", JSON.stringify(json));
}

//걸음 수 요일
export const walkDayArr = [];
function setStepDate(){
  let walkDataDay = todayDay;

  for(let i = 0; i < 7; i++){
    if(walkDataDay >= 8) walkDataDay = 1;
    walkDayArr.push(holeDay[walkDataDay-1]);
    walkDataDay++;
  }
}

export const chartDateArr = [
  [],
  [],
  []
]
//배열에 걸음수 데이터 넣기
function rangeStepData(parseGetStepDate){
  let reserveGetStepDate = parseGetStepDate.steps_count.reverse();

  for(let i = 0; i < chartDateArr.length; i++){
    while(reserveGetStepDate.length){
      if(chartDateArr[i].length >= 7) break;
      chartDateArr[i].push(reserveGetStepDate[0]);
      reserveGetStepDate.shift()
    }
  }
}


