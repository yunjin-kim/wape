import { chartDataArr } from './anaypage_step.js';
import { _map, _go, _take } from '../fx.js';

//목표 달성 유무
export function setGoalAchieve(goalBoxArr, goalWeekNum) {
  const goalStep = localStorage.getItem("STEP_GOAL");
  const noGoalText = `<div class="noGoalText">목표를 설정해주세요</div>`;

  if(!goalWeekNum) goalWeekNum = 0;
  
  if(goalStep) {

    for(let i = 0; i < goalBoxArr.length; i++){
      goalBoxArr[i].classList.remove("acheiveGoal", "NotAcheiveGoal");
    }

    // _go(
    //   _map(goalBox => goalBox.classList.remove("acheiveGoal", "NotAcheiveGoal")),
    //   _take(6),
    // goalBoxArr);

    // (_map((chartData, goalBox) => chartData.value >= goalStep ? goalBox.classList.add("acheiveGoal") : goalBox.classList.add("NotAcheiveGoal"),
    // chartDataArr[goalWeekNum], 
    // goalBoxArr))

    // (
    // _map(),
    // chartDataArr[goalWeekNum],
    // goalBoxArr)

    console.log(goalBoxArr)

    for(let i = 0; i < goalBoxArr.length; i++) {
      {chartDataArr[goalWeekNum][i].value >= goalStep
        ? goalBoxArr[i].classList.add("acheiveGoal")
        :goalBoxArr[i].classList.add("NotAcheiveGoal")}
    }


  }
  else {
    return noGoalText;
  }

}