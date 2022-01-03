import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeTodayWalkView extends View {
  constructor() {
    super(qs(".mainpage__today"));

    this.template = new Template();
  }

  // 리펙토리
  renderTodayStep(stepData) {
    const $todayWalkWrap = document.querySelector(".mainpage__today__main");
    const $todayStepWrap = document.querySelector(".mainpage__today__main");
  
    $todayWalkWrap.style.width = `${stepData.length*120}px`; 
  
    for(let i = 0; i < stepData.length; i++) {
      const stepDataDott = document.createElement('div');
      const dottStepText = document.createElement('span')
      const dottStartTimeText = document.createElement('span')
      const dottEndTimeText = document.createElement('span')
      stepDataDott.classList.add("stepDataDott");
      dottStepText.classList.add("dottStepText");
      dottStartTimeText.classList.add("dottStartTimeText");
      dottEndTimeText.classList.add("dottEndTimeText");
      dottStepText.innerText = `${stepData[i].value}걸음`;
      dottStartTimeText.innerText = `${stepData[i].startTime.substring(12, 20)}`;
      dottEndTimeText.innerText = `${stepData[i].endTime.substring(12, 20)}`;
  
      stepDataDott.style.top = `${100-(i*6)}px`;
      dottStepText.style.top = `${86-(i*6)}px`;
      dottStartTimeText.style.top = `${110-(i*6)}px`;
      dottEndTimeText.style.top = `${120-(i*6)}px`;
  
      stepDataDott.style.left = `${i*120}px`;
      dottStepText.style.left = `${i*120}px`;
      dottStartTimeText.style.left = `${i*120}px`;
      dottEndTimeText.style.left = `${i*120}px`;
      $todayStepWrap.append(stepDataDott, dottStepText, dottStartTimeText, dottEndTimeText);
    }
  }

  renderTodayNoData() {
    const $todayStepWrap = document.querySelector(".mainpage__today__main");
    const noTodayStepDataText = document.createElement('p');
    noTodayStepDataText.textContent = "오늘 걸은 데이터가 없습니다";
    noTodayStepDataText.classList.add("noTodayStepDataText");
    $todayStepWrap.append(noTodayStepDataText);
  }

  renderTodayWalkDate() {
    const date = new Date();
    const $todayWalkDate = document.querySelector(".mainpage__today__title__date");
    $todayWalkDate.textContent = (`${date.getMonth()+1}월 ${date.getDate()}일`)
  }

  todayStepDataErrorModal() {
    const $todayStepTitle = document.querySelector(".mainpage__today__title");
    const todayStepErrorModalDiv = document.createElement('div');
    const todayStepErrorModalText = document.createElement('p');
    todayStepErrorModalDiv.classList.add("todayStepErrorModal");
    todayStepErrorModalText.classList.add("todayStepErrorModalText");
    todayStepErrorModalText.innerHTML = "걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요";
    todayStepErrorModalDiv.append(todayStepErrorModalText);
    $todayStepTitle.append(todayStepErrorModalDiv);
  }

}

class Template {

}