export default class BankController {
  constructor(bankTotalModel, { bankTotalView, bankHistoryView }) {

    this.bankTotalModel = bankTotalModel;

    this.bankTotalView = bankTotalView;
    this.bankHistoryView = bankHistoryView;

    this.setTotalData();
    this.setHistoryData();

    this.renderTotalAsset();
    this.renderTotalWalk();
    this.renderTitleList();
    this.subscribeViewEvent();
    this.renderHistory();

  }

  setTotalData() {
    this.totalStepData = this.bankTotalModel.getBankStepData();
    this.titleList = this.bankTotalModel.allTitles();
    this.totalAssetInfo = this.bankTotalModel.setBankData();
  }

  subscribeViewEvent() {
    this.bankTotalView.on("@showTitleList", (event) => this.renderTitleList(event));
    this.bankTotalView.on("@hideTitleList", (event) => this.renderTitleList(event))
  }

  renderTitleList(event) {
    event === undefined || event.type === '@hideTitleList'
    ? this.bankTotalView.titleModalWrap.style = ("display: none")
    : this.bankTotalView.titleModalWrap.style = ("display: block");
  }

  renderTotalAsset() {
    this.bankTotalView.setBankMoneyGraph(this.totalStepData, this.totalAssetInfo.bankMoneyGraghMax, this.totalAssetInfo.bankMoneyGraghMin);    // 나중에 리펙터링 필요!
    this.bankTotalView.setTitle(this.titleList, this.totalAssetInfo.currentTitleNum);
  }

  renderTotalWalk() {
    this.bankTotalView.setBankTotalData(this.totalStepData,);
  }

  setHistoryData() {
    this.stepData = this.bankTotalModel.getStepData();
    this.dayData = this.bankTotalModel.getDayData();
    this.goalData = this.bankTotalModel.getGoalData();
  }

  renderHistory() {
    this.bankHistoryView.setHistory(this.stepData, this.dayData, this.goalData);
  }

}