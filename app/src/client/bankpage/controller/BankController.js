class BankController {
  constructor(bankTotalModel, { bankTotalView, bankHistoryView }) {
    this.bankTotalModel = bankTotalModel;

    this.bankTotalView = bankTotalView;
    this.bankHistoryView = bankHistoryView;

    this.renderTotalAsset();
    this.renderTotalWalk();
    this.renderHistory();
  }

  renderTotalAsset() {
    this.bankTotalView.setBankMoneyGraph(
      this.bankTotalModel.getBankStepData(),
      this.bankTotalModel.setBankData()
    );
    this.bankTotalView.setUserTitle(
      this.bankTotalModel.getTitleList(),
      this.bankTotalModel.setBankData()
    );
  }

  renderTotalWalk() {
    this.bankTotalView.setBankTotalData(this.bankTotalModel.getBankStepData());
  }

  renderHistory() {
    this.bankHistoryView.setUserReport({
      stepData: this.bankTotalModel.getStepData(),
      dayData: this.bankTotalModel.getDayData(),
      goalData: this.bankTotalModel.getGoalData(),
    });
  }
}

export default BankController;
