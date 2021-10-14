import { onToday, holeDay, todayDay } from '../mainpage_js/mainpage_reserve.js';
import { _filter, _map, _reduce, _add } from '../fx.js';
import { setWeekStepData } from './anaypage.js';
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
  else if(getStepDate){
    let parseGetStepDate= JSON.parse(getStepDate);
    //시간대별로 데이터가 언제 불러와지는 것이 다르기 때문에 확인 필요
    //20시 기준 전날 13시 데이터까지
    //onToday 날짜랑 로컬 데이터의 endtime에 날짜랑 비교해서 onToday 날짜가 크면 데이터 새로 불러올 수 있게
    console.log(parseGetStepDate.steps_count.length)
    let localLastDate = parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[0]+parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[1];

    console.log(localLastDate, onToday)
    if(localLastDate == onToday-2){
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

const chartDateArr = [
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

//걸음수 관련 처리
export let weekSumStep = 0;
export function setStepChartHeight(chartBarArr, weekNum){
  weekSumStep = 0;
  for(let i = chartBarArr.length-1; i >= 0; i--){
    weekSumStep += chartDateArr[weekNum][i].value;
    chartBarArr[i].children[1].style.height = `${chartDateArr[weekNum][6-i].value/100}px`;
    chartBarArr[i].children[0].innerText = chartDateArr[weekNum][6-i].value;
  }
  setWeekStepData(weekSumStep)
  setWeekPercent();
}


let percentData = 0;

export function setWeekPercent(){
  
  let dataSumArr = [];

  for(let i = 0; i < chartDateArr.length; i++){
    dataSumArr.push(
      _reduce(_add,
        _map(data => data.value, chartDateArr[i])))}

  switch(weekSumStep){
    case dataSumArr[0]: {
      percentData = parseInt(dataSumArr[0]/dataSumArr[1]*10);
      return percentData;
    }
    case dataSumArr[1]: {
      percentData = parseInt(dataSumArr[1]/dataSumArr[2]*10);
      return percentData;
    }
    case dataSumArr[2]: {
      return "";
    }
  }
}