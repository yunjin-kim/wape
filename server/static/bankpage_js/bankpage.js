import { setStepHistory } from './bankpage_history.js';
import { getBankStepData, titleModal } from './bankpage_total.js';

(function enterBankPage(){
  setWalkData()
  getBankStepData();
})();

//이제까지 걸은 데이터 
function setWalkData(){
  const $stepHistory = document.querySelector(".bankpage__reposit");
  $stepHistory.innerHTML = setStepHistory().join('');
}

//총 걷기 데이터
export function setBankTotalData(totalStepData){
  const $bankTotalStep = document.querySelector(".bankTotalStep");
  const $bankTotalDistance = document.querySelector(".bankTotalDistance");
  const $bankEarth = document.querySelector(".bankEarth");
  const $bankMaraton = document.querySelector(".bankMaraton");
  const $bankSeoulToBusan = document.querySelector(".bankSeoulToBusan");

  let totalDistance = totalStepData*70/100000;

  $bankTotalStep.innerText = totalStepData;
  $bankTotalDistance.innerText = totalDistance.toFixed(3);
  $bankEarth.innerText = (totalDistance/400000).toFixed(5);
  $bankMaraton.innerText = (totalDistance/42).toFixed(1);
  $bankSeoulToBusan.innerText = (totalDistance/325).toFixed(2);
}

//총 자산 그래프
export function setBankMoneyGraph(bankTotalPrice, bankTotalMoneyGraphText){
  const $bankTotalMoney = document.querySelector(".bankTotalMoney");
  const $bankMyMoneyGraphText = document.querySelector(".bankMyMoneyGraphText");
  const $bankTotalMoneyGraphText = document.querySelector(".bankTotalMoneyGraphText");
  const $bankMyMoneyGraph = document.querySelector(".bankpage__asset__graph__my");

  $bankTotalMoneyGraphText.innerText = bankTotalMoneyGraphText;
  $bankMyMoneyGraph.style = `width: ${bankTotalPrice/bankTotalMoneyGraphText*230}px`;

  $bankTotalMoney.innerText = bankTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  $bankMyMoneyGraphText.innerText = bankTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

//칭호
export function setTitle(currentTitleNum, allTitles){
  const $currentTitle = document.querySelector(".currentTitle");
  const $nextTitle = document.querySelector(".nextTitle");

  $currentTitle.innerText = allTitles[currentTitleNum-1];
  $nextTitle.innerText = allTitles[currentTitleNum];
}

//모든 칭호 보기
const $showAllTitle = document.querySelector(".bankpage__asset__all");
$showAllTitle.addEventListener('click', (e)=>{
  titleModal(e)
})