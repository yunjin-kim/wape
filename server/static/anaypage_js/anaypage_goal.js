import { chartDateArr } from './anaypage_step.js';

//목표 달성 유무
export function setGoalAchieve(goalBoxArr, goalWeekNum){
  if(!goalWeekNum) goalWeekNum = 0;

  let goalStep = localStorage.getItem("STEP_GOAL");

  for(let i = 0; i < goalBoxArr.length; i++){
    goalBoxArr[i].classList.remove("acheiveGoal", "NotAcheiveGoal");
    
    if(chartDateArr[goalWeekNum][i].value > goalStep){
      goalBoxArr[i].classList.add("acheiveGoal")
    }
    else{
      goalBoxArr[i].classList.add("NotAcheiveGoal")
    }
  }
}