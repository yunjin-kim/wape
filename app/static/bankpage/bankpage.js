// import { setStepHistory, showStepHistory } from './bankpage_history.js';
// import { getBankStepData, titleModal } from './bankpage_total.js';
import BankController from './controller/BankController.js';
import BankTotalModel from './model/BankModel.js';
import BankHistoryView from './views/BankHistoryView.js';
import BankTotalView from './views/BankTotalView.js';

function bankMain() {
  const bankTotalModel = new BankTotalModel();

  const views = {
    bankTotalView: new BankTotalView(),
    bankHistoryView: new BankHistoryView(),
  };

  new BankController(bankTotalModel, views);
}

document.addEventListener('DOMContentLoaded', bankMain);

function stepDataErrorModal() {
  const $bankTitle = document.querySelector('.bankpage__asset');
  const stepErrorModalDiv = document.createElement('div');
  stepErrorModalDiv.classList.add('stepErrorModal');

  const stepErrorModalText = document.createElement('p');
  stepErrorModalText.classList.add('stepErrorModalText');
  stepErrorModalText.innerHTML =
    '걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요';

  stepErrorModalDiv.append(stepErrorModalText);
  $bankTitle.append(stepErrorModalDiv);
} // 데이터 예외처리
