export default class AnayController {
  constructor(anayModal, { anaySleepView, anayWeightView, anayGoalView }) {

    this.anayModal = anayModal;

    this.anaySleepView = anaySleepView;
    this.anayWeightView = anayWeightView;
    this.anayGoalView = anayGoalView; 

    this.setData();

    this.renderSleep();

    this.renderWeight();

    this.renderGoal();

    this.subScribeViewEvents();
  }

  setData() {
    this.sleepElemnetList = this.anayModal.setSleepChartElement();
    this.sleepDataList = this.anayModal.getSleepData();
    this.weightElementList = this.anayModal.setWeightChartElement();
    this.weightDataList = this.anayModal.getWeightData();
    this.weightGoalData = this.anayModal.getWeightGoalData();
    this.stepDataList = this.anayModal.setStepDataList();
    this.goalElementList = this.anayModal.steGoalElementList();
    this.goalData = this.anayModal.setGoalData();
  }

  renderSleep() {
    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
    this.anaySleepView.setCurrentSleep();
    this.anaySleepView.setSleepDataAverage();
  }

  renderWeight() {
    this.anayWeightView.setWeightChartHeight(this.weightElementList, this.weightDataList); // 데이터하고 엘리먼트 불러오는 것 까지
    this.anayWeightView.setCurrentWeight(this.weightDataList);
    this.anayWeightView.setCurrentBmi(this.weightDataList);
    this.anayWeightView.setWeightGoal(this.weightGoalData, this.weightDataList);
  }

  renderGoal() {
    this.goalData 
    ? this.anayGoalView.setGoalAchieve(this.goalElementList, this.stepDataList, this.goalData)
    : this.anayGoalView.noStepGoal();
  }

  subScribeViewEvents() {
    this.anaySleepView.on("@sleepSubmit", (event) => this.setInputSleepData(event));
    this.anaySleepView.on("@sleepButtom", () => this.setSleepButton());
    this.anayWeightView.on("@weightSubmit", (event) => this.setInputWeightData(event));
    this.anayWeightView.on("@weightGoalSubmit", (event) => this.setInputWeightGoaltData(event));
    this.anayWeightView.on("@weightButtom", () => this.setWeightButton());
    this.anayGoalView.on("@goalButtom", () => this.setGoalButton());

  }

  setInputWeightGoaltData(event) {
    this.anayModal.setWeightGoalData(event.detail);
    this.setData();
    this.renderWeight();
  }

  setInputWeightData(event) {
    this.anayModal.addWeightData(event.detail);
    this.setData();
    this.renderWeight();
  }

  setSleepButton() {
    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
  }

  setInputSleepData(event) {
    this.anayModal.addSleepData(event.detail);
    this.setData();
    this.renderSleep();
  }
  
  setWeightButton() {
    this.anayWeightView.setWeightChartHeight(this.weightElementList, this.weightDataList);
  }

  setGoalButton() {
    this.anayGoalView.setGoalAchieve(this.goalElementList, this.stepDataList, this.goalData);
  }

}