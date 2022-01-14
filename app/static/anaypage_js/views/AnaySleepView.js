import { qs, on, creatEl } from "../../helper.js";
import View from "./View.js";

export default class AnaySleepView extends View {
  constructor() {
    super(qs(".anaypage__sleep"));
    this.sleepPageNumber = 0;

    this.template = new Template();

    this.currentSleepElement = qs(".anaypage__sleep__current");
    this.sleepLeftButton = qs(".anaypage__sleep__graph__left");
    this.sleepRightButton = qs(".anaypage__sleep__graph__right");

    this.bindEvent();
  }

  bindEvent() {
    on(this.currentSleepElement, "click", (event) => this.bindSleepDataInput(event));
    on(this.sleepLeftButton, "click", () => this.handleSleepLeftButton());
    on(this.sleepRightButton, "click", () => this.handleSleepRightButton());

  }

  handleSleepLeftButton() {
    this.sleepPageNumber++;
    this.emit("@sleepButtom")
    this.setSleepDataAverage();
    this.setSleepButton();
  }

  handleSleepRightButton() {
    this.sleepPageNumber--;
    this.emit("@sleepButtom");
    this.setSleepDataAverage();
    this.setSleepButton();
  }

  setSleepButton() {
    if (this.sleepPageNumber == 3) {
      this.sleepLeftButton.classList.add("hiddenButton");
    } else if (this.sleepPageNumber == 0) {
      this.sleepRightButton.classList.add("hiddenButton");
    } else {
      this.sleepLeftButton.classList.remove("hiddenButton");
      this.sleepRightButton.classList.remove("hiddenButton");
    }
  }

  bindSleepDataInput() {
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
    // if (!sleepWeekNum) sleepWeekNum = 0;
    for (const [sleepData, sleepDiv] of _.zip(
      sleepDataList[this.sleepPageNumber],
      sleepElemnetList.reverse()
    )) {
      sleepData[2] > 0
        ? ((sleepDiv.children[1].style.height = `${sleepData[2] * 10}px`),
          (sleepDiv.children[0].textContent = `${sleepData[2]}`))
        : ((sleepDiv.children[1].style.height = "0px"),
          (sleepDiv.children[0].textContent = ""));
    }
  }

  setCurrentSleep() {
    const $noSleepDiv = document.querySelector(".anaypage__nosleep__current");
    const $currnetSleep = document.querySelector(".currnetSleep");
    const $sleepDiv = document.querySelector(".anaypage__sleep__current");
    const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
    const parseTotalSleepData = JSON.parse(getTotalSleepData);

    if (parseTotalSleepData) {
      if (parseTotalSleepData[0][0][2] === "") {
        $noSleepDiv.classList.remove("hiddenDiv");
        $sleepDiv.classList.add("hiddenDiv");
        $noSleepDiv.innerHTML = `<span class="noWeight">수면 시간을 적어주세요</span>`;
      } else {
        $sleepDiv.classList.remove("hiddenDiv");
        $currnetSleep.textContent = `${parseTotalSleepData[0][0][2]}`;
      }
    } else {
      $noSleepDiv.classList.remove("hiddenDiv");
      $sleepDiv.classList.add("hiddenDiv");
      $noSleepDiv.innerHTML = `<span class="noWeight">수면시간을 적어주세요</span>`;
    }
  }

  setSleepDataAverage() {
    const $sleepDateAverage = document.querySelector(".sleepDateAverage");
    const $sleepDataWeekTotal = document.querySelector(".sleepDataWeekTotal");
    const getTotalSleepData = localStorage.getItem("CURRENT_SLEEP");
    const parseTotalSleepData = JSON.parse(getTotalSleepData);
    let weekSleepData = [];
    let totalSleepData = 0;

    // if (!sleepWeekNum) sleepWeekNum = 0;
      parseTotalSleepData[this.sleepPageNumber].map((data) => {
        data[2] === "" ? "" : weekSleepData.push(data[2]);
      });

    for (let data of weekSleepData) {
      totalSleepData += Number(data);
    }
    let averageSleepData = totalSleepData / weekSleepData.length;
    if (totalSleepData) {
      $sleepDataWeekTotal.textContent = totalSleepData;
      $sleepDateAverage.textContent = averageSleepData.toFixed(1);
    } else {
      $sleepDataWeekTotal.textContent = "0";
      $sleepDateAverage.textContent = "0";
    }
  }
}

class Template {

  sleepModal() { // weightModalTitle 이름 바꿔주기 나중에
    const divFragment = creatEl('div');
    divFragment.className = "sleepModal";
    divFragment.innerHTML = `
      <h3 class="weightModalTitle">수면 시간</h3>
      <button class="sleepModalClose">X</button>
      <input class="sleepInput" type="number" placeholder="7시간30분 = 7.3" />
      <button class="sleepSubmitBtn">시간 입력</button>
    `;

    return divFragment;
  }

}