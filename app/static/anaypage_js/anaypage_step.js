import { onToday, holeDay, todayDay } from '../mainpage_js/mainpage_reserve.js';
import { _filter, _map, _reduce, _add } from '../fx.js';
import { setWeekStepData, showWeekPercent, hadStepData } from './anaypage.js';

const googleStepCountUrl = 'https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days';
//처음에 데이터가 로컬에 없다면 로컬에 저장되는건 되지만 chart배열에 값이 들어가지는 않음 함수 다시 실행될 수 있게
//12시쯤 구글 피트니스에 들어가 동기화를 하면 전달 12시부터 오늘 12시까지 정보를 새로 불러올 수 있다

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
    //13시기준 당일 12시 데이터 구글 피트니스에 들어가야 api로 데이터가 들어온다
    //onToday 날짜랑 로컬 데이터의 endtime에 날짜랑 비교해서 onToday 날짜가 크면 데이터 새로 불러올 수 있게
    let localLastDate = parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[0]+parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[1];
    console.log(localLastDate, onToday)
    if(localLastDate <= onToday-1){
      console.log("다음날이 되었다")
      getGoogleStepCount(googleStepCountUrl);
    }
    else{ //anaypage 42번줄 오류 해결됬는지 확인 필요
      setStepDate()
      rangeStepData();
      hadStepData()
    }
  }
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
  setStepDate()
  rangeStepData();
  hadStepData();
}

//걸음 수 요일
function setStepDate(){
  let walkDataDay = todayDay;

  for(let i = 0; i < 7; i++){
    if(walkDataDay === -1) walkDataDay = 6;
    if(walkDataDay >= 7) walkDataDay = 0;
    walkDataDay++;
    walkDayArr.push(holeDay[walkDataDay-1]);
  }
}

export const walkDayArr = [];
export const chartDateArr = [[], [], [], []]

//배열에 걸음수 데이터 넣기
function rangeStepData(){
  let getStepDate = localStorage.getItem("STEP_DATA");
  let parseGetStepDate= JSON.parse(getStepDate);
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
    chartBarArr[i].children[0].textContent = chartDateArr[weekNum][6-i].value;
  }
  setWeekStepData(weekSumStep)
}

//저번주 대비 퍼센트
export let percentData = 0;
export function setWeekPercent(){
  const dataSumArr = [];

  for(let i = 0; i < chartDateArr.length; i++){
    dataSumArr.push(
      _reduce(_add,
        _map(data => data.value, chartDateArr[i])))
  }
    if(dataSumArr[0] === weekSumStep){
      percentData = parseInt(dataSumArr[0]/dataSumArr[1]*10);
      if(dataSumArr[0] < dataSumArr[1]){
        percentData = -percentData;
      }
    }
    else if(dataSumArr[1] === weekSumStep){
      percentData = parseInt(dataSumArr[1]/dataSumArr[2]*10);
      if(dataSumArr[1] < dataSumArr[2]){
        percentData = -percentData;
      }
    }
    else if(dataSumArr[2] === weekSumStep){
      percentData = parseInt(dataSumArr[2]/dataSumArr[3]*10);
      if(dataSumArr[2] < dataSumArr[3]){
        percentData = -percentData;
      }
    }
    else if(dataSumArr[3] === weekSumStep){
      percentData="";
    }
    showWeekPercent()
}
