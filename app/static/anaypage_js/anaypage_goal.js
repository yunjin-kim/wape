import { chartDateArr } from './anaypage_step.js';
export let goalStep = localStorage.getItem("STEP_GOAL");

//목표 달성 유무
export function setGoalAchieve(goalBoxArr, goalWeekNum){
  const noGoalText = `<div class="noGoalText">목표를 설정해주세요</div>`;
  if(!goalWeekNum) goalWeekNum = 0;
  if(goalStep){
    for(let i = 0; i < goalBoxArr.length; i++){
      goalBoxArr[i].classList.remove("acheiveGoal", "NotAcheiveGoal");
    }
    for(let i = 0; i < goalBoxArr.length; i++){
      if(chartDateArr[goalWeekNum][i].value >= goalStep){
        goalBoxArr[i].classList.add("acheiveGoal")
      }
      else if(chartDateArr[goalWeekNum][i].value < goalStep){
        goalBoxArr[i].classList.add("NotAcheiveGoal")
      }
    }
  }
  else{
    return noGoalText;
  }

}