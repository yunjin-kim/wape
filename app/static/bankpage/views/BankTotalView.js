import { creatEl, qs, on } from "../../helper.js";
import View from "./View.js";

export default class BankTotalView extends View {
  constructor() {
    super(qs('.wrap'));

    this.titleList = ["방구석에 콕", "걷기 비기너", "걷기 주니어", "걷기 프로", "마라톤 선수", ""]; // 리펙터링 필요!

    this.tamplate = new Template();

    this.render();

    this.bindEvent();
  }

  render() {
    this.titleElement = qs(".bankpage__asset__all", this.element);
    this.titleModalWrap = creatEl('div');
    this.titleModalWrap.innerHTML = this.tamplate.titleModalTemplate(this.titleList);
    this.element.append(this.titleModalWrap);
  }

  bindEvent() {
    this.titleElementClose = qs(".titleModalClose", this.element);
    on(this.titleElement, "click", () => this.showTitleList());
    on(this.titleElementClose, "click", () => this.hideTitleList());
  }
  
  showTitleList() {
    this.emit("@showTitleList");
  }

  hideTitleList() {
    this.emit("@hideTitleList");
  }

  setBankMoneyGraph(totalStepData, bankMoneyGraghMax, bankMoneyGraghMin) {
    const $bankTotalMoney = qs(".bankTotalMoney");
    const $bankMoneyGraghMin = qs(".bankMoneyGraghMin");
    const $bankMoneyGraghMax = qs(".bankMoneyGraghMax");
    const $bankMyMoneyGraph = qs(".bankpage__asset__graph__my");
  
    $bankMoneyGraghMax.textContent = bankMoneyGraghMax;
    $bankMoneyGraghMin.textContent = bankMoneyGraghMin;
    $bankMyMoneyGraph.style = `width: ${totalStepData / bankMoneyGraghMax * 230}px`;
    $bankTotalMoney.textContent = (totalStepData * 5).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  setTitle(titleList, currentTitleNum) {
    const $currentTitle = qs(".currentTitle");
    const $nextTitle = qs(".nextTitle");
  
    $currentTitle.textContent = titleList[currentTitleNum - 1];
    $nextTitle.textContent = titleList[currentTitleNum];
  }

  setBankTotalData(totalStepData) {
    const $bankTotalStep = qs(".bankTotalStep");
    const $bankTotalDistance = qs(".bankTotalDistance");
    const $bankEarth = qs(".bankEarth");
    const $bankMaraton = qs(".bankMaraton");
    const $bankSeoulToBusan = qs(".bankSeoulToBusan");
  
    let totalDistance = totalStepData * 70 / 100000;
  
    $bankTotalStep.textContent = totalStepData;
    $bankTotalDistance.textContent = totalDistance.toFixed(3);
    $bankEarth.textContent = (totalDistance/400000).toFixed(5);
    $bankMaraton.textContent = (totalDistance/42).toFixed(1);
    $bankSeoulToBusan.textContent = (totalDistance/325).toFixed(2);
  }

}

class Template {

  titleModalTemplate(titleList) {
    return `
      <div class="titleModal">
        <h2 class="titleModalTitle">모든 칭호</h2>
        <button class="titleModalClose">X</button>
          ${titleList.map(this.eachTitle).join("")}
      </div>
    `;
  }

  eachTitle(title) {
    return  `
      <p class="titles">${title}</p>
    `;
  }


}