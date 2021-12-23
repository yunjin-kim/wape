export default class BankModel {
  constructor() {
    this.titles = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "마라톤 선수", ""];
  }

  allTitles() {
    return this.titles;
  }

  setBankData() {
    const bankTotalPrice = this.getBankStepData() * 5;
    const obj = {
      'currentTitleNum': 0,
      'bankMoneyGraghMax': 0,
      'bankMoneyGraghMin': 0,
    };

    if (bankTotalPrice >= 0 &&  bankTotalPrice <= 100000) {
      obj.bankMoneyGraghMax = 100000;
      obj.bankMoneyGraghMin = 0;
      obj.currentTitleNum = 0;
    } else if(bankTotalPrice > 100000 &&  bankTotalPrice <= 500000) {
      obj.bankMoneyGraghMax = 500000;
      obj.bankMoneyGraghMin = 100000;
      obj.currentTitleNum = 1;
    } else if(bankTotalPrice > 500000 &&  bankTotalPrice <= 1000000) {
      obj.bankMoneyGraghMax = 1000000;
      obj.bankMoneyGraghMin = 500000;
      obj.currentTitleNum = 2;
    } else if(bankTotalPrice > 1000000 &&  bankTotalPrice <= 3000000) {
      obj.bankMoneyGraghMax = 3000000;
      obj.bankMoneyGraghMin = 1000000;
      obj.currentTitleNum = 3;
    } else if(bankTotalPrice > 3000000 &&  bankTotalPrice <= 10000000) {
      obj.bankMoneyGraghMax= 10000000;
      obj.bankMoneyGraghMin = 3000000;
      obj.currentTitleNum = 4;
    }

    return obj;
  }

  getBankStepData() {
    const getTotalStepData = localStorage.getItem("STEP_DATA");
    const parseTotalStepData = JSON.parse(getTotalStepData);
    let totalStepData = _.go(
      parseTotalStepData.steps_count,
      _.map(data => data.value),
      _.reduce(_.add)
    );

    return totalStepData;
  }

}