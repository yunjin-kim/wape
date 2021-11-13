import {setBankTotalData, setBankMoneyGraph, setTitle } from "./bankpage.js";
const allTitles = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "당신은 마라톤 선수", ""];

//은행 걷기 데이터
export function getBankStepData(){
  let getTotalStepData = localStorage.getItem("STEP_DATA");
  let parseTotalStepData = JSON.parse(getTotalStepData);

  let totalStepData = _.go(
    parseTotalStepData.steps_count,
    _.map(data => data.value),
    _.reduce(_.add)
  )

  setBankTotalData(totalStepData);
  setBankData(totalStepData)
}

//은행 돈 그래프 
function setBankData(totalStepData){
  let currentTitleNum;
  let bankTotalPrice = totalStepData*5;
  let bankMoneyGraghMax;
  let bankMoneyGraghMin;

  if(bankTotalPrice >= 0 &&  bankTotalPrice <= 100000){
    bankMoneyGraghMax = 100000;
    bankMoneyGraghMin = 0;
    currentTitleNum = 0;
  }
  else if(bankTotalPrice > 100000 &&  bankTotalPrice <= 500000){
    bankMoneyGraghMax = 500000;
    bankMoneyGraghMin = 100000;
    currentTitleNum = 1;
  }
  else if(bankTotalPrice > 500000 &&  bankTotalPrice <= 1000000){
    bankMoneyGraghMax = 1000000;
    bankMoneyGraghMin = 500000;
    currentTitleNum = 2;
  }
  else if(bankTotalPrice > 1000000 &&  bankTotalPrice <= 3000000){
    bankMoneyGraghMax = 3000000;
    bankMoneyGraghMin = 1000000;
    currentTitleNum = 3;
  }
  else if(bankTotalPrice > 3000000 &&  bankTotalPrice <= 10000000){
    bankMoneyGraghMax= 10000000;
    bankMoneyGraghMin = 3000000;
    currentTitleNum = 4;
  }
  
  setBankMoneyGraph(bankTotalPrice, bankMoneyGraghMax, bankMoneyGraghMin);
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