import { L } from "../../fx.js";
import { creatEl, delegate, on, qs, qsAll } from "../../helper.js";
import View from "./Views.js";

export default class homeCalendarView extends View {
  constructor() {
    super(qs(".mainpage__calendar"));

    this.calendarDayElement = qs(".mainpage__calendar__day", this.element);
    this.calendarTitle = qs(".thisYearMonth", this.element);

    this.template = new Template();

    this.bindEvent();
  }

  render(calendarData) {
    const date = new Date();
    this.calendarTitle.textContent = `${date.getFullYear()}.${date.getMonth() + 1}`;
    this.calendarDayElement.innerHTML = calendarData.join(" ");
  }

  bindEvent() {
    on(this.calendarDayElement, "click", (event) => this.handleReserveIconClick(event));
  }

  handleReserveIconClick(event) {// 모달 띄워진 상태에서 다른거 클릭하면 이 모달 닫히게
    if (event.target.classList.contains("walkingDay")) {
      this.removePrevModal();
      const value = event.target.textContent;
      this.emit("@click", value);
      this.bindReserveTimeDelete();
      this.bindReserveModalClose();
    }
  }

  removePrevModal() {
    this.reverseModel = qs(".reserveModal", this.element);
    if (this.reverseModel) {
      this.reverseModel.remove();
    }
  }

  bindReserveModalClose() {
    this.resverseModalCloseButton = qs(".reserveModalClose", this.element);
    on(this.resverseModalCloseButton, "click", () => this.handleReserveModalClose());
  }

  bindReserveTimeDelete() {
    const clickDateElement = qs(".reserveModalTitle");
    const clickDate = clickDateElement.textContent.match(/[^일 걷기 일정]/gm).join("");
    this.reserveTimeList = qs(".reserveTimeList");
    this.deleteBtn = qsAll(".reserveDelete");
    this.deleteBtn && delegate(this.reserveTimeList, "click", ".reserveDelete", (event) => this.handleReserveTimeDelete(event, clickDate));
  }

  handleReserveTimeDelete(event, clickDate) {
    console.log(event, clickDate)
    const value = {
      deleteDate: clickDate,
      deleteTime: event.target.previousSibling.previousSibling.textContent,
    };
    this.emit("@delete", value);
    event.target.parentNode.remove();
    this.bindReserveTimeDelete();
  }

  handleReserveModalClose() {
    console.log("handleReserveModalClose")
    this.reverseModel = qs(".reserveModal", this.element);
    this.reverseModel.remove();
  }

  setReserveList(reserveData, date) {
    this.element.append(this.template.reservedModel(_.filter((reserve) => reserve[0] === date, reserveData), date));
  }

  getResreveDate(reserveDateList) {// 로직 변경 필수! 너무 많은 순회,  한자리 일때 동작하는지
    if (reserveDateList) {
      _.go(
        this.calendarDayElement.children,
        L.map((el) => el.classList.contains("walkingDay") ? el.classList.remove("walkingDay"): el),
        L.filter((el) => el.classList.contains("thisMonth")),
        _.map((el) => _.go(
            reserveDateList,
            _.map((v) => v[0] === (el.textContent.length === 1 
              ? (el.textContent = `0` + `${el.textContent}`) 
              : el.textContent) && el.classList.add("walkingDay")
            ))
        )
      );
    }
  }
}

class Template {

  reservedModel(timeArr, date) {
    const divFargment = creatEl('div');
    divFargment.classList.add("reserveModal");
    divFargment.innerHTML = `
      <h2 class="reserveModalTitle">${`${date}일`} 걷기 일정</h2>
      <button class="reserveModalClose">X</button>
      <div class="reserveTimeList">
        ${this.reserveTime(timeArr)}
      </div>`;

    return divFargment;
  }

  reserveTime(timeArr) {
    let timeListTemplate = "";
    timeArr.forEach((time) => {
      timeListTemplate += `
        <div class="reserveTimeWrap">
          <p class="reserveModalTime">${time[1]}시 ${time[2]}분</p>
          <button class="reserveDelete">X</button>
        </div>`;
    });

    return timeListTemplate;
  }

}