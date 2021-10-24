//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
//날짜 세팅하고 버튼 클릭은 4개 다 같아서 나중에 다 구현하고 리펙토링해서 하나로
import { _filter } from '../fx.js';
import { onStepData, walkDayArr, setStepChartHeight, percentData, setWeekPercent } from './anaypage_step.js';
import { setGoalAchieve, goalStep } from './anaypage_goal.js';
import { showGoalWeihgtModal, setGoalWeight, showWeihgtModal, setCurrentWeight, setuntilGoalWeight } from './anaypage_weight.js';
import { lastMonthDate, onToday } from '../mainpage_js/mainpage_reserve.js'

let weekNum = 0;
let goalWeekNum = 0
let weightWeekNum = 0;

//걸음수 주 평균, 총합
export function setWeekStepData(weekSumStep){
  const $weekStepAverage = document.querySelector(".anaypage__walk__weekAverage");
  const $wekkStepSum = document.querySelector(".anaypage__walk__accure__weekValue");
  $weekStepAverage.textContent = parseInt(weekSumStep/7);
  $wekkStepSum.textContent = weekSumStep;
}

(function hasStepData(){
  onStepData();
})();

export function hadStepData(){
  setGraphDate();
  setStepChart(weekNum);
  setWeekPercent();
  ifNoGoal();
  setGoalWeight();
  setCurrentWeight();
  setWeightChart()
  untilGoalWeight()
}

//그래프 요일 
function setGraphDate(){
  const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");
  const $goalDays = document.querySelector(".anaypage__goal__check__day__ul");
  const $weightDays = document.querySelector(".anaypage__weight__graph__day__ul")

  for(let i = 0; i < walkDayArr.length; i++){
    $walkDataDays.children[i].textContent = walkDayArr[i];
    $goalDays.children[i].textContent = walkDayArr[i];
    $weightDays.children[i].textContent = walkDayArr[i];
  }
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

  setGoalAchieve(goalBoxArr, goalWeekNum)
}

//체중 왼쪽 버튼
const $weightLeftBtn = document.querySelector(".anaypage__weight__graph__left");
$weightLeftBtn.addEventListener('click', ()=>{
  weightWeekNum++;
  setWeighttBtn();
})

//체중 오른쪽 버튼
const $weightRightBtn = document.querySelector(".anaypage__weight__graph__right");
$weightRightBtn.addEventListener('click', ()=>{
  weightWeekNum--;
  setWeighttBtn();
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

//목표 체중 설정
const $setGoalWeight = document.querySelector(".anaypage__weight__accure");
$setGoalWeight.addEventListener('click', (e)=> {
  showGoalWeihgtModal(e);
})

const $noWeightGoalDiv = document.querySelector(".anaypage__noweight__accure");
$noWeightGoalDiv.addEventListener('click', (e)=> {
  showGoalWeihgtModal(e);
})

//현재 체중 설정
const $currentWeight = document.querySelector(".anaypage__weight__current");
$currentWeight.addEventListener('click', (e)=>{
  showWeihgtModal(e);
})

const $noCurrentWeight = document.querySelector(".anaypage__noweight__current");
$noCurrentWeight.addEventListener('click', (e)=>{
  showWeihgtModal(e);
})

//목표 체중 차트  버튼 누르면 바뀌는거 해야함
function setWeightChart(){
  const $weightBox = document.querySelector(".anaypage__weight__graph__box");
  let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
  let parseTotalWeightData = JSON.parse(getTotalWeightData);

  const weightBoxArr = _filter(
    weight => 
      weight.classList.contains("anaypage__weight__graph__graph")
        ,$weightBox.children
  )

  console.log(weightBoxArr)

  console.log(onToday)//오늘
console.log(lastMonthDate)//지난달 마지막날
let oneMonthDateArr = [];
let todayDate = onToday;
for(let i = 0; i <= 29; i++){
  let date = todayDate - i;
  if(date === 0){
    for(let j = 0; j <= 30 - oneMonthDateArr.length; j++){
      oneMonthDateArr.push(lastMonthDate - j);
    }
    break;
  } 
  oneMonthDateArr.push(date);
}
console.log(oneMonthDateArr)

for(let i = 0; i < 7; i++){
  weightBoxArr[6-i].id = oneMonthDateArr[i];
}

console.log(weightBoxArr)

console.log(parseTotalWeightData)

console.log(typeof(parseTotalWeightData[0]))
console.log(typeof(parseTotalWeightData[1]))

  // let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
  // let parseTotalWeightData = JSON.parse(getTotalWeightData);

  // if((parseTotalWeightData.length/2) <= 7){

  //   for(let i = 0; i < (parseTotalWeightData.length/2); i++){
  //     weightBoxArr[6-i].children[1].style.height = `${parseTotalWeightData[parseTotalWeightData.length-(i*2+1)]}px`;
  //     weightBoxArr[6-i].children[0].textContent = parseTotalWeightData[parseTotalWeightData.length-(i*2+1)];
  //   }
  // }
  // else if((parseTotalWeightData.length/2) > 7){
    
  //   for(let i = 0; i < weightBoxArr.length; i++){
  //     weightBoxArr[6-i].children[1].style.height = `${parseTotalWeightData[parseTotalWeightData.length-(i*2+1)]}px`;
  //     weightBoxArr[6-i].children[0].textContent = parseTotalWeightData[parseTotalWeightData.length-(i*2+1)];
  //   }
  // }
}

//목표 체중까지
function untilGoalWeight(){
  const $untilGoalWeight = document.querySelector(".untilGoalWeight");
  $untilGoalWeight.textContent = setuntilGoalWeight();
}
//체중은 버튼 클릭하면 날짜에 id가 바뀌아사 local에서 불러온거랑 비교해서 데이터 넣을 수 있게
//만약 로컬의 길이가 28이상이면 로컬에서 제일 오래된 삭제
//체중은 일력하지 않으면 빈칸으로;

console.log(onToday)//오늘
console.log(lastMonthDate)//지난달 마지막날
let oneMonthDateArr = [];
let todayDate = onToday;
for(let i = 0; i <= 29; i++){
  let date = todayDate - i;
  if(date === 0){
    for(let j = 0; j <= 30 - oneMonthDateArr.length; j++){
      oneMonthDateArr.push(lastMonthDate - j);
    }
    break;
  } 
  oneMonthDateArr.push(date);
}
console.log(oneMonthDateArr)

let getTotalWeightData = localStorage.getItem("STEP_CURRENT_WEIGHT");
let parseTotalWeightData = JSON.parse(getTotalWeightData);

console.log(parseTotalWeightData)