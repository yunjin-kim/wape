import { qs, on, creatEl } from "../../helper.js";
import View from "./View.js";

export default class AnayWeightView extends View {
  constructor() {
    super(qs(".anaypage__weight"));
    this.weightPageNumber = 0;

    this.template = new Template();

    this.currentWeightWrap = qs(".anaypage__weight__current");
    this.currentGoalWeightWrap = qs(".anaypage__weight__accure");
    this.weightLeftButton = qs(".anaypage__weight__graph__left");
    this.weightRightButton = qs(".anaypage__weight__graph__right");

    this.bindEvent();
  }

  bindEvent() {
    on(this.currentWeightWrap, "click", () => this.bindWeightModal());
    on(this.currentGoalWeightWrap, "click", () => this.bindWeightGoalodal());
    on(this.weightLeftButton, "click", () => this.handleWeightLeftButton());
    on(this.weightRightButton, "click", () => this.handleWeightRightButton());
  }

  handleWeightLeftButton() {
    this.weightPageNumber++;
    this.emit("@weightButtom");
    this.setWeightButton();
  }

  handleWeightRightButton() {
    this.weightPageNumber--;
    this.emit("@weightButtom");
    this.setWeightButton();
  }

  setWeightButton() {
    // classList.add View 함수에 추가 추상화 추가
    if (this.weightPageNumber == 3) {
      this.weightLeftButton.classList.add("hiddenButton");
    } else if (this.weightPageNumber == 0) {
      this.weightRightButton.classList.add("hiddenButton");
    } else {
      this.weightLeftButton.classList.remove("hiddenButton");
      this.weightRightButton.classList.remove("hiddenButton");
    }
  }

  bindWeightGoalodal() {
    this.element.append(this.template.goalWeightModal());
    this.weightGoalModal = qs(".goalWeightModal");
    this.weightGoalModalClose = qs(".goalWeightModalClose");
    this.weightGoalModalSubmit = qs(".goalWeightSubmitBtn");
    on(this.weightGoalModalClose, "click", () => this.handleWeightGoalModalClose());
    on(this.weightGoalModalSubmit, "click", () => this.handleWeightGoalModalSubmit());
  }

  handleWeightGoalModalClose() {
    this.weightGoalModal.remove();
  }

  handleWeightGoalModalSubmit() {
    this.weightGoalModalInput = qs(".goalWeightInput");
    const value = this.weightGoalModalInput.value;
    this.emit("@weightGoalSubmit", value);
    this.weightGoalModal.remove();
  }

  bindWeightModal() {
    this.element.append(this.template.weightModal());
    this.weightModal = qs(".weightModal");
    this.weightModalClose = qs(".weightModalClose");
    this.weightModalSubmit = qs(".weightSubmitBtn");
    on(this.weightModalClose, "click", () => this.handleWeightModalClose());
    on(this.weightModalSubmit, "click", () => this.handleWeightModalSubmit());
  }

  handleWeightModalClose() {
    this.weightModal.remove();
  }

  handleWeightModalSubmit() {
    this.weightModalInput = qs(".weightInput");
    const value = this.weightModalInput.value;
    this.emit("@weightSubmit", value);
    this.weightModal.remove();
  }

  setWeightChartHeight(weightElemnetList, weightDataList) {
    for (const [weightData, wiehgtDiv] of _.zip(weightDataList[this.weightPageNumber], weightElemnetList.reverse())) {
      weightData[2] > 0
        ? ((wiehgtDiv.children[1].style.height = `${weightData[2] * 0.8}px`),
          (wiehgtDiv.children[0].textContent = `${weightData[2]}`))
        : ((wiehgtDiv.children[1].style.height = "0px"),
          (wiehgtDiv.children[0].textContent = ""));
    }
  }

  setCurrentWeight(weightDataList) {
    if (weightDataList[0][0][2] === "") {
      this.currentWeightWrap.innerHTML = `<span class="noWeight">현재 체중을 적어주세요</span>`;
    } else {
      this.currentWeightWrap.innerHTML = this.template.currentWeightElement(
        weightDataList[0][0][2]
      );
    }
  }

  setCurrentBmi(weightDataList) {
    // bmi는 키가 필요해서 나중에
    // const getHeihgtFromLocal = localStorage.getItem("USER_HEIGHT");
    // const parseHeight = JSON.parse(getHeihgtFromLocal);
    // $userBmi.textContent = parseInt(
    //   parseWeightFromLocal[0][0][2] / (parseHeight / 100) ** 2
    // );
  }

  setWeightGoal(weightGoal, weightDataList) {
    if (!weightGoal) {
      this.currentGoalWeightWrap.innerHTML = `<span class="noWeight">목표 체중을 적어주세요</span>`;
    } else {
      this.currentGoalWeightWrap.innerHTML = this.template.goalWeightElement(
        weightGoal,
        weightDataList[0][0][2]
      );
    }
  }
}

class Template {
  weightModal() {
    // 목표 모달이랑 함치는거 고민
    // weightModalTitle 이름 바꿔주기 나중에
    const divFragment = creatEl("div");
    divFragment.className = "weightModal";
    divFragment.innerHTML = `
      <h3 class="weightModalTitle">현재 체중</h3>
      <button class="weightModalClose">X</button>
      <input class="weightInput" type="number"/>
      <button class="weightSubmitBtn">체중 입력</button>
    `;

    return divFragment;
  }

  goalWeightModal() {
    const divFragment = creatEl("div");
    divFragment.className = "goalWeightModal";
    divFragment.innerHTML = `
      <h3 class="goalWeightModalTitle">목표 체중</h3>
      <button class="goalWeightModalClose">X</button>
      <input class="goalWeightInput" type="number"/>
      <button class="goalWeightSubmitBtn">목표 설정</button>
    `;

    return divFragment;
  }

  currentWeightElement(currentWeight) {
    return `
      <div>
        <h4>현재 체중</h4>
        <p><span class="currnetSleep">${currentWeight}</span>kg</p>
      </div>
      <div>
      <div>
        <p>BMI<span class="userBmi">00.0</span></p>
      </div>
    `;
  }

  goalWeightElement(weightGoal, currentWeight) {
    return `
      <div class="anaypage__weight__accure__value">
          <h4>목표체중</h4>
          <p><span class="goalWeight">${weightGoal}</span>kg</p>
      </div>
      <div class="anaypage__weight__accure__percent">
        ${currentWeight 
          ? `<h5>목표 체중까지</h5>
            <div>
                <h6><span class="untilGoalWeight">${currentWeight - weightGoal}</span>kg</h6>
            </div>`
          : `<p>현재 체중을 입력해주세요</p>`
        }
      </div>
    `;
  }
}