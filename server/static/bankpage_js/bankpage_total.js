import {setBankTotalData, setBankMoneyGraph, setTitle } from "./bankpage.js";
import { _add, _go, _reduce, _map } from '../fx.js';
const allTitles = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "당신은 마라톤 선수", ""];

//은행 걷기 데이터
export function getBankStepData(){
  let getTotalStepData = localStorage.getItem("STEP_DATA");
  let parseTotalStepData = JSON.parse(getTotalStepData);

  let totalStepData = _go(
    parseTotalStepData.steps_count,
    _map(data => data.value),
    _reduce(_add)
  )

  setBankTotalData(totalStepData);
  setBankData(totalStepData)
}

//은행 돈 그래프 
function setBankData(totalStepData){
  let currentTitleNum;
  let bankTotalPrice = totalStepData*5;
  let bankTotalMoneyGraphText;

  if(bankTotalPrice >= 0 &&  bankTotalPrice <= 100000){
    bankTotalMoneyGraphText = 100000;
    currentTitleNum = 0;
  }
  else if(bankTotalPrice > 100000 &&  bankTotalPrice <= 500000){
    bankTotalMoneyGraphText = 500000;
    currentTitleNum = 1;
  }
  else if(bankTotalPrice > 500000 &&  bankTotalPrice <= 1000000){
    bankTotalMoneyGraphText = 1000000;
    currentTitleNum = 2;
  }
  else if(bankTotalPrice > 1000000 &&  bankTotalPrice <= 3000000){
    bankTotalMoneyGraphText = 3000000;
    currentTitleNum = 3;
  }
  else if(bankTotalPrice > 3000000 &&  bankTotalPrice <= 10000000){
    bankTotalMoneyGraphText= 10000000;
    currentTitleNum = 4;
  }
  
  setBankMoneyGraph(bankTotalPrice, bankTotalMoneyGraphText);
  setTitle(currentTitleNum, allTitles)
}

//칭모 모달 생성
export function titleModal(e){
  const titleModaleBox = document.createElement('div');
  titleModaleBox.classList.add("titleModal");

  const titleModalClose = document.createElement('button');
  titleModalClose.textContent = "X";
  titleModalClose.classList.add("titleModalClose");
  titleModalClose.addEventListener('click', ()=>{
    titleModaleBox.remove();
  });
  titleModaleBox.append(titleModalClose);

  for(let title of allTitles){
    let titles = document.createElement('p');
    titles.classList.add("titles")
    titles.textContent = title;
    titleModaleBox.append(titles);
  }

  e.target.parentNode.parentNode.parentNode.parentNode.append(titleModaleBox);
}