//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
import { _filter } from '../fx.js';
import { onStepData, walkDayArr, chartDateArr } from './anaypage_step.js';
let weekNum = 0;

(function hasStepData(){
  onStepData();
  setStepChartDate()
  setStepChart(weekNum)
  // setStepChartBtn()
})();

//걸음 수 요일
function setStepChartDate(){
  const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");

  for(let i = 0; i < walkDayArr.length; i++){
    $walkDataDays.children[i].innerText = walkDayArr[i];
  }
}

//걸음수 차트
function setStepChart(weekNum){
  console.log(weekNum)
  const $walkDataGraph = document.querySelector(".anaypage__walk__graph__box");

  const chartBarArr = _filter(
    charBar => 
      charBar.classList.contains("anaypage__walk__graph__graph")
        ,$walkDataGraph.children
  )

  for(let i = chartBarArr.length-1; i >= 0; i--){
    chartBarArr[i].children[1].style.height = `${chartDateArr[weekNum][6-i].value/100}px`;
  }
}

//걸음수 차트 왼쪽 버튼
const $stepChartLeftBtn = document.querySelector(".anaypage__walk__graph__left");
$stepChartLeftBtn.addEventListener('click',()=>{
    weekNum++;
    setStepChartBtn();
    setStepChart(weekNum);
})

//걸음수 차트 오른쪽 버튼
const $stepChartRightBtn = document.querySelector(".anaypage__walk__graph__right");
$stepChartRightBtn.addEventListener('click',()=>{
    weekNum--;
    setStepChartBtn();
    setStepChart(weekNum);
})

//걸음수 차트 버튼 show/hidden
function setStepChartBtn(){
  if(weekNum == 2){
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