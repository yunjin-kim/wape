//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import { onStepData, setStepChartHeight, setStepDataArr, setStepDate } from './anaypage_step.js';
import { setGoalAchieve } from './anaypage_goal.js';
import { showGoalWeihgtModal, setGoalWeight, showWeihgtModal, setCurrentWeight, rangeWeightData, setWeightChartHeight, setUserBmi } from './anaypage_weight.js';
import AnayModal from './model/AnayModel.js';
import AnaySleepView from './views/AnaySleepView.js';
import AnayController from './controller/AnayController.js';
import { groupBySize, L } from "../fx.js";

export let sleepWeekNum = 0;

(function hasStepData() {
  setUsername();
  onStepData();
  setGraphDate();
  setGoalWeight();
  rangeWeightData()
  setWeightChartHeight();
  setCurrentWeight();

  setUserBmi();
  goalButtonClickEvent();
  weightButtonClickEvent();
  weightGoalButtonClickEvent();
  untilGoalWeight();
})();


document.addEventListener("DOMContentLoaded", anayMain);

function anayMain() {
  const anayModal = new AnayModal();

  const views = {
    anaySleepView: new AnaySleepView(),
  };

  new AnayController(anayModal, views);
}



export function hadStepData() {
  const stepDataArr = setStepDataArr();
  let weekNum = 0;
  setStepChart(weekNum, stepDataArr);
  ifNoGoal();
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

function goalButtonClickEvent() {
  const $goalLeftBtn = document.querySelector(".anaypage__goal__check__left");
  const $goalRightBtn = document.querySelector(".anaypage__goal__check__right");
  let goalWeekNum = 0
  $goalLeftBtn.addEventListener('click', () => {
    goalWeekNum++;
    setGoaltBtn(goalWeekNum, $goalLeftBtn, $goalRightBtn);
    setGoalAchieve(goalWeekNum);
  })
  $goalRightBtn.addEventListener('click', () => {
    goalWeekNum--;
    setGoaltBtn(goalWeekNum, $goalLeftBtn, $goalRightBtn);
    setGoalAchieve(goalWeekNum);
  })
}

//목표 버튼 show/hidden
function setGoaltBtn(goalWeekNum, $goalLeftBtn, $goalRightBtn) {
  if(goalWeekNum == 3) {
    $goalLeftBtn.classList.add("hiddenButton");
  } else if(goalWeekNum == 0) {
    $goalRightBtn.classList.add("hiddenButton");
  } else {
    $goalLeftBtn.classList.remove("hiddenButton");
    $goalRightBtn.classList.remove("hiddenButton");
  }
}

//목표 걸음수 없다면
function ifNoGoal() {
  const goalStep = localStorage.getItem("STEP_GOAL");
  if(!goalStep) {
    const $goalCheck = document.querySelector(".anaypage__goal__check__noGoal");
    $goalCheck.innerHTML = `<div class="noGoalText">목표를 설정해주세요</div>`;
  } else{ 
    setGoalAchieve();
  }
}
//걷기 목표 달성 유무
export function setGoalAchieveBox() {
  const $goalDataBox = document.querySelector(".anaypage__goal__check__main");
  const goalBoxArr = _.filter( goal => !goal.classList.contains("anaypage__goal__check__wrap"), $goalDataBox.children);

  return goalBoxArr;
}

function weightButtonClickEvent() {
  const $weightLeftBtn = document.querySelector(".anaypage__weight__graph__left");
  const $weightRightBtn = document.querySelector(".anaypage__weight__graph__right");
  let weightWeekNum = 0;
  $weightLeftBtn.addEventListener('click', () => {
    weightWeekNum++;
    setWeighttBtn(weightWeekNum, $weightLeftBtn, $weightRightBtn);
    setWeightChartHeight(weightWeekNum)
  })
  $weightRightBtn.addEventListener('click', () => {
    weightWeekNum--;
    setWeighttBtn(weightWeekNum, $weightLeftBtn, $weightRightBtn);
    setWeightChartHeight(weightWeekNum)
  })
}

//목표 체중 차트  
export function setWeightChart() {
  const $weightBox = document.querySelector(".anaypage__weight__graph__box");
  const weightBoxArr = _.filter(
    weight => 
      weight.classList.contains("anaypage__weight__graph__graph")
        ,$weightBox.children);

  return weightBoxArr;
}

//체중 버튼 show/hidden
function setWeighttBtn(weightWeekNum, $weightLeftBtn, $weightRightBtn) {
  if (weightWeekNum == 3) {
    $weightLeftBtn.classList.add("hiddenButton");
  } else if (weightWeekNum == 0) {
    $weightRightBtn.classList.add("hiddenButton");
  } else {
    $weightLeftBtn.classList.remove("hiddenButton");
    $weightRightBtn.classList.remove("hiddenButton");
  }
}

function weightGoalButtonClickEvent() {
  const $setGoalWeight = document.querySelector(".anaypage__weight__accure");
  const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
  const $currentWeight = document.querySelector(".anaypage__weight__current");
  const $noCurrentWeight = document.querySelector(".anaypage__noweight__current");
  $setGoalWeight.addEventListener('click', (e) => {
    showGoalWeihgtModal(e);
  })
  $noWeightGoalDiv.addEventListener('click', (e) => {
    showGoalWeihgtModal(e);
  })
    $currentWeight.addEventListener('click', (e) => {
    showWeihgtModal(e);
  })
    $noCurrentWeight.addEventListener('click', (e) => {
    showWeihgtModal(e);
  })
}

//목표 체중까지
export function untilGoalWeight() {
  console.log("실행")
  const getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  const parseTotalWeightData = JSON.parse(getTotalWeightData);
  const getWeight = localStorage.getItem("GOAL_WEIGHT");
  const parseWeight = JSON.parse(getWeight);
  const $untilGoalWeight = document.querySelector(".untilGoalWeight");
  if(parseTotalWeightData[0].length > 0) {
    if(parseTotalWeightData[0][0][2] === "") {
      $untilGoalWeight.parentNode.parentNode.parentNode.classList.add("hiddenDiv");
    } else {
      $untilGoalWeight.parentNode.parentNode.parentNode.classList.remove("hiddenDiv");
      $untilGoalWeight.textContent = parseTotalWeightData[0][0][2] - parseWeight;
    }
  }
}
