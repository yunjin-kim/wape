import {setBankTotalData, setBankMoneyGraph, setTitle } from "./bankpage.js";
import { _add, _go, _reduce, _map } from '../fx.js';

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


function setBankData(totalStepData){
  let currentTitleNum;
  let bankTotalPrice = totalStepData*5;
  let bankTotalMoneyGraphText;

  if(bankTotalPrice >= 0 &&  bankTotalPrice <= 100000){
    bankTotalMoneyGraphText = 100000;
    currentTitleNum = 0;
  }
  else if(bankTotalPrice > 100000 &&  bankTotalPrice <= 300000){
    bankTotalMoneyGraphText = 300000;
    currentTitleNum = 1;
  }
  else if(bankTotalPrice > 300000 &&  bankTotalPrice <= 500000){
    bankTotalMoneyGraphText = 500000;
    currentTitleNum = 2;
  }
  else if(bankTotalPrice > 500000 &&  bankTotalPrice <= 1000000){
    bankTotalMoneyGraphText = 1000000;
    currentTitleNum = 3;
  }
  else if(bankTotalPrice > 1000000 &&  bankTotalPrice <= 3000000){
    bankTotalMoneyGraphText= 3000000;
    currentTitleNum = 4;
  }
  
  setBankMoneyGraph(bankTotalPrice, bankTotalMoneyGraphText);
  setTitle(currentTitleNum)
}