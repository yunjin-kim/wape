import { setStepDataArr } from "./anaypage_step.js";
import { setGoalAchieveBox } from "./anaypage.js";

// 목표 달성 유무
export function setGoalAchieve(goalWeekNum) {
  const goalStep = localStorage.getItem("STEP_GOAL");
  if (!goalWeekNum) goalWeekNum = 0;
  if (goalStep) {
    _.map(goalDiv => goalDiv.classList.remove("acheiveGoal", "NotAcheiveGoal"), setGoalAchieveBox());
    for (const [setData, goalDiv] of _.zip(setStepDataArr()[goalWeekNum], setGoalAchieveBox())) {
      setData.value >= Number(goalStep) 
      ? goalDiv.classList.add("acheiveGoal")
      : goalDiv.classList.add("NotAcheiveGoal");
    }
  } 
}