import { _go, _map } from '../fx.js'
//1걸음 = 70cm
//한걸음 = 5원
export function setStepHistory(){

  let getStepData = localStorage.getItem("STEP_DATA");
  let parseGetStepData = JSON.parse(getStepData);

  const stepValue = _go(
    parseGetStepData.steps_count,
    _map(data => data.value)
  )

  const daysValue = _go(
    parseGetStepData.steps_count,
    _map(data => (data.startTime[0]+data.startTime[1]))
  )

  const showHistoryArr = [];
  let myGoal = localStorage.getItem("STEP_GOAL");

  for(let i = 0; i < stepValue.length; i++){
    let myStepGragh = stepValue[i]/myGoal*262;
    if (myStepGragh > 262){
      myStepGragh = 262;
    }

    let showHistory = `
      <div class="bankpage__reposit__wrap">
        <div class="bankpage__reposit__title">
            <div class="bankpage__reposit__flex">
                <div class="circle"></div>
                <div class="bankpage__reposit__day">
                    <span>${daysValue[i]}</span>일
                </div>
            </div>
            <div class="bankpage__reposit__value">
                <h3>
                    <span>${(daysValue[i]*0.7).toFixed(1)}</span>km 걷고<br>
                    <span></span>원 벌었어요
                </h3>
            </div>
        </div>
        <div class="bankpage__reposit__walk">
            <div class="bankpage__reposit__walk__flex">
                <h4><b>걸음 수 </b><span>${stepValue[i]}</span> 걸음</h4>
                <p><span>${myGoal}</span>걸음</p>
            </div>
            <div class="bankpage__reposit__walk__graph">
                <div class="bankpage__reposit__walk__total"></div>
                <div class="bankpage__reposit__walk__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
        <div class="bankpage__reposit__money">
            <div class="bankpage__reposit__money__flex">
                <h4><b>금액 </b><span>${stepValue[i]*5}</span> 원</h4>
                <p><span>${myGoal*5}</span>원</p>
            </div>
            <div class="bankpage__reposit__money__graph">
                <div class="bankpage__reposit__money__total"></div>
                <div class="bankpage__reposit__money__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
      </div>
    `;
    showHistoryArr.unshift(showHistory);
  }
  return showHistoryArr;
}