import { chartDataArr } from './anaypage_step.js';

//목표 달성 유무
export function setGoalAchieve(goalBoxArr, goalWeekNum) {
  const goalStep = localStorage.getItem("STEP_GOAL");
  const noGoalText = `<div class="noGoalText">목표를 설정해주세요</div>`;
  if (!goalWeekNum) goalWeekNum = 0;
  if (goalStep) {
    _.map(a => a.classList.remove("acheiveGoal", "NotAcheiveGoal"), goalBoxArr);
    for (const [setData, goalDiv] of _.zip(chartDataArr[goalWeekNum], goalBoxArr)) {
      setData.value >= Number(goalStep) 
      ? goalDiv.classList.add("acheiveGoal")
      : goalDiv.classList.add("NotAcheiveGoal");
    }
  } else {
    return noGoalText;
  }
}