//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import { onStepData, setStepChartHeight, setStepDataArr, setStepDate } from './anaypage_step.js';
import AnayModal from './model/AnayModel.js';
import AnaySleepView from './views/AnaySleepView.js';
import AnayController from './controller/AnayController.js';
import AnayWeightView from './views/AnayWeightView.js';
import AnayGoalView from './views/AnayGoalView.js';

export let sleepWeekNum = 0;

(function hasStepData() {
  setUsername();
  onStepData();
  setGraphDate();
})();


document.addEventListener("DOMContentLoaded", anayMain);

function anayMain() {
  const anayModal = new AnayModal();

  const views = {
    anaySleepView: new AnaySleepView(),
    anayWeightView: new AnayWeightView(),
    anayGoalView: new AnayGoalView(),
  };

  new AnayController(anayModal, views);
}



export function hadStepData() {
  const stepDataArr = setStepDataArr();
  let weekNum = 0;
  setStepChart(weekNum, stepDataArr);
  chartButtonClickEvent(weekNum, stepDataArr);
}

function setUsername () {
  const $anayUsername = document.querySelector(".anayUsername");
  // $anayUsername.textContent = getNameFromCookie();
}

//그래프 요일 
function setGraphDate() {
  const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");
  const $goalDays = document.querySelector(".anaypage__goal__check__day__ul");
  const $weightDays = document.querySelector(".anaypage__weight__graph__day__ul");
  const $sleepDays = document.querySelector(".anaypage__sleep__graph__day__ul");
  const walkDayArr = setStepDate();
  for (let i = 0; i < walkDayArr.length; i++) {//하루 데이터 다시 들어올 때 오류
    $walkDataDays.children[i].textContent = walkDayArr[i];
    $goalDays.children[i].textContent = walkDayArr[i];
    $weightDays.children[i].textContent = walkDayArr[i];
    $sleepDays.children[i].textContent = walkDayArr[i];
  }
}

//걸음수 주 평균, 총합
export function setWeekStepData(weekSumStep) {
  const $weekStepAverage = document.querySelector(".anaypage__walk__weekAverage");
  const $wekkStepSum = document.querySelector(".anaypage__walk__accure__weekValue");
  $weekStepAverage.textContent = parseInt(weekSumStep/7);
  $wekkStepSum.textContent = weekSumStep;
}

//걸음수 차트
export function setStepChart(weekNum, stepDataArr) {
  const $walkDataGraph = document.querySelector(".anaypage__walk__graph__box");
  const chartBarArr = _.filter(
    charBar => 
      charBar.classList.contains("anaypage__walk__graph__graph")
        ,$walkDataGraph.children
  )
  setStepChartHeight(chartBarArr, weekNum, stepDataArr);
}

//걸음수 차트 왼쪽 버튼
function chartButtonClickEvent(weekNum, stepDataArr) {
  const $stepChartLeftBtn = document.querySelector(".anaypage__walk__graph__left");
  $stepChartLeftBtn.addEventListener('click', () => {
    weekNum++;
    setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum);
    setStepChart(weekNum, stepDataArr);
  })
  
  //걸음수 차트 오른쪽 버튼
  const $stepChartRightBtn = document.querySelector(".anaypage__walk__graph__right");
  $stepChartRightBtn.addEventListener('click', () => {
    weekNum--;
    setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum);
    setStepChart(weekNum, stepDataArr);
  })
}

//걸음수 차트 버튼 show/hidden
function setStepChartBtn($stepChartLeftBtn, $stepChartRightBtn, weekNum) {
  if(weekNum == 3) {
    $stepChartLeftBtn.classList.add("hiddenButton");
  } else if(weekNum == 0) {
    $stepChartRightBtn.classList.add("hiddenButton");
  } else {
    $stepChartLeftBtn.classList.remove("hiddenButton");
    $stepChartRightBtn.classList.remove("hiddenButton");
  }
}

//저번주 대비 퍼센트
export function showWeekPercent(percentData) {
  const $weekDiffPercentWrap = document.querySelector(".anaypage__walk__accure__percent");
  const $weekDiffPercent = document.querySelector(".anaypage__walk__accure__weekPercent");
  const $stpPercentArrow = document.querySelector(".stepPercentArrow");
  if(percentData === "") {
    $weekDiffPercentWrap.style ="opacity: 0";
  } else {
    $weekDiffPercentWrap.style ="opacity: 1";
    if(percentData < 0) {
      $stpPercentArrow.style = "transform : rotate(180deg)";
    } else if(percentData > 0) {
      $stpPercentArrow.style = "transform : rotate(0deg)";
    }
  }
  $weekDiffPercent.textContent = percentData;
}

