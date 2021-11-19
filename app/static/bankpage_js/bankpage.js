import { setStepHistory } from './bankpage_history.js';
import { getBankStepData, titleModal } from './bankpage_total.js';
//에러처리
(function hasStepData() {
  const getStepDate = localStorage.getItem("STEP_DATA");
  const parseGetStepDate= JSON.parse(getStepDate);

  if(parseGetStepDate) {
    enterBankPage();
  }
  else{
    stepDataErrorModal();
  }
})()

function stepDataErrorModal() {
  const $bankTitle = document.querySelector(".bankpage__asset");
  const stepErrorModalDiv = document.createElement('div');
  stepErrorModalDiv.classList.add("stepErrorModal")

  const stepErrorModalText = document.createElement('p');
  stepErrorModalText.classList.add("stepErrorModalText");
  stepErrorModalText.innerHTML = "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";

  stepErrorModalDiv.append(stepErrorModalText);
  $bankTitle.append(stepErrorModalDiv);
}

function enterBankPage() {
  setWalkData();
  getBankStepData();
};

//이제까지 걸은 데이터 
function setWalkData() {
  const $stepHistory = document.querySelector(".bankpage__reposit");
  $stepHistory.innerHTML = setStepHistory().join('');
}

//총 걷기 데이터
export function setBankTotalData(totalStepData) {
  const $bankTotalStep = document.querySelector(".bankTotalStep");
  const $bankTotalDistance = document.querySelector(".bankTotalDistance");
  const $bankEarth = document.querySelector(".bankEarth");
  const $bankMaraton = document.querySelector(".bankMaraton");
  const $bankSeoulToBusan = document.querySelector(".bankSeoulToBusan");

  let totalDistance = totalStepData*70/100000;

  $bankTotalStep.textContent = totalStepData;
  $bankTotalDistance.textContent = totalDistance.toFixed(3);
  $bankEarth.textContent = (totalDistance/400000).toFixed(5);
  $bankMaraton.textContent = (totalDistance/42).toFixed(1);
  $bankSeoulToBusan.textContent = (totalDistance/325).toFixed(2);
}

//총 자산 그래프
export function setBankMoneyGraph(bankTotalPrice, bankMoneyGraghMax, bankMoneyGraghMin) {
  const $bankTotalMoney = document.querySelector(".bankTotalMoney");
  const $bankMoneyGraghMin = document.querySelector(".bankMoneyGraghMin");
  const $bankMoneyGraghMax = document.querySelector(".bankMoneyGraghMax");
  const $bankMyMoneyGraph = document.querySelector(".bankpage__asset__graph__my");

  $bankMoneyGraghMax.textContent = bankMoneyGraghMax;
  $bankMoneyGraghMin.textContent = bankMoneyGraghMin;
  $bankMyMoneyGraph.style = `width: ${bankTotalPrice/bankMoneyGraghMax*230}px`;
  $bankTotalMoney.textContent = bankTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function setTitle(currentTitleNum, allTitles) {
  const $currentTitle = document.querySelector(".currentTitle");
  const $nextTitle = document.querySelector(".nextTitle");

  $currentTitle.textContent = allTitles[currentTitleNum-1];
  $nextTitle.textContent = allTitles[currentTitleNum];
}

//모든 칭호 보기
const $showAllTitle = document.querySelector(".bankpage__asset__all");
$showAllTitle.addEventListener('click', (e) => {
  titleModal(e);
})