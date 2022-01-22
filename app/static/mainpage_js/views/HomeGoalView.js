import { creatEl, on, qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeGoalView extends View {
  constructor() {
    super(qs(".mainpage__goal"));

    this.temlate = new Template();

    this.goalStepGraphElement = qs(".mainpage__walk__graph__my", this.element);
    this.moneyGraphElement = qs(".mainpage__money__graph__my", this.element);

    this.goalStepRateElement = qs(".setGoal", this.element);
    this.goalMoneyRateElement = qs(".setMoney", this.element);
    this.todayStepRateElement = qs(".todayStep", this.element);
    this.todayMoneyRateElement = qs(".todayMoney", this.element);

    this.goalStepButton = qs(".mainpage__walk__icon", this.element);

    this.bindEvent();
  }

  bindEvent() {
    on(this.goalStepButton, "click", () => this.showGoalModal());
  }

  showGoalModal() {
    this.element.append(this.temlate.goalStepModal());
    this.bindGoalEvent();
  }

  bindGoalEvent() {
    this.goalModal = qs(".goalModal", this.element);
    this.goalModalCloseButton = qs(".goalModalClose", this.element);
    this.goalModalInput = qs(".goalInput", this.element);
    this.goalSubmitButton = qs(".goalSubmitBtn", this.element);
    on(this.goalModalCloseButton, "click", () => this.handleGoalModalClose());
    on(this.goalModalInput, "change", (event) => this.handleGoalModelInput(event));
    on(this.goalSubmitButton, "click", () => this.handleGoalSubmit());
  }

  handleGoalModalClose() {
    this.goalModal.remove();
  }
  
  handleGoalModelInput(event) {
    this.goalInputValue = event.target.value;
  }

  handleGoalSubmit() {
    const value = this.goalInputValue;
    this.emit("@submit", value);
    this.goalModal.remove();
  }

  renderGoalGraph(stepData, goalStepData) {
    let stepGraghWidth = stepData / goalStepData * 230;
    if (stepGraghWidth > 230) stepGraghWidth = 236;
    this.goalStepGraphElement.style = `width: ${stepGraghWidth}px`;
    this.moneyGraphElement.style = `width: ${stepGraghWidth}px`;
  }

  renderGoalRate(stepData, goalStepData) {
    this.goalStepRateElement.textContent = goalStepData ? goalStepData : '목표를 설정해주세요';
    this.goalMoneyRateElement.textContent = goalStepData ? goalStepData * 5 : '목표를 설정해주세요';
    this.todayStepRateElement.textContent = stepData;
    this.todayMoneyRateElement.textContent = stepData * 5;
  }

}

class Template { 


  goalStepModal() {
    const divFargment = creatEl('div');
    divFargment.innerHTML = `
      <div class="goalModal">
        <h3 class="goalModalTitle">목표 걸음 수</h3>
        <button class="goalModalClose">X</button>
        <input class="goalInput" type="number" >
        <button class="goalSubmitBtn">목표 설정</button>
      </div>
    `;

    return divFargment;
  } 

}