//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import { _filter, _reduce } from '../fx.js';
import { onStepData, walkDayArr, setStepChartHeight, percentData, setWeekPercent } from './anaypage_step.js';
import { setGoalAchieve, goalStep } from './anaypage_goal.js';
import { showGoalWeihgtModal, setGoalWeight, showWeihgtModal, setCurrentWeight, setuntilGoalWeight, rangeWeightData, setWeightChartHeight, setWeightDate } from './anaypage_weight.js';
import { showSleepModal, rangeSleepData, setCurrentSleep, setSleepChartHeight, setSleepDate } from './anaypage_sleep.js';

let weekNum = 0;
let goalWeekNum = 0
export let weightWeekNum = 0;
export let sleepWeekNum = 0;

(function hasStepData(){
  onStepData();
  setGraphDate();
})();

export function hadStepData(){
  setStepChart(weekNum);
  setWeekPercent();
  ifNoGoal();
  setGoalWeight();
  rangeWeightData()
  setCurrentWeight();
  setWeightChart(weightWeekNum);
  untilGoalWeight();
  setCurrentSleep();
  rangeSleepData();
  setSleepChart(sleepWeekNum);
  setSleepDataAverage(sleepWeekNum);
}

//그래프 요일 
function setGraphDate(){
  const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");
  const $goalDays = document.querySelector(".anaypage__goal__check__day__ul");
  const $weightDays = document.querySelector(".anaypage__weight__graph__day__ul");
  const $sleepDays = document.querySelector(".anaypage__sleep__graph__day__ul");

  for(let i = 0; i < walkDayArr.length; i++){//하루 데이터 다시 들어올 때 오류
    $walkDataDays.children[i].textContent = walkDayArr[i];
    $goalDays.children[i].textContent = walkDayArr[i];
    $weightDays.children[i].textContent = walkDayArr[i];
    $sleepDays.children[i].textContent = walkDayArr[i];
  }
}

//걸음수 주 평균, 총합
export function setWeekStepData(weekSumStep){
  const $weekStepAverage = document.querySelector(".anaypage__walk__weekAverage");
  const $wekkStepSum = document.querySelector(".anaypage__walk__accure__weekValue");
  $weekStepAverage.textContent = parseInt(weekSumStep/7);
  $wekkStepSum.textContent = weekSumStep;
}

//걸음수 차트
export function setStepChart(weekNum){
  const $walkDataGraph = document.querySelector(".anaypage__walk__graph__box");

  const chartBarArr = _filter(
    charBar => 
      charBar.classList.contains("anaypage__walk__graph__graph")
        ,$walkDataGraph.children
  )
  setStepChartHeight(chartBarArr, weekNum)
}

//걸음수 차트 왼쪽 버튼
const $stepChartLeftBtn = document.querySelector(".anaypage__walk__graph__left");
$stepChartLeftBtn.addEventListener('click',()=>{
  weekNum++;
  setStepChartBtn();
  setStepChart(weekNum);
  setWeekPercent();
})

//걸음수 차트 오른쪽 버튼
const $stepChartRightBtn = document.querySelector(".anaypage__walk__graph__right");
$stepChartRightBtn.addEventListener('click',()=>{
  weekNum--;
  setStepChartBtn();
  setStepChart(weekNum);
  setWeekPercent();
})

//걸음수 차트 버튼 show/hidden
function setStepChartBtn(){
  if(weekNum == 3){
    $stepChartLeftBtn.classList.add("hiddenButton");
  }
  else if(weekNum == 0){
    $stepChartRightBtn.classList.add("hiddenButton");
  }
  else{
    $stepChartLeftBtn.classList.remove("hiddenButton");
    $stepChartRightBtn.classList.remove("hiddenButton");
  }
}

//저번주 대비 퍼센트
export function showWeekPercent(){
  const $weekDiffPercentWrap = document.querySelector(".anaypage__walk__accure__percent");
  const $weekDiffPercent = document.querySelector(".anaypage__walk__accure__weekPercent");
  const $stpPercentArrow = document.querySelector(".stepPercentArrow");
  console.log(percentData)
  if(percentData === ""){
    $weekDiffPercentWrap.style ="opacity: 0";
  }
  else{
    $weekDiffPercentWrap.style ="opacity: 1";
    if(percentData < 0){
      $stpPercentArrow.style = "transform : rotate(180deg)";
    }
    else if(percentData > 0){
      $stpPercentArrow.style = "transform : rotate(0deg)";
    }
  }
  $weekDiffPercent.textContent = percentData;
}

//목표 왼쪽 버튼
const $goalLeftBtn = document.querySelector(".anaypage__goal__check__left");
$goalLeftBtn.addEventListener('click', ()=>{
  goalWeekNum++;
  setGoaltBtn();
  setGoalAchieveBox(goalWeekNum);
})

  //목표 오른쪽 버튼
const $goalRightBtn = document.querySelector(".anaypage__goal__check__right");
$goalRightBtn.addEventListener('click', ()=>{
  goalWeekNum--;
  setGoaltBtn();
  setGoalAchieveBox(goalWeekNum);
})

//목표 버튼 show/hidden
function setGoaltBtn(){
  if(goalWeekNum == 3){
    $goalLeftBtn.classList.add("hiddenButton");
  }
  else if(goalWeekNum == 0){
    $goalRightBtn.classList.add("hiddenButton");
  }
  else{
    $goalLeftBtn.classList.remove("hiddenButton");
    $goalRightBtn.classList.remove("hiddenButton");
  }
}

//목표 걸음수 없다면
function ifNoGoal(){
  if(!goalStep){
    const $goalCheck = document.querySelector(".anaypage__goal__check__noGoal");
    $goalCheck.innerHTML = setGoalAchieve();
  }
  else{ 
    setGoalAchieveBox();
  }
}

//걷기 목표 달성 유무
function setGoalAchieveBox(goalWeekNum){
  const $goalDataBox = document.querySelector(".anaypage__goal__check__main");

  const goalBoxArr = _filter(
    goal => 
      !goal.classList.contains("anaypage__goal__check__wrap")
        ,$goalDataBox.children
  )

  goalBoxArr.reverse()

  setGoalAchieve(goalBoxArr, goalWeekNum)
}

//체중 왼쪽 버튼
const $weightLeftBtn = document.querySelector(".anaypage__weight__graph__left");
$weightLeftBtn.addEventListener('click', ()=>{
  weightWeekNum++;
  setWeighttBtn();
  setWeightChart(weightWeekNum);
})

//체중 오른쪽 버튼
const $weightRightBtn = document.querySelector(".anaypage__weight__graph__right");
$weightRightBtn.addEventListener('click', ()=>{
  weightWeekNum--;
  setWeighttBtn();
  setWeightChart(weightWeekNum);
})

//체중 버튼 show/hidden
function setWeighttBtn(){
  if(weightWeekNum == 3){
    $weightLeftBtn.classList.add("hiddenButton");
  }
  else if(weightWeekNum == 0){
    $weightRightBtn.classList.add("hiddenButton");
  }
  else{
    $weightLeftBtn.classList.remove("hiddenButton");
    $weightRightBtn.classList.remove("hiddenButton");
  }
}

//목표 체중 입력되있는 상태에서 재입력
const $setGoalWeight = document.querySelector(".anaypage__weight__accure");
$setGoalWeight.addEventListener('click', (e)=> {
  showGoalWeihgtModal(e);
})

//목표 체중이 입력되지 않은 상태에서 입력
const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
$noWeightGoalDiv.addEventListener('click', (e)=> {
  showGoalWeihgtModal(e);
})

//현재 체중 입력되있는 상태에서 재입력
const $currentWeight = document.querySelector(".anaypage__weight__current");
$currentWeight.addEventListener('click', (e)=>{
  showWeihgtModal(e);
})

//현재 체중이 입력되지 않은 상태에서 입력
const $noCurrentWeight = document.querySelector(".anaypage__noweight__current");
$noCurrentWeight.addEventListener('click', (e)=>{
  showWeihgtModal(e);
})

//목표 체중 차트  
export function setWeightChart(weightWeekNum){
  const $weightBox = document.querySelector(".anaypage__weight__graph__box");

  const weightBoxArr = _filter(
    weight => 
      weight.classList.contains("anaypage__weight__graph__graph")
        ,$weightBox.children
  )
  setWeightDate(weightBoxArr, weightWeekNum)
  setWeightChartHeight(weightBoxArr, weightWeekNum)
}

//목표 체중까지
export function untilGoalWeight(){

  let getTotalWeightData = localStorage.getItem("CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  const $untilGoalWeight = document.querySelector(".untilGoalWeight");
  if(parseTotalWeightData[0].length > 0){
    if(parseTotalWeightData[0][0][2] === ""){
      $untilGoalWeight.parentNode.parentNode.parentNode.classList.add("hiddenDiv")
    }
    else{
      $untilGoalWeight.parentNode.parentNode.parentNode.classList.remove("hiddenDiv")
      $untilGoalWeight.textContent = setuntilGoalWeight();
    }
  }
}
//만약 로컬의 길이가 28이상이면 로컬에서 제일 오래된 삭제


//수면 왼쪽 버튼
const $sleppLeftBtn = document.querySelector(".anaypage__sleep__graph__left");
$sleppLeftBtn.addEventListener('click', ()=>{
  sleepWeekNum++;
  setSleepBtn();
  setSleepChart(sleepWeekNum);
  setSleepDataAverage(sleepWeekNum)
})

//수면 오른쪽 버튼
const $sleepRightBtn = document.querySelector(".anaypage__sleep__graph__right");
$sleepRightBtn.addEventListener('click', ()=>{
  sleepWeekNum--;
  setSleepBtn();
  setSleepChart(sleepWeekNum);
  setSleepDataAverage(sleepWeekNum)
})

//수면 버튼 show/hidden
function setSleepBtn(){
  if(sleepWeekNum == 3){
    $sleppLeftBtn.classList.add("hiddenButton");
  }
  else if(sleepWeekNum == 0){
    $sleepRightBtn.classList.add("hiddenButton");
  }
  else{
    $sleppLeftBtn.classList.remove("hiddenButton");
    $sleepRightBtn.classList.remove("hiddenButton");
  }
}

//현재 수면 입력되있는 상태에서 재입력
const $currentSleep = document.querySelector(".anaypage__sleep__current");
$currentSleep.addEventListener('click', (e)=>{
  showSleepModal(e);
})

//현재 수면이 입력되지 않은 상태에서 입력
const $noCurrentSleep = document.querySelector(".anaypage__nosleep__current");
$noCurrentSleep.addEventListener('click', (e)=>{
  showSleepModal(e);
})

//수면 차트  
export function setSleepChart(sleepWeekNum){
  const $sleepBox = document.querySelector(".anaypage__sleep__graph__box");

  const sleepBoxArr = _filter(
    sleep => 
      sleep.classList.contains("anaypage__sleep__graph__graph")
        ,$sleepBox.children
  )
  setSleepDate(sleepBoxArr, sleepWeekNum);
  setSleepChartHeight(sleepBoxArr, sleepWeekNum);
}

//수면 일평균 주간 누적
export function setSleepDataAverage(sleepWeekNum){
  const $sleepDateAverage = document.querySelector(".sleepDateAverage");
  const $sleepDataWeekTotal = document.querySelector(".sleepDataWeekTotal");

  let getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
  let parseTotalSleepData = JSON.parse(getTotalSleepData);

  let weekSleepData = [];
  let totalSleepData = 0;

  parseTotalSleepData[sleepWeekNum].map((data)=>{
    data[2] === "" ? "" : weekSleepData.push(data[2]);
  })

  for(let data of weekSleepData){
    totalSleepData += Number(data);
  }
  let averageSleepData = totalSleepData/weekSleepData.length;
  if(totalSleepData){
    $sleepDataWeekTotal.textContent = totalSleepData;
    $sleepDateAverage.textContent = averageSleepData.toFixed(1);
  }
  else{
    $sleepDataWeekTotal.textContent = "0";
    $sleepDateAverage.textContent = "0";
  }
}