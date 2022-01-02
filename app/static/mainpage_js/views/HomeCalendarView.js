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

  renderReserveTme(reserveDataList, clickDate) {
    this.reverseModel = qs(".reserveModal", this.element);
    const clickDateReserveTime = reserveDataList.filter(reserveData => reserveData.date === clickDate);
    this.reserveTimeListTemplate = this.template.reserveTime(clickDateReserveTime);
    this.reverseModel.append(...this.reserveTimeListTemplate);
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
    const reserveList = [];
    reserveData.map((reserveDate) => {
      if (reserveDate.date === date) {
        reserveList.push(reserveDate);
      }
    })
    this.element.append(this.template.reservedModel(reserveList));
  }

  getResreveDate(reserveData) {
    if (reserveData) {
      for (let i = 0; i < this.calendarDayElement.children.length; i++) {
        this.calendarDayElement.children[i].classList.remove("walkingDay");
        this.calendarDayElement.children[i].classList.contains("thisMonth") &&
          reserveData.forEach((reDate) => {
            reDate.date === this.calendarDayElement.children[i].textContent &&
            this.calendarDayElement.children[i].classList.add("walkingDay");
          })
      }
    }
  }

}

class Template {

  reservedModel(walkingArr) {
    const divFargment = creatEl('div');
    divFargment.innerHTML = `
      <div class="reserveModal">
        <h2 class="reserveModalTitle">걷기 예약</h2>
        <button class="reserveModalClose">X</button>
        <h3 class="reserveModalDate"></h3>
        <div class="modalTimeDiv">${`${walkingArr[0].date}일`}</div>
      </div>
    `;

    return divFargment;
  }

  reserveTime(reserveTimeList) {
    const reserveTimeListTemplate = reserveTimeList.map((reserveTime) => {
      const divFargment = creatEl('div');
      divFargment.classList.add('reserveTiemWrap');
      divFargment.innerHTML = `
        <p class="reserveModalTime">${reserveTime.hour}시 ${reserveTime.minute}분</p>
        <button class="reserveDelete">X</button>
      `;

      return divFargment;
    });

    return reserveTimeListTemplate;
  }

}