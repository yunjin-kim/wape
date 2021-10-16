import { setStepHistory } from './bankpage_history.js';

const $stepHistory = document.querySelector(".bankpage__reposit");
$stepHistory.innerHTML = setStepHistory().join('');