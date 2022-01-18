import { on, qs } from "../../helper.js";
import View from "./View.js";

export default class AnayGoalView extends View {
  constructor() {
    super(qs(".anaypage__goal"));

    this.goalPageNumber = 0;

    this.goalDayOfWeekWrap = qs(".anaypage__goal__check__day__ul");
    this.goalLeftButton = qs(".anaypage__goal__check__left");
    this.goalRightButton = qs(".anaypage__goal__check__right");
    this.noStepGoalElement = qs(".anaypage__goal__check__noGoal");

    this.bindEvent();
  }

  bindEvent() {
    on(this.goalLeftButton, "click", () => this.handleGoalLeftButton());
    on(this.goalRightButton, "click", () => this.handleGoalRightButton());
  }

  setDayOfWeek(dayOfWeekData) {
    for (let i = 0; i < dayOfWeekData.length; i++) {
      this.goalDayOfWeekWrap.children[i].textContent = dayOfWeekData[i];
    }
  }

  handleGoalLeftButton() {
    this.goalPageNumber++;
    this.emit("@goalButtom");
    this.setGoalButton();
  }

  handleGoalRightButton() {
    this.goalPageNumber--;
    this.emit("@goalButtom");
    this.setGoalButton();
  }

  setGoalButton() {
    // classList.add View 함수에 추가 추상화 추가
    if (this.goalPageNumber == 3) {
      this.goalLeftButton.classList.add("hiddenButton");
    } else if (this.goalPageNumber == 0) {
      this.goalRightButton.classList.add("hiddenButton");
    } else {
      this.goalLeftButton.classList.remove("hiddenButton");
      this.goalRightButton.classList.remove("hiddenButton");
    }
  }

  setGoalAchieve(goalElementList, stepDataList, goalData) {
    if (goalData) {
      _.map(
        (goalElement) =>
          goalElement.classList.remove("acheiveGoal", "NotAcheiveGoal"),
        goalElementList
      );
      for (const [setData, goalElement] of _.zip(
        stepDataList[this.goalPageNumber],
        goalElementList
      )) {
        setData.value >= Number(goalData)
          ? goalElement.classList.add("acheiveGoal")
          : goalElement.classList.add("NotAcheiveGoal");
      }
    }
  }

  noStepGoal() {
    this.noStepGoalElement.innerHTML = `<div class="noGoalText">걷기 목표를 설정해주세요</div>`;
  }
}