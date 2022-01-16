export default class AnayController {
  constructor(anayModal, { anaySleepView }) {

    this.anayModal = anayModal;

    this.anaySleepView = anaySleepView;

    this.setData();

    this.renderSleep();

    this.subScribeViewEvents();
  }

  setData() {
    this.sleepElemnetList = this.anayModal.setSleepChartElement();
    this.sleepDataList = this.anayModal.getSleepData();
  }

  renderSleep() { // sleepWeekNum 나중에 넣어주기
    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
    console.log(this.sleepElemnetList, this.sleepDataList);
    this.anaySleepView.setCurrentSleep();
    this.anaySleepView.setSleepDataAverage();
    this.anaySleepView.setCurrentSleep();
  }

  subScribeViewEvents() {
    this.anaySleepView.on("@sleepSubmit", (event) => this.setInputSleepData(event));
    this.anaySleepView.on("@sleepButtom", () => this.setSleepLeftButton());
  }

  setSleepLeftButton() {
    this.anaySleepView.setSleepChartHeight(this.sleepElemnetList, this.sleepDataList);
  }

  setInputSleepData(event) {
    console.log(event.detail)
    this.anayModal.addInputSleepData(event.detail);
    this.setData();
    this.renderSleep();
  }
  
}