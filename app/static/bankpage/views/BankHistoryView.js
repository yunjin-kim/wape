import { qs } from "../../helper.js";
import View from "./View.js";

export default class BankHistoryView extends View {
  constructor() {
    super(qs('.wrap'));

    this.tamplate = new Template();
  }

  setHistory(stepData, dayData, goalData) {
    const $stepHistory = qs(".bankpage__reposit");
    $stepHistory.innerHTML = this.setStepHistory(stepData, dayData, goalData).join('');
  }

  setStepHistory(stepData, dayData, goalData) {
    const showHistoryArr = [];
    for (const [day, step] of _.zip(dayData, stepData)) {
      let myStepGragh = step / goalData * 262; 
      if (myStepGragh > 262) {
        myStepGragh = 262;    
      }
      let showHistory = this.tamplate.stepHistory(day, step, goalData, myStepGragh)

      showHistoryArr.unshift(showHistory)
    }
  
    return showHistoryArr;
  }
  
}

class Template {

  stepHistory(day, step, myGoal, myStepGragh) {
    return `
      <div class="bankpage__reposit__wrap">
        <div class="bankpage__reposit__title">
            <div class="bankpage__reposit__flex">
                <div class="circle"></div>
                <div class="bankpage__reposit__day">
                    <span>${day}</span>일
                </div>
            </div>
            <div class="bankpage__reposit__value">
                <h3>
                    <span>${(step * 0.0007).toFixed(1)}</span>km 걷고<br>
                    <span>${step * 5}</span>원 벌었어요
                </h3>
            </div>
        </div>
        <div class="bankpage__reposit__walk">
            <div class="bankpage__reposit__walk__flex">
                <h4><b>걸음 수 </b><span>${step}</span> 걸음</h4>
                <p><span>${myGoal}</span>걸음</p>
            </div>
            <div class="bankpage__reposit__walk__graph">
                <div class="bankpage__reposit__walk__total"></div>
                <div class="bankpage__reposit__walk__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
        <div class="bankpage__reposit__money">
            <div class="bankpage__reposit__money__flex">
                <h4><b>금액 </b><span>${step * 5}</span> 원</h4>
                <p><span>${myGoal*5}</span>원</p>
            </div>
            <div class="bankpage__reposit__money__graph">
                <div class="bankpage__reposit__money__total"></div>
                <div class="bankpage__reposit__money__my" style="width: ${myStepGragh}px"></div>
            </div>
        </div>
      </div>
    `;
  }

}