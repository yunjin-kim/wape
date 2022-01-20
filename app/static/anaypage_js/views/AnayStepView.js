import { add, L } from "../../fx.js";
import { qs, on } from "../../helper.js";
import View from "./View.js";

export default class AnayStepView extends View {
  constructor() {
    super(qs(".anaypage__walk"));

    this.stepPageNumber = 0;

    this.stepDayOfWeekWrap = qs(".anaypage__walk__graph__day__ul");
    this.stepLeftButton = qs(".anaypage__walk__graph__left");
    this.stepRightButton = qs(".anaypage__walk__graph__right");

    this.bindEvent();
  }

  bindEvent() {
    on(this.stepLeftButton, "click", () => this.handleStepLeftButton());
    on(this.stepRightButton, "click", () => this.handleStepRightButton());
  }

  handleStepLeftButton() {
    this.stepPageNumber++;
    this.emit("@stepButton");
    this.setStepButton();
  }

  handleStepRightButton() {
    this.stepPageNumber--;
    this.emit("@stepButton");
    this.setStepButton();
  }

  setStepButton() {
    // classList.add View 함수에 추가 추상화 추가
    if (this.stepPageNumber == 3) {
      this.stepLeftButton.classList.add("hiddenButton");
    } else if (this.stepPageNumber == 0) {
      this.stepRightButton.classList.add("hiddenButton");
    } else {
      this.stepLeftButton.classList.remove("hiddenButton");
      this.stepRightButton.classList.remove("hiddenButton");
    }
  }

  setDayOfWeek(dayOfWeekData) {
    for (let i = 0; i < dayOfWeekData.length; i++) {
      this.stepDayOfWeekWrap.children[i].textContent = dayOfWeekData[i];
    }
  }

  setStepChartHeight(stepElementList, stepDataGroup) {
    let chartDataArrFlat = _.values(stepDataGroup).flat();
    this.monthSumStep = _.reduce(add, _.map((v) => v.value, chartDataArrFlat));
    this.weekSumStep = _.reduce(add, _.map((stepData) => stepData.value, stepDataGroup[this.stepPageNumber]));

    stepElementList.map(
      (chartBar) => (
        (chartBar.children[0].textContent = "0px"),
        (chartBar.children[1].style.height = "0px")
      )
    );
    this.stepAverage = parseInt(this.monthSumStep / 1200);
    for (const [chartBar, stepData] of _.zip(stepElementList, stepDataGroup[this.stepPageNumber])) {
      chartBar.children[0].textContent = stepData.value;
      chartBar.children[1].style.height = `${stepData.value / this.stepAverage}px`;
    }
  }

  setWeekPercent(stepDataGroup) {
    const dataSumArr = _.go(
      L.entries(stepDataGroup),
      L.map(([_, stepData]) => stepData),
      L.map((stepData) => _.go(
        stepData,
        L.map((stepData) => stepData.value),
        _.reduce(add)
      )),
      _.take(4)
    );

    for (let i = 0; i < dataSumArr.length; i++) {
      if (dataSumArr[i] === this.weekSumStep) {
        if (dataSumArr[i] > dataSumArr[i + 1]) {
          this.percentData = parseInt(
            ((dataSumArr[i] - dataSumArr[i + 1]) / dataSumArr[i]) * 100
          );
        } else if (dataSumArr[i] < dataSumArr[i + 1]) {
          this.percentData = parseInt(
            (dataSumArr[i] / dataSumArr[i + 1] - 1) * 100
          );
        } else if (dataSumArr[i] === dataSumArr[i + 1]) {
          this.percentData = 0;
        } else if (i === 3) {
          this.percentData = "";
        }
      }
    }
  }

  showWeekPercent() {
    const $weekDiffPercentWrap = document.querySelector(
      ".anaypage__walk__accure__percent"
    );
    const $weekDiffPercent = document.querySelector(
      ".anaypage__walk__accure__weekPercent"
    );
    const $stpPercentArrow = document.querySelector(".stepPercentArrow");
    if (this.percentData === "") {
      $weekDiffPercentWrap.style = "opacity: 0";
    } else {
      $weekDiffPercentWrap.style = "opacity: 1";
      if (this.percentData < 0) {
        $stpPercentArrow.style = "transform : rotate(180deg)";
      } else if (this.percentData > 0) {
        $stpPercentArrow.style = "transform : rotate(0deg)";
      }
    }
    $weekDiffPercent.textContent = this.percentData;
  }

  setWeekStepData() {
    const $weekStepAverage = document.querySelector(
      ".anaypage__walk__weekAverage"
    );
    const $wekkStepSum = document.querySelector(
      ".anaypage__walk__accure__weekValue"
    );
    $weekStepAverage.textContent = parseInt(this.weekSumStep / 7);
    $wekkStepSum.textContent = this.weekSumStep;
  }
}