//한 시간마다의 걸음도 조회할 수 있어서 일정 이상의 걸음이 되면 오늘의 걷기에 운동했다고 할 수 있을 듯 근데 시간이 너무 차이나서 오늘의 걷기는 힘들 듯함?
import { _filter } from '../fx.js';
import { onStepData, walkDayArr, chartDateArr } from './anaypage_step.js';

(function hasStepData(){
  onStepData();
})();


const $walkDataDays = document.querySelector(".anaypage__walk__graph__day__ul");

//걸음 수 요일
for(let i = 0; i < walkDayArr.length; i++){
  $walkDataDays.children[i].innerText = walkDayArr[i];
}

console.log(chartDateArr);

const $walkDataGraph = document.querySelector(".anaypage__walk__graph__box");
console.log($walkDataGraph.children)

const chartBarArr = _filter(
  charBar => 
    charBar.classList.contains("anaypage__walk__graph__graph")
      ,$walkDataGraph.children
)

console.log(chartBarArr.children)