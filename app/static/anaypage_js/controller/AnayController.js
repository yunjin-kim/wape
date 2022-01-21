export default class AnayController {
  constructor(
    anayModal, { anayStepView, anaySleepView, anayWeightView, anayGoalView }
  ) {
    this.anayModal = anayModal;

    this.anayStepView = anayStepView;
    this.anaySleepView = anaySleepView;
    this.anayWeightView = anayWeightView;
    this.anayGoalView = anayGoalView;

    this.setData();

    this.renderSleep();

    this.renderWeight();

    this.subScribeViewEvents();
  }

   setData() { // 쓸데없는 데이터를 다시 렌더하는 것보다는 중복이 낫다
    this.dayOfWeekData = this.anayModal.setDayOfWeek();
    this.setSleepData();
    this.setWeightData();
    this.setStepData();
  }

  setStepData() {
    this.stepElementList = this.anayModal.setStepChart();
    this.stepDataList = this.anayModal.getStepDataList();
    this.stepDataList.then(() => {
      this.stepDataGroup = this.anayModal.setStepDataGroup();
      this.anayStepView.setStepChartHeight(this.stepElementList, this.stepDataGroup);
      this.eachWeekStepDataSum = this.anayModal.setEachWeekStepDataSum(this.stepDataGroup);
      this.renderStep();
      this.renderGoal();
    });
  }

  setSleepData() {
    this.sleepElemnetList = this.anayModal.setSleepChartElement();
    this.sleepDataList = this.anayModal.getSleepData();
  }

  setWeightData() {
    this.weightElementList = this.anayModal.setWeightChartElement();
    this.weightDataList = this.anayModal.getWeightData();
    this.weightGoalData = this.anayModal.getWeightGoalData();
  }

  renderStep() {
    this.anayStepView.setDayOfWeek(this.dayOfWeekData);
    this.anayStepView.setWeekPercent(this.eachWeekStepDataSum);
    this.anayStepView.showWeekPercent();
    this.anayStepView.setWeekStepData();
  }

  renderSleep() {
    this.anaySleepView.setDayOfWeek(this.dayOfWeekData);
    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
    this.anaySleepView.setCurrentSleep(this.sleepDataList);
    this.anaySleepView.setSleepDataAverage(this.sleepDataList);
  }

  renderWeight() {
    this.anayWeightView.setDayOfWeek(this.dayOfWeekData);
    this.anayWeightView.setWeightChartHeight(this.weightElementList, this.weightDataList); // 데이터하고 엘리먼트 불러오는 것 까지
    this.anayWeightView.setCurrentWeight(this.weightDataList);
    this.anayWeightView.setCurrentBmi(this.weightDataList);
    this.anayWeightView.setWeightGoal(this.weightGoalData, this.weightDataList);
  }

  renderGoal() {
    this.goalElementList = this.anayModal.steGoalElementList();
    this.goalData = this.anayModal.setGoalData();
    this.anayGoalView.setDayOfWeek(this.dayOfWeekData);
    this.goalData
      ? this.anayGoalView.setGoalAchieve(this.goalElementList, this.stepDataGroup, this.goalData)
      : this.anayGoalView.noStepGoal();
  }

  subScribeViewEvents() {
    this.anaySleepView.on("@sleepSubmit", (event) => this.setInputSleepData(event));
    this.anaySleepView.on("@sleepButtom", () => this.setSleepButton());
    this.anayWeightView.on("@weightSubmit", (event) => this.setInputWeightData(event));
    this.anayWeightView.on("@weightGoalSubmit", (event) => this.setInputWeightGoaltData(event));
    this.anayWeightView.on("@weightButtom", () => this.setWeightButton());
    this.anayGoalView.on("@goalButtom", () => this.setGoalButton());
    this.anayStepView.on("@stepButton", () => this.stepStepButton());
  }

  setInputWeightGoaltData(event) {
    this.anayModal.setWeightGoalData(event.detail);
    this.setWeightData();
    this.renderWeight();
  }

  setInputWeightData(event) {
    this.anayModal.addWeightData(event.detail);
    this.setWeightData();
    this.renderWeight();
  }

  setSleepButton() {
    this.setSleepData();

    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
    this.anaySleepView.setSleepDataAverage(this.sleepDataList);
  }

  setInputSleepData(event) {
    this.anayModal.addSleepData(event.detail);
    this.setSleepData();
    this.renderSleep();
  }

  setWeightButton() {
    this.anayWeightView.setWeightChartHeight(this.weightElementList, this.weightDataList);
  }

  setGoalButton() { // 네이밍 다시 고민
    this.anayGoalView.setGoalAchieve(this.goalElementList, this.stepDataGroup, this.goalData);
  }

  stepStepButton() {
    this.anayStepView.setStepChartHeight(this.stepElementList, this.stepDataGroup);
    this.anayStepView.setWeekPercent(this.eachWeekStepDataSum);
    this.anayStepView.showWeekPercent();
    this.anayStepView.setWeekStepData();
  }
}