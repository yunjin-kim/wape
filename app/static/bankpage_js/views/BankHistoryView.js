export default class BankHistoryView {
  setWalkData() {
    const $stepHistory = qs(".bankpage__reposit");
    $stepHistory.innerHTML = setStepHistory().join('');
  }
}