import { qs, on, creatEl } from "../../helper.js";
import View from "./View.js";

export default class AnaySleepView extends View {
  constructor() {
    super(qs(".anaypage__sleep"));
    this.sleepPageNumber = 0;

    this.template = new Template();

    this.sleepDayOfWeekWrap = qs(".anaypage__sleep__graph__day__ul");
    this.currentSleepWrap = qs(".anaypage__sleep__current");
    this.sleepLeftButton = qs(".anaypage__sleep__graph__left");
    this.sleepRightButton = qs(".anaypage__sleep__graph__right");
    this.sleepAverageWrap = qs(".anaypage__sleep__accure");

    this.bindEvent();
  }

  bindEvent() {
    on(this.currentSleepWrap, "click", () => this.bindSleepModal());
    on(this.sleepLeftButton, "click", () => this.handleSleepLeftButton());
    on(this.sleepRightButton, "click", () => this.handleSleepRightButton());
  }

  setDayOfWeek(dayOfWeekData) {
    for (let i = 0; i < dayOfWeekData.length; i++) {
      this.sleepDayOfWeekWrap.children[i].textContent = dayOfWeekData[i];
    }
  }

  handleSleepLeftButton() {
    this.sleepPageNumber++;
    this.emit("@sleepButtom")
    this.setSleepButton();
  }

  handleSleepRightButton() {
    this.sleepPageNumber--;
    this.emit("@sleepButtom");
    this.setSleepButton();
  }

  setSleepButton() {  // classList.add View 함수에 추가 추상화 추가
    if (this.sleepPageNumber == 3) {
      this.sleepLeftButton.classList.add("hiddenButton");
    } else if (this.sleepPageNumber == 0) {
      this.sleepRightButton.classList.add("hiddenButton");
    } else {
      this.sleepLeftButton.classList.remove("hiddenButton");
      this.sleepRightButton.classList.remove("hiddenButton");
    }
  }

  bindSleepModal() {
    this.element.append(this.template.sleepModal());
    this.sleepModal = qs(".sleepModal");
    this.sleepModalClose = qs(".sleepModalClose");
    this.sleepModalSubmit = qs(".sleepSubmitBtn");
    on(this.sleepModalClose, "click", () => this.handleSleepModalClose());
    on(this.sleepModalSubmit, "click", () => this.handleSleepModalSubmit());
  }

  handleSleepModalClose() {
    this.sleepModal.remove();
  }

  handleSleepModalSubmit() {
    this.sleepModalInput = qs(".sleepInput");
    const value = this.sleepModalInput.value;
    this.emit("@sleepSubmit", value);
    this.sleepModal.remove();
  }

  setSleepChartHeight(sleepElemnetList, sleepDataList) {
    for (const [sleepData, sleepDiv] of _.zip(sleepDataList[this.sleepPageNumber], sleepElemnetList.reverse())) {
      sleepData[2] > 0
        ? ((sleepDiv.children[1].style.height = `${sleepData[2] * 10}px`),
          (sleepDiv.children[0].textContent = `${sleepData[2]}`))
        : ((sleepDiv.children[1].style.height = "0px"),
          (sleepDiv.children[0].textContent = ""));
    }
  }

  setCurrentSleep(sleepDataList) {
    if (sleepDataList[0][0][2] === "") {
      this.currentSleepWrap.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
    } else {
      this.currentSleepWrap.innerHTML = this.template.currentSleepElement(sleepDataList[0][0][2]);
    }
  }

  setSleepDataAverage(sleepDataList) { //
    let weekSleepData = [];
    let totalSleepData = 0;

    sleepDataList[this.sleepPageNumber].forEach((data) => {
      data[2] !== "" && weekSleepData.push(data[2]);
    });

    for (const data of weekSleepData) {
      totalSleepData += Number(data);
    }

    if (totalSleepData) {
      this.sleepAverageWrap.innerHTML = this.template.sleepAverageElement(totalSleepData, weekSleepData.length);
    } else {
      this.sleepAverageWrap.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
    }
  }
}

class Template {
  sleepModal() {
    // weightModalTitle 이름 바꿔주기 나중에
    const divFragment = creatEl("div");
    divFragment.className = "sleepModal";
    divFragment.innerHTML = `
      <h3 class="weightModalTitle">수면 시간</h3>
      <button class="sleepModalClose">X</button>
      <input class="sleepInput" type="number" placeholder="7시간30분 = 7.3" />
      <button class="sleepSubmitBtn">시간 입력</button>
    `;

    return divFragment;
  }

  currentSleepElement(currentSleep) {
    return `
      <div>
        <h4>수면량</h4>
        <p><span class="currnetSleep">${currentSleep}</span>시간</p>
      </div>
      <div>
        <h4>권장</h4>
        <p><span>7</span>시간</p>
      </div>
    `;
  }

  sleepAverageElement(totalSleepData, weekSleepDataLength) {
    return `
      <div class="anaypage__walk__accure__dateAver">
        <h4>일평균</h4>
        <p><span class="sleepDateAverage">${totalSleepData}</span>시간</p>
      </div>
      <div class="anaypage__walk__accure__weekTotal">
        <h4 >주간누적</h4>
        <p><span class="sleepDataWeekTotal">${(totalSleepData / weekSleepDataLength).toFixed(1)}</span>시간</p>
      </div>
    `;
  }
}