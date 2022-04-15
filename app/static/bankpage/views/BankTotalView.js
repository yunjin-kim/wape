import { creatEl, qs, addEvent } from '../../helper.js';

class Template {
  titleModalTemplate() {
    return `
      <div class='total-title-modal'>
        <h3 class='total-title-text'>모든 칭호</h3>
        <button class='total-title-modal-close-button'>X</button>
        <p class='each-title'>방구석에 콕</p>
        <p class='each-title'>걷기 비기너</p>
        <p class='each-title'>걷기 주니어</p>
        <p class='each-title'>걷기 프로</p>
        <p class='each-title'>마라톤 선수</p>
      </div>
    `;
  }
}
class BankTotalView {
  constructor() {
    this.tamplate = new Template();
    this.elemet = qs('.wrap');

    this.render();
    this.bindEvent();

    this.titleListModal = qs('.total-title-modal');
    this.hideTitleList();
  }

  render() {
    this.titleElement = qs('.user-walk-asset-total-title', this.element);
    this.titleModalWrap = creatEl('div');
    this.titleModalWrap.insertAdjacentHTML('afterbegin', this.tamplate.titleModalTemplate());
    this.elemet.append(this.titleModalWrap);
  }

  bindEvent() {
    this.titleElementClose = qs('.total-title-modal-close-button', this.element);

    addEvent(this.titleElement, 'click', this.showTitleList);
    addEvent(this.titleElementClose, 'click', this.hideTitleList);
  }

  showTitleList = () => {
    this.titleListModal.classList.remove('hide');
  };

  hideTitleList = () => {
    this.titleListModal.classList.add('hide');
  };

  setBankMoneyGraph(totalStepData, { bankMoneyGraghMax, bankMoneyGraghMin }) {
    const $bankTotalMoney = qs('.user-walk-total-asset-value');
    const $bankMoneyGraghMin = qs('.user-walk-asset-graph-min-range');
    const $bankMoneyGraghMax = qs('.user-walk-asset-graph-max-range');
    const $bankMyMoneyGraph = qs('.user-walk-asset-user-graph');

    $bankMoneyGraghMax.textContent = bankMoneyGraghMax;
    $bankMoneyGraghMin.textContent = bankMoneyGraghMin;
    $bankMyMoneyGraph.style = `width: ${(totalStepData / bankMoneyGraghMax) * 230}px`;
    $bankTotalMoney.textContent = (totalStepData * 5)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  setUserTitle(titleList, { currentTitleNum }) {
    const $userCurrentTitle = qs('.user-walk-asset-current-title');
    const $userNextTitle = qs('.user-walk-assert-next-title-text');

    $userCurrentTitle.textContent = titleList[currentTitleNum - 1];
    $userNextTitle.textContent = titleList[currentTitleNum];
  }

  setBankTotalData(totalStepData) {
    const $bankTotalStep = qs('.user-total-walk-value');
    const $bankTotalDistance = qs('.user-total-walk-distance-value');
    const $bankEarth = qs('.user-walk-info-earth-value');
    const $bankSeoulToBusan = qs('.user-walk-info-seoulBusan-value');
    const $bankMaraton = qs('.user-walk-info-marathon-wrap');

    const totalDistance = (totalStepData * 70) / 100000;

    $bankTotalStep.textContent = totalStepData;
    $bankTotalDistance.textContent = totalDistance.toFixed(3);
    $bankEarth.textContent = (totalDistance / 400000).toFixed(5);
    $bankMaraton.textContent = (totalDistance / 42).toFixed(1);
    $bankSeoulToBusan.textContent = (totalDistance / 325).toFixed(2);
  }
}

export default BankTotalView;
