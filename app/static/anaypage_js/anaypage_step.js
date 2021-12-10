import { setWeekStepData, showWeekPercent, hadStepData } from './anaypage.js';
import { groupBySize } from '../fx.js';
//걸음 데이터가 30개 미만으로 들어오는 것에 대한 예외처리 확인 필요!
const googleStepCountUrl = 'https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days';
//처음에 데이터가 로컬에 없다면 로컬에 저장되는건 되지만 chart배열에 값이 들어가지는 않음 함수 다시 실행될 수 있게
//걸음수 api
export function onStepData() {
  const getStepDate = localStorage.getItem("STEP_DATA");
  if (getStepDate) { // 12시 이후에 당일 데이터가 로드된다
    showUpdateDataModal();
    setStepDate();
    setStepDataArr();
    hadStepData();
  } else {
    getGoogleStepCount(googleStepCountUrl);
  }
}
// 동기화 되지 않거나 12시가 넘지 않았을 때 날짜 변경되지 않게 하게 걷기 차트
async function getGoogleStepCount(googleStepCountUrl) {
  try {
    const response = await fetch(googleStepCountUrl);
    const data = await response.json();
    saveStepToLocal(data);
  }
  catch (e) {
    stepDataErrorModal();
    console.log(e);
  }
}

function stepDataErrorModal() {
  const $stepTitle = document.querySelector(".anaypage__walk__title");
  const stepErrorModalDiv = document.createElement('div');
  const stepErrorModalText = document.createElement('p');
  stepErrorModalDiv.classList.add("stepErrorModal")
  stepErrorModalText.classList.add("stepErrorModalText");
  stepErrorModalText.innerHTML = "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";
  stepErrorModalDiv.append(stepErrorModalText);
  $stepTitle.append(stepErrorModalDiv);
}

//12시 데이터가 로드 되기 때문에 금일 12시 전에 들오면 어떻게 해야할지 고민
//받아온 JSON 데이터의 마지막 데이터의 endTime의 날짜가 오늘 날짜보다 작다면 밑에 함수를 실행하지 않고 모달을 띄운다
function saveStepToLocal(data) {
  localStorage.setItem("STEP_DATA", JSON.stringify(data));
  setStepDate();
  hadStepData();
}

//걸음 데이터가 동기화 되지 않음에 대한 모달
function showUpdateDataModal() {
  const $anaypageWalkTitle = document.querySelector(".anaypage__walk__title");
  const updateDataModalDiv = document.createElement('div');
  const updateDataModalClose = document.createElement('button');
  const updateDataTitle = document.createElement('h3');
  updateDataModalDiv.classList.add("updateDataModal");
  updateDataModalClose.classList.add("updateDataModalClose");
  updateDataTitle.classList.add("updateDataModalTitle");
  updateDataModalClose.textContent = "X";
  updateDataModalDiv.addEventListener('click', () => {
    updateDataModalDiv.remove();
  })
  updateDataTitle.innerHTML = "<p>걸음 데이터가 <br/>동기화 되지 않았습니다</p><br/><p>구글 피트니스 앱에서<br/>동기화 해주세요</p>";
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataModalClose);
  updateDataModalDiv.append(updateDataTitle);
  $anaypageWalkTitle.append(updateDataModalDiv)
}

//걸음 수 요일
export function setStepDate() {
  const date = new Date();
  const walkDayArr = [];
  const holeDay = ['월','화','수','목','금','토','일'];
  let walkDataDay = date.getDay();
  for (let i = 0; i < 7; i++) {
    if(walkDataDay === -1) walkDataDay = 6;
    if(walkDataDay >= 7) walkDataDay = 0;
    walkDataDay++;
    walkDayArr.push(holeDay[walkDataDay-1]);
  }

  return walkDayArr;
}

//배열에 걸음수 데이터 넣기
export function setStepDataArr() {
  console.log("rangeStepData")
  const getStepDateFromLocal = localStorage.getItem("STEP_DATA");
  const parseStepDateFromLocal = JSON.parse(getStepDateFromLocal);
  let reserveStepDateFromLocal = parseStepDateFromLocal.steps_count.reverse();

  const chartDataArr = _.go(
    reserveStepDateFromLocal,
    _.map(stepData => stepData),
    groupBySize(7),
    _.values,
    _.take(4)
  );
  
  return chartDataArr;
}

//걸음수 관련 처리
export function setStepChartHeight(chartBarArr, weekNum, stepDataArr) { // 걷기 데이터 높이 여기서 정함
  //다음날 되엇을 때 이걸로 오류 고쳐지는지 확인해보고 되면 flag로 다음날 되었을 때 한버만 실행되게 바꾸기  
  let weekSumStep = 0;

  for (let i = chartBarArr.length-1; i >= 0; i--) {
    weekSumStep = 0
    chartBarArr[i].children[1].style.height = "0px";
    chartBarArr[i].children[0].textContent = "0px";
  }

  weekSumStep = 0;
  let chartDataArrFlat = (_.values(stepDataArr)).flat();
  let monthSumStep = 0;

  for (let i = 0; i < chartDataArrFlat.length; i++) {
    monthSumStep += chartDataArrFlat[i].value;
  }
  let charBarHeightDivide = parseInt(monthSumStep/1200);

  for (let i = chartBarArr.length-1; i >= 0; i--) {
    weekSumStep += stepDataArr[weekNum][i].value;
    chartBarArr[i].children[1].style.height = `${stepDataArr[weekNum][6-i].value/charBarHeightDivide}px`;
    chartBarArr[i].children[0].textContent = stepDataArr[weekNum][6-i].value;
  }
  setWeekStepData(weekSumStep);
  setWeekPercent(weekSumStep, stepDataArr)
}

//저번주 대비 퍼센트
 function setWeekPercent(weekSumStep, stepDataArr) {
  const add = (a, b) => a + b;
  const dataSumArr = _.go(
      _.entries(stepDataArr),
      _.map(([_, stepDataArr]) => stepDataArr),
      _.map(stepDataArr=> _.go(
        stepDataArr,
        _.map(stepDataArr=> stepDataArr.value),
        _.reduce(add)
      )),
      _.take(4));
    let percentData = 0;

  for (let i = 0; i < dataSumArr.length; i++) {
    if (dataSumArr[i] === weekSumStep) {
      if (dataSumArr[i] > dataSumArr[i + 1]) {
        percentData = parseInt(((dataSumArr[i] - dataSumArr[i + 1]) / dataSumArr[i]) * 100);
      } else if (dataSumArr[i] < dataSumArr[i + 1]) {
        percentData = parseInt(((dataSumArr[i] / dataSumArr[i + 1]) - 1) * 100);
      } else if (dataSumArr[i] === dataSumArr[i + 1]) {
        percentData = 0;
      } else if (i === 3) {
        percentData = "";
      }
    }
  }
  
  showWeekPercent(percentData);
}
