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
    this.calendarTitle.textContent = `${date.getFullYear()}.${date.getMonth()+1}`;
    this.calendarDayElement.innerHTML = calendarData.join(' ');
  }

  bindEvent() {
    console.log("bindEvent")
    on(this.calendarDayElement, "click", (event) => this.handleReserveIconClick(event));
  }

  handleReserveIconClick(event) {
    if (event.target.classList.contains("walkingDay")) {
      const value = event.target.textContent;
      this.emit("@click", value);
      this.bindReserveModalClose();
    }
  }

  bindReserveModalClose() { 
    this.resverseModalCloseButton = qs(".reserveModalClose", this.element);
    on(this.resverseModalCloseButton, "click", () => this.handleReserveModalClose());
  }

  renderReserveTime(clickDate) {
    this.reverseModel = qs(".reserveModal", this.element);
    this.bindReserveTimeDelete(clickDate);
  }

  bindReserveTimeDelete(clickDate) {
    delegate(this.element, "click", "button.reserveDelete", (event) => this.handleReserveTimeDelete(event, clickDate))
  }

  handleReserveTimeDelete(event, clickDate) {
    const value = {
      "deleteDate": clickDate,
      "deleteTime": event.target.previousSibling.previousSibling.textContent,
    };
    this.emit("@delete", value);
    event.target.parentNode.remove();
  }

  handleReserveModalClose() {
    this.reverseModel = qs(".reserveModal", this.element);
    this.reverseModel.remove();
  }

  setReserveList(reserveData, date) {
    this.element.append(this.template.reservedModel(_.filter(reserve => reserve[0] === date, reserveData), date));
    this.renderReserveTime(date)
  }

  getResreveDate(reserveDateList) { // 로직 변경 필수! 너무 많은 순회,  한자리 일때 동작하는지 
    if (reserveDateList) {
      _.go(
        this.calendarDayElement.children,
        L.map(el => el.classList.contains("walkingDay") ? el.classList.remove("walkingDay") : el),
        L.filter(el => el.classList.contains("thisMonth")),
        _.map(el => _.go(
          reserveDateList,
          _.map(v => v[0] === (el.textContent.length === 1 ? el.textContent = `0`+`${el.textContent}`: el.textContent) && el.classList.add("walkingDay")),
        ))
      );
    }
  }

}

class Template {

  reservedModel(timeArr, date) {
    const divFargment = creatEl('div');
    divFargment.innerHTML = `
      <div class="reserveModal">
        <h2 class="reserveModalTitle">걷기 일정</h2>
        <button class="reserveModalClose">X</button>
        <h3 class="reserveModalDate"></h3>
        <div class="modalTimeDiv">${`${date}일`}</div>
        ${this.reserveTime(timeArr)}
      </div>`;

    return divFargment;
  }

  reserveTime(timeArr) {
    let timeListTemplate = "";
    timeArr.forEach((time) => {
      timeListTemplate +=  `
        <div class="reserveTiemWrap">
          <p class="reserveModalTime">${time[1]}시 ${time[2]}분</p>
          <button class="reserveDelete">X</button>
        </div>`;
    });

    return timeListTemplate;
  }

}