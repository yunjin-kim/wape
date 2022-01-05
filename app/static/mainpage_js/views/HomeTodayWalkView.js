import { creatEl, qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeTodayWalkView extends View {
  constructor() {
    super(qs(".mainpage__today"));

    this.template = new Template();

    this.todayStepElement = qs(".mainpage__today__main");
    this.todayWalkDateElement = qs(".mainpage__today__title__date");
    this.todayStepTitle = qs(".mainpage__today__title");
  }

  renderTodayStep(stepData) {
    this.todayStepElement.style.width = `${stepData.length*120}px`; 
  
    stepData.map((step, index) => {
      let eachStepDott = this.template.hourStepDott(step, index);
      this.todayStepElement.append(eachStepDott);
    });
  }

  renderTodayNoData() {
    this.todayStepElement.innerHTML(this.template.todayNoData());
  }

  renderTodayWalkDate() {
    const date = new Date();
    this.todayWalkDateElement.textContent = (`${date.getMonth()+1}월 ${date.getDate()}일`)
  }

  renderStepErrorModal() {
    this.todayStepTitle.append(this.template.todayStepErrorModal());
  }

}

class Template {

  hourStepDott(stepData, index) {
    const divFragment = creatEl('div');
    divFragment.innerHTML = `
        <div class="stepDataDott" style="top:${100-(index*6)}px; left:${index*120}px"></div>
        <span class="dottStepText" style="top:${86-(index*6)}px; left:${index*120}px">${stepData.value}걸음</span>
        <span class="dottStartTimeText" style="top:${110-(index*6)}px; left: ${index*120}px">${stepData.startTime.substring(12, 20)}</span>
        <span class="dottEndTimeText" style="top:${120-(index*6)}px; left:${index*120}px">${stepData.endTime.substring(12, 20)}</span>
    `;

    return divFragment;
  }

  todayNoData() {
    return `
      <p class="noTodayStepDataText">오늘 걸은 데이터가 없습니다</p>
    `;
  }

  todayStepErrorModal() {
    const divFragment = creatEl("div");
    divFragment.className = "todayStepErrorModal";
    divFragment.innerHTML = `
      <p class="todayStepErrorModalText">
        걸음 데이터를 불러오는데<br/> 실패하였습니다<br/> 재로딩 해주세요
      </p>
    `;

    return divFragment;
  }

}
