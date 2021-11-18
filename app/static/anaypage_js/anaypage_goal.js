import { chartDataArr } from './anaypage_step.js';

//목표 달성 유무
export function setGoalAchieve(goalBoxArr, goalWeekNum) {
  const goalStep = localStorage.getItem("STEP_GOAL");
  const noGoalText = `<div class="noGoalText">목표를 설정해주세요</div>`;

  if(!goalWeekNum) goalWeekNum = 0;
  
  if(goalStep) {

    _.map(a => a.classList.remove("acheiveGoal", "NotAcheiveGoal"), goalBoxArr);

    const chartDataOverGoalStepArr = _.go(
      chartDataArr[goalWeekNum],
      _.map(chartData => chartData.value >= goalStep)
    )

    // for(let i = 0;  i < goalBoxArr.length; i++) {
    //   if(chartDataArr[goalWeekNum][i].value >= goalStep) {
    //     goalBoxArr[i].classList.add("acheiveGoal")
    //   }
    // }

    // for(let i = 0;  i < goalBoxArr.length; i++) {
    //   if(chartDataArr[goalWeekNum][i].value < goalStep) {
    //     goalBoxArr[i].classList.add("NotAcheiveGoal")
    //   }
    // }

    console.log(goalBoxArr)

    // _.go(
    //   goalBoxArr,
    //   _.map(goalBox => _.go(
    //     chartDataArr[goalWeekNum],
    //     _.map(chartData => )
    //   ))
    // )

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