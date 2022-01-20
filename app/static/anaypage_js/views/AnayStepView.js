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
    this.weekDiffPercentWrap = qs(".anaypage__walk__accure__percent");
    this.weekDiffPercent = qs(".anaypage__walk__accure__weekPercent");
    this.stepPercentArrow = qs(".stepPercentArrow");
    this.weekStepAverage = qs(".anaypage__walk__weekAverage");
    this.wekkStepSum = qs(".anaypage__walk__accure__weekValue");

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
    dayOfWeekData.forEach((_, dateIndex) => {
      this.stepDayOfWeekWrap.children[dateIndex].textContent = dayOfWeekData[dateIndex];
    })
  }

  setStepChartHeight(stepElementList, stepDataGroup) {
    let chartDataArrFlat = _.values(stepDataGroup).flat();
    this.monthSumStep = _.reduce(add, _.map((v) => v.value, chartDataArrFlat));
    this.weekSumStep = _.reduce(add, _.map((stepData) => stepData.value, stepDataGroup[this.stepPageNumber]));

    this.stepAverage = parseInt(this.monthSumStep / 1200);
    for (const [chartBar, stepData] of _.zip(stepElementList, stepDataGroup[this.stepPageNumber])) {
      chartBar.children[0].textContent = stepData.value;
      chartBar.children[1].style.height = `${stepData.value / this.stepAverage}px`;
    }
  }

  setWeekPercent(eachWeekStepDataSum) {
    for (let i = 0; i < eachWeekStepDataSum.length; i++) {
      if (eachWeekStepDataSum[i] === this.weekSumStep) {
        if (eachWeekStepDataSum[i] > eachWeekStepDataSum[i + 1]) {
          this.percentData = parseInt(
            ((eachWeekStepDataSum[i] - eachWeekStepDataSum[i + 1]) / eachWeekStepDataSum[i]) * 100
          );
        } else if (eachWeekStepDataSum[i] < eachWeekStepDataSum[i + 1]) {
          this.percentData = parseInt(
            (eachWeekStepDataSum[i] / eachWeekStepDataSum[i + 1] - 1) * 100
          );
        } else if (eachWeekStepDataSum[i] === eachWeekStepDataSum[i + 1]) {
          this.percentData = 0;
        } else if (i === 3) {
          this.percentData = "";
        }
      }
    }
  }

  showWeekPercent() {
    if (this.percentData === "") {
      this.weekDiffPercentWrap.style = "opacity: 0";
    } else {
      this.weekDiffPercentWrap.style = "opacity: 1";
      if (this.percentData < 0) {
        this.stepPercentArrow.style = "transform : rotate(180deg)";
      } else if (this.percentData > 0) {
        this.stepPercentArrow.style = "transform : rotate(0deg)";
      }
    }
    this.weekDiffPercent.textContent = this.percentData;
  }

  setWeekStepData() {
    this.weekStepAverage.textContent = parseInt(this.weekSumStep / 7);
    this.wekkStepSum.textContent = this.weekSumStep;
  }
}