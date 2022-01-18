import { groupBySize, L } from "../../fx.js";
import { qs } from "../../helper.js";

export default class AnayModal {
  constructor() {
    this.setChartDateList();
    this.setSleepChartData();
    this.setWeightChartData();
  }

  setChartDateList() {
    this.date = new Date();
    this.monthDataArr = [];
    const prevLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    let todayDate = this.date.getDate();
    let thisMonth = this.date.getMonth() + 1;

    _.go( // 합칠 수 있지 않을까?
      L.range(Infinity),
      L.map((rangeNum) => rangeNum == todayDate ? ((thisMonth -= 1), rangeNum) : rangeNum),
      L.map((rangeNum) => rangeNum >= todayDate
          ? this.monthDataArr.push([thisMonth, prevLastDate + todayDate - rangeNum])
          : this.monthDataArr.push([thisMonth, todayDate - rangeNum])),
      _.take(28),
      _.map((rangeNum) => (this.monthDataArr[rangeNum - 1][2] = "")),
      _.map((sleepData) => sleepData),
      groupBySize(7),
      _.values
    );

    this.monthDataArr = _.go(
      this.monthDataArr,
      _.map((v) => v),
      groupBySize(7),
      _.values);
  }

  setSleepChartData() {
    const sleepDataList = JSON.parse(localStorage.getItem("CURRENT_SLEEP"));
    const monthSleepDataArr = JSON.parse(JSON.stringify(this.monthDataArr));

    if (sleepDataList && sleepDataList[0][1] !== this.date.getDate()) {
      //로컬에 데이터가 있고 오늘 날짜와 다르다면
      _.go(
        sleepDataList.flat(),
        L.filter((localSleepData) => localSleepData[2] > 0),
        _.map((localSleepData) => _.go(
            monthSleepDataArr.flat(),
            L.filter((sleeptData) => sleeptData[0] === localSleepData[0]),
            L.filter((sleeptData) => sleeptData[1] === localSleepData[1]),
            _.map((sleeptData) => (sleeptData[2] = localSleepData[2]))
          )
        )
      );
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(monthSleepDataArr));
    } else if (!sleepDataList) {
      //로컬에 데이터 없다면 초기 상태
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(monthSleepDataArr));
    }
  }

  getSleepData() {
    return JSON.parse(localStorage.getItem("CURRENT_SLEEP"));
  }

  setSleepChartElement() { // 추상화 가능
    const sleepElementWrap = qs(".anaypage__sleep__graph__box");

    return _.go(
      sleepElementWrap.children,
      _.filter((sleepElement) => sleepElement.classList.contains("anaypage__sleep__graph__graph")))
  }

  addSleepData(sleepData) {
    const sleepDataList = JSON.parse(localStorage.getItem("CURRENT_SLEEP"));
    sleepDataList[0][0][2] = sleepData;
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataList));
  }

  setWeightChartData() {
    const weightDataList = JSON.parse(localStorage.getItem("CURRENT_WEIGHT"));
    const monthWeightDataArr = JSON.parse(JSON.stringify(this.monthDataArr));

    if (weightDataList && weightDataList[0][1] !== this.date.getDate()) {
      //로컬에 데이터가 있고 오늘 날짜와 다르다면
      _.go(
        weightDataList.flat(),
        L.filter((localWeightData) => localWeightData[2] > 0),
        _.map((localWeightData) => _.go(
            monthWeightDataArr.flat(),
            L.filter((weightData) => weightData[0] === localWeightData[0]),
            L.filter((weightData) => weightData[1] === localWeightData[1]),
            _.map((weightData) => (weightData[2] = localWeightData[2]))
          )
        )
      );
      localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(monthWeightDataArr));
    } else if (!weightDataList) {
      //로컬에 데이터 없다면 초기 상태
      localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(monthWeightDataArr));
    }
  }

  addWeightData(weightData) {
    const weightDataList = JSON.parse(localStorage.getItem("CURRENT_WEIGHT"));
    weightDataList[0][0][2] = weightData; // flatAll 같은 걸로 배열 다 풀어버리기
    localStorage.setItem("CURRENT_WEIGHT", JSON.stringify(weightDataList));
  }

  setWeightChartElement() {
    const weightElementWrap = qs(".anaypage__weight__graph__box");

    return _.go(
      weightElementWrap.children,
      _.filter((weightElement) => weightElement.classList.contains("anaypage__weight__graph__graph")));
  }

  getWeightData() {
    return JSON.parse(localStorage.getItem("CURRENT_WEIGHT"));
  }
  
  setWeightGoalData(event) {
    localStorage.setItem("GOAL_WEIGHT", event);
  }

  getWeightGoalData() {
    return localStorage.getItem("GOAL_WEIGHT");
  }

  setStepDataList() {
    const stepDataList = JSON.parse(localStorage.getItem("STEP_DATA"));

    return _.go(
      stepDataList.steps_count,
      L.map((stepData) => stepData),
      groupBySize(7),
      _.values,
      L.map((v) => v.reverse()),
      _.take(4)
    );
  }

  steGoalElementList() {
    const goaElementWrap = document.querySelector(".anaypage__goal__check__main");

    return _.go(
      goaElementWrap.children,
      _.filter((element) => !element.classList.contains("anaypage__goal__check__wrap")));
  }

  setGoalData() {
    return JSON.parse(localStorage.getItem("STEP_GOAL"));
  }

}
