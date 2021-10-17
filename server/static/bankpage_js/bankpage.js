import { _add, _go, _reduce, _map } from '../fx.js';
import { setStepHistory } from './bankpage_history.js';

const $stepHistory = document.querySelector(".bankpage__reposit");
$stepHistory.innerHTML = setStepHistory().join('');

function getBankStepData(){
  let getTotalStepData = localStorage.getItem("STEP_DATA");
  let parseTotalStepData = JSON.parse(getTotalStepData);

  let totlaStepData = _go(
    parseTotalStepData.steps_count,
    _map(data => data.value),
    _reduce(_add)
  )

  setBankTotalData(totlaStepData);
}
getBankStepData()

function setBankTotalData(totlaStepData){
  const $bankTotalStep = document.querySelector(".bankTotalStep");
  const $bankTotalDistance = document.querySelector(".bankTotalDistance");
  const $bankEarth = document.querySelector(".bankEarth");
  const $bankMaraton = document.querySelector(".bankMaraton");
  const $bankSeoulToBusan = document.querySelector(".bankSeoulToBusan");

  let totalDistance = totlaStepData*70/100000;

  $bankTotalStep.innerText = totlaStepData;
  $bankTotalDistance.innerText = totalDistance.toFixed(3);
  $bankEarth.innerText = (totalDistance/400000).toFixed(5);
  $bankMaraton.innerText = (totalDistance/42).toFixed(1);
  $bankSeoulToBusan.innerText = (totalDistance/325).toFixed(2);
}

