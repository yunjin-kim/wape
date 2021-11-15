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

    // _.go(
    //   goalBoxArr,
    //   _.map(goalBox => console.log(goalBox.index)), // true false 어떻게 할 것 인가?
    // )
    
    // console.log(goalBoxArr);

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