class BankModel {
  constructor() {
    this.titleList = ['방구석에 콕', '걷기 비기너', '걷기 주니어', '걷기 프로', '마라톤 선수', ''];
    this.getTotalStepData = JSON.parse(localStorage.getItem('STEP_DATA'));
  }

  bankTotalPriceDivision({ bankTotalPrice, lowerPrice, higherPrice }) {
    return bankTotalPrice >= lowerPrice && bankTotalPrice < higherPrice;
  }

  userBankInfoDivision({ currentTitleNum, bankMoneyGraghMax, bankMoneyGraghMin }) {
    this.userBankInfo.currentTitleNum = currentTitleNum;
    this.userBankInfo.bankMoneyGraghMax = bankMoneyGraghMax;
    this.userBankInfo.bankMoneyGraghMin = bankMoneyGraghMin;
  }

  setBankData() {
    const bankTotalPrice = this.getBankStepData() * 5;
    this.userBankInfo = {
      currentTitleNum: 0,
      bankMoneyGraghMax: 0,
      bankMoneyGraghMin: 0,
    };

    if (this.bankTotalPriceDivision({ bankTotalPrice, lowerPrice: 0, higherPrice: 100000 })) {
      this.userBankInfoDivision({
        currentTitleNum: 0,
        bankMoneyGraghMax: 100000,
        bankMoneyGraghMin: 0,
      });
    } else if (
      this.bankTotalPriceDivision({ bankTotalPrice, lowerPrice: 100000, higherPrice: 500000 })
    ) {
      this.userBankInfoDivision({
        currentTitleNum: 1,
        bankMoneyGraghMax: 500000,
        bankMoneyGraghMin: 100000,
      });
    } else if (
      this.bankTotalPriceDivision({ bankTotalPrice, lowerPrice: 500000, higherPrice: 1000000 })
    ) {
      this.userBankInfoDivision({
        currentTitleNum: 2,
        bankMoneyGraghMax: 1000000,
        bankMoneyGraghMin: 500000,
      });
    } else if (
      this.bankTotalPriceDivision({ bankTotalPrice, lowerPrice: 1000000, higherPrice: 3000000 })
    ) {
      this.userBankInfoDivision({
        currentTitleNum: 3,
        bankMoneyGraghMax: 3000000,
        bankMoneyGraghMin: 1000000,
      });
    } else if (
      this.bankTotalPriceDivision({ bankTotalPrice, lowerPrice: 3000000, higherPrice: 10000000 })
    ) {
      this.userBankInfoDivision({
        currentTitleNum: 4,
        bankMoneyGraghMax: 10000000,
        bankMoneyGraghMin: 3000000,
      });
    }

    return this.userBankInfo;
  }

  getBankStepData() {
    const parseTotalStepData = JSON.parse(localStorage.getItem('STEP_DATA'));
    return _.go(
      parseTotalStepData.steps_count,
      _.map((data) => data.value),
      _.reduce(_.add)
    );
  }

  getStepData() {
    return _.go(
      this.getTotalStepData.steps_count,
      _.map((data) => data.value)
    );
  }

  getDayData() {
    return _.go(
      this.getTotalStepData.steps_count,
      _.map((data) => data.endTime[0] + data.endTime[1])
    );
  }

  getGoalData() {
    return JSON.parse(localStorage.getItem('STEP_GOAL'));
  }

  getTitleList() {
    return this.titleList;
  }
}

export default BankModel;
