import { add, groupBySize, L } from "../../fx.js";
import { qs } from "../../helper.js";
import AnayStepView from "../views/AnayStepView.js";

export default class AnayModal {
  constructor() {
    this.anayStepView = new AnayStepView(); // 에러처리에 대한 모달 때문에 뷰를 한번 더 실행하는데 이게 맞나?
    this.date = new Date();
    this.setChartDateList();
    this.setSleepChartData();
    this.setWeightChartData();
  }

  setChartDateList() {
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

  steGoalElementList() {
    const goaElementWrap = document.querySelector(".anaypage__goal__check__main");

    return _.go(
      goaElementWrap.children,
      _.filter((element) => !element.classList.contains("anaypage__goal__check__wrap")));
  }

  setGoalData() {
    return JSON.parse(localStorage.getItem("STEP_GOAL"));
  }

  setDayOfWeek() {
    const walkDayArr = [];
    const holeDay = ["월", "화", "수", "목", "금", "토", "일"];
    let walkDataDay = this.date.getDay();
    for (let i = 0; i < 7; i++) {
      if (walkDataDay === -1) walkDataDay = 6;
      if (walkDataDay >= 7) walkDataDay = 0;
      walkDataDay++;
      walkDayArr.push(holeDay[walkDataDay - 1]);
    }

    return walkDayArr;
  }

  setStepDataGroup() {
    const stepDataList = JSON.parse(localStorage.getItem("STEP_DATA"));

    return _.go(
      stepDataList.steps_count,
      L.map((stepData) => stepData),
      groupBySize(7),
      _.values,
      L.map((v) => v.reverse()),
      _.take(4),
    );
  }
  // 에러 모달 처리 해주기
  async getStepDataList() {
    const googleStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=30days";
    try {
      const response = await fetch(googleStepCountUrl);
      const data = await response.json();
      localStorage.setItem("STEP_DATA", JSON.stringify(data));
      this.setValidateData(data);
      return data;
    } catch (e) {
      this.anayStepView.stepDataErrorModal();
      console.log(e);
    }
  }

  setValidateData(data) {
    const lastStepDataDate = data.steps_count[data.steps_count.length - 1].endTime[0] + data.steps_count[data.steps_count.length - 1].endTime[1];
    if (lastStepDataDate < this.date.getDate()) {
      if (this.date.getHours() < 12) { // 12시 기준으로 당일 데이터 불러올 수 있다
        this.anayStepView.beforeLunchStepDataModal(); 
      } else {
        this.anayStepView.updateStepDataModal();
      }
    }
  }

  getStepData() {
    return JSON.parse(localStorage.getItem("STEP_DATA"));
  }

  setStepChart() {
  const stepDataGraphWrap = qs(".anaypage__walk__graph__box");

  return _.filter(
    (charBar) => charBar.classList.contains("anaypage__walk__graph__graph"),
    stepDataGraphWrap.children
  );
  }

  setEachWeekStepDataSum(stepDataGroup) {
    return _.go(
      L.entries(stepDataGroup),
      L.map(([_, stepData]) => stepData),
      L.map((stepData) => _.go(
        stepData,
        L.map((stepData) => stepData.value),
        _.reduce(add)
      )),
      _.take(4)
    );
  }

}
