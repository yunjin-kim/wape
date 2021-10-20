//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import { _filter } from '../fx.js';
import { onStepData, walkDayArr, setStepChartHeight, percentData, setWeekPercent } from './anaypage_step.js';
import { setGoalAchieve, goalStep } from './anaypage_goal.js';

let weekNum = 0;
let goalWeekNum = 0

//걸음수 주 평균, 총합
export function setWeekStepData(weekSumStep){
  const $weekStepAverage = document.querySelector(".anaypage__walk__weekAverage");
  const $wekkStepSum = document.querySelector(".anaypage__walk__accure__weekValue");
  $weekStepAverage.innerText = parseInt(weekSumStep/7);
  $wekkStepSum.innerText = weekSumStep;
}

(function hasStepData(){
  onStepData();
  setStepChartDate();
  setGoalDate();
  setStepChart(weekNum);
  setWeekPercent();
  ifNoGoal();
})();

//걸음 수 요일
function setStepChartDate(){
  const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");

  for(let i = 0; i < walkDayArr.length; i++){
    // console.log(walkDayArr)
    $walkDataDays.children[i].innerText = walkDayArr[i];
  }
}

//걸음수 차트
function setStepChart(weekNum){
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
  $weekDiffPercent.innerText = percentData;
}

//목표 달성 요일
function setGoalDate(){
  const $goalDays = document.querySelector(".anaypage__goal__check__day__ul");

  for(let i = 0; i < walkDayArr.length; i++){
    $goalDays.children[i].innerText = walkDayArr[i];
  }
}

  //목표 왼쪽 버튼
const $goalLeftBtn = document.querySelector(".anaypage__goal__check__left");
$goalLeftBtn.addEventListener('click', ()=>{
  goalWeekNum++;
  setGoaltBtn();
  setGoalAchieveBox(goalWeekNum);
})

  //목표 왼쪽 버튼
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

//목표 달성 유무
function setGoalAchieveBox(goalWeekNum){
  const $goalDataBox = document.querySelector(".anaypage__goal__check__main");

  const goalBoxArr = _filter(
    goal => 
      !goal.classList.contains("anaypage__goal__check__wrap")
        ,$goalDataBox.children
  )

  setGoalAchieve(goalBoxArr, goalWeekNum)
}


