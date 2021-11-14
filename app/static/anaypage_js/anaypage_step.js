import { setWeekStepData, showWeekPercent, hadStepData } from './anaypage.js';
//걸음 데이터가 30개 미만으로 들어오는 것에 대한 예외처리 확인 필요!
const googleStepCountUrl = 'https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days';
//처음에 데이터가 로컬에 없다면 로컬에 저장되는건 되지만 chart배열에 값이 들어가지는 않음 함수 다시 실행될 수 있게

export const date = new Date();
let onToday = date.getDate();

//걸음수 api
export function onStepData() {
  let getStepDate = localStorage.getItem("STEP_DATA");

  //로컬에 저장된 데이터가 없다면
  if(!getStepDate) {
    console.log("로컬에 데이터 없다");
    getGoogleStepCount(googleStepCountUrl);
  }
  else if(getStepDate) {
    let parseGetStepDate= JSON.parse(getStepDate);
    //onToday 날짜랑 로컬 데이터의 endtime에 날짜랑 비교해서 onToday 날짜가 크면 데이터 새로 불러올 수 있게
    let localLastDate = parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[0]+parseGetStepDate.steps_count[parseGetStepDate.steps_count.length-1].endTime[1];
    console.log(localLastDate, onToday);
    if(localLastDate <= onToday -1) {
      console.log("다음날이 되었다");
      getGoogleStepCount(googleStepCountUrl);
    }
    if(onToday === 1 && onToday < localLastDate) {
      console.log("다음달이 되었다");
      getGoogleStepCount(googleStepCountUrl);
    }
    else { //anaypage 42번줄 오류 해결됬는지 확인 필요
      setStepDate();
      rangeStepData();
      hadStepData();
    }
  }
}

function getGoogleStepCount(googleStepCountUrl) {
  console.log("API 호출");
  return fetch(googleStepCountUrl)
  .then(response => response.json())
  .then(json => saveStepToLocal(json))
  .catch(error => console.log('error', error))
};

//받아온 JSON 데이터의 마지막 데이터의 endTime의 날짜가 오늘 날짜보다 작다면 밑에 함수를 실행하지 않고 모달을 띄운다
function saveStepToLocal(json) {
  console.log(json)
  if(Number(json.steps_count[json.steps_count.length - 1].endTime[0] + json.steps_count[json.steps_count.length - 1].endTime[1]) !== Number(onToday)) {
    showUpdateDataModal();
  }
  localStorage.setItem("STEP_DATA", JSON.stringify(json));
  setStepDate();
  rangeStepData();
  hadStepData();
}

//걸음 데이터가 동기화 되지 않음에 대한 모달
function showUpdateDataModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement('div');
  updateDataModalDiv.classList.add("updateDataModal");

  const updateDataModalClose = document.createElement('button');
  updateDataModalClose.textContent = "X";
  updateDataModalClose.classList.add("updateDataModalClose")
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.addEventListener('click', () => {
    updateDataModalDiv.remove();
  })
  updateDataModalDiv.append(updateDataModalClose);

  const updateDataTitle = document.createElement('h3');
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataTitle.innerHTML = "<p>걸음 데이터가 <br/>동기화 되지 않았습니다</p><br/><p>구글 피트니스 앱에서<br/>동기화 해주세요</p>";
  updateDataModalDiv.append(updateDataTitle);

  $anaypageWalkTitle.append(updateDataModalDiv)
}

//걸음 수 요일
function setStepDate() {
  const holeDay = ['월','화','수','목','금','토','일'];
  let walkDataDay = date.getDay();

  for(let i = 0; i < 7; i++) {
    if(walkDataDay === -1) walkDataDay = 6;
    if(walkDataDay >= 7) walkDataDay = 0;
    walkDataDay++;
    walkDayArr.push(holeDay[walkDataDay-1]);
  }
}

export const walkDayArr = [];
export const chartDataArr = [[], [], [], []]

//배열에 걸음수 데이터 넣기
function rangeStepData() {
  let getStepDate = localStorage.getItem("STEP_DATA");
  let parseGetStepDate= JSON.parse(getStepDate);
  let reserveGetStepDate = parseGetStepDate.steps_count.reverse();

  for(let i = 0; i < chartDataArr.length; i++) {
    while(reserveGetStepDate.length) {
      if(chartDataArr[i].length >= 7) break;
      chartDataArr[i].push(reserveGetStepDate[0]);
      reserveGetStepDate.shift();
    }
  }
}

//걸음수 관련 처리
export let weekSumStep = 0;
export function setStepChartHeight(chartBarArr, weekNum) {
  weekSumStep = 0;
  let chartDataArrFlat = chartDataArr.flat();
  let monthSumStep = 0;

  for(let i = 0; i < chartDataArrFlat.length; i++) {
    monthSumStep += chartDataArrFlat[i].value;
  }
  let charBarHeightDivide = parseInt(monthSumStep/1200);

  for(let i = chartBarArr.length-1; i >= 0; i--) {
    weekSumStep += chartDataArr[weekNum][i].value;
    chartBarArr[i].children[1].style.height = `${chartDataArr[weekNum][6-i].value/charBarHeightDivide}px`;
    chartBarArr[i].children[0].textContent = chartDataArr[weekNum][6-i].value;
  }
  setWeekStepData(weekSumStep);
}

//저번주 대비 퍼센트
export let percentData = 0;
export function setWeekPercent() {
  const dataSumArr = [];

  for(let i = 0; i < chartDataArr.length; i++) {
    dataSumArr.push(
      _.reduce(_.add,
        _.map(data => data.value, chartDataArr[i])))
  }
    if(dataSumArr[0] === weekSumStep) {
      percentData = parseInt(dataSumArr[0]/dataSumArr[1]*10);
      if(dataSumArr[0] < dataSumArr[1]) {
        percentData = -percentData;
      }
    }
    else if(dataSumArr[1] === weekSumStep) {
      percentData = parseInt(dataSumArr[1]/dataSumArr[2]*10);
      if(dataSumArr[1] < dataSumArr[2]) {
        percentData = -percentData;
      }
    }
    else if(dataSumArr[2] === weekSumStep) {
      percentData = parseInt(dataSumArr[2]/dataSumArr[3]*10);
      if(dataSumArr[2] < dataSumArr[3]) {
        percentData = -percentData;
      }
    }
    else if(dataSumArr[3] === weekSumStep) {
      percentData = "";
    }
    showWeekPercent();
}
