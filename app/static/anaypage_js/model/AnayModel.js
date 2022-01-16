import { groupBySize, L } from "../../fx.js";
import { qs } from "../../helper.js";

export default class AnayModal {
  constructor() {
    this.setChartDateList();
    this.setSleepChartData();
    this.setSleepChartElement();
  }

  setChartDateList() {
    console.log("setChartDateList");
    this.date = new Date();
    this.monthSleepDataArr = [];
    const prevLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    let todayDate = this.date.getDate();
    let thisMonth = this.date.getMonth() + 1;

    _.go(
      L.range(Infinity),
      L.map((rangeNum) => rangeNum == todayDate ? ((thisMonth -= 1), rangeNum) : rangeNum),
      L.map((rangeNum) => rangeNum >= todayDate
        ? this.monthSleepDataArr.push([thisMonth, prevLastDate + todayDate - rangeNum])
        : this.monthSleepDataArr.push([thisMonth, todayDate - rangeNum])),
      _.take(28),
      L.map((rangeNum) => (this.monthSleepDataArr[rangeNum - 1][2] = "")),
      L.map((sleepData) => sleepData),
      groupBySize(7),
      _.values
    );
  }

  setSleepChartData() {
    const sleepDataList = JSON.parse(localStorage.getItem("CURRENT_SLEEP"));


    if (sleepDataList && sleepDataList[0][1] !== this.date.getDate()) {
      //로컬에 데이터가 있고 오늘 날짜와 다르다면
      _.go(
        sleepDataList,
        L.filter((localSleepData) => localSleepData[2] > 0),
        _.map((localSleepData) =>_.go(
            this.monthSleepDataArr,
            L.filter((sleeptData) => sleeptData[0] === localSleepData[0]),
            L.filter((sleeptData) => sleeptData[1] === localSleepData[1]),
            _.map((sleeptData) => (sleeptData[2] = localSleepData[2])),
          )
        )
      );
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(this.monthSleepDataArr));
    } else if (!sleepDataList) {
      //로컬에 데이터 없다면 초기 상태
      localStorage.setItem("CURRENT_SLEEP", JSON.stringify(this.monthSleepDataArr));
    }
  }

  getSleepData() {
    return JSON.parse(localStorage.getItem("CURRENT_SLEEP"));
  }

  setSleepChartElement() { //수면 차트  setSleepChart
    const sleepElement = qs(".anaypage__sleep__graph__box");
    const sleepElementList = _.filter((sleep) => sleep.classList.contains("anaypage__sleep__graph__graph"), sleepElement.children);

    return sleepElementList;
  }

  addInputSleepData(sleepData) {
    const sleepDataList = JSON.parse(localStorage.getItem("CURRENT_SLEEP"));
    sleepDataList[0][2] = sleepData;
    localStorage.setItem("CURRENT_SLEEP", JSON.stringify(sleepDataList));
  }

}
