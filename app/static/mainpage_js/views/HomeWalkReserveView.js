import { L } from "../../fx.js";
import { on, qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeWalkReserveView extends View {
  constructor() {
    super(qs(".mainpage__book"));

    this.hourOptiomElement = qs(".selectHour");
    this.minuteOptionElement = qs(".selectMinute");
    this.reserveDateListElement = qs(".mainpage__book__date");
    this.reserveTimeButton = qs(".reserveBtn");

    this.clickReserveDate();

    this.clickReserveTime();
  }

  rednerTimeOption(hourOptions, minuteOption) {
    this.hourOptiomElement.append(...hourOptions);
    this.minuteOptionElement.append(...minuteOption);
  }

  renderWalkDate(walkDateList) {
    const $bookDays = this.reserveDateListElement.children;

    for (let i = 0; i < 7; i++) {
      $bookDays[i].children[0].textContent = walkDateList.holeDayArr[i];
      $bookDays[i].children[1].textContent = walkDateList.holeDateArr[i];
      $bookDays[i].children[0].classList.add("dateSpan");
      $bookDays[i].children[1].classList.add("dateSpan");
      $bookDays[i].classList.add("coloredBox");
    }
  }

  clickReserveDate() {
    on(this.reserveDateListElement, "click", (event) => this.handleReserveDate(event));
  }

  handleReserveDate(event) {
    const reserveDateElement = event.target.closest("div");
    console.log(reserveDateElement);
    if (!reserveDateElement.classList.contains("mainpage__book__date")) {
      reserveDateElement.classList.contains("backgroundGreen")
      ? reserveDateElement.classList.remove("backgroundGreen")
      : reserveDateElement.classList.add("backgroundGreen");
    }
  }

  clickReserveTime() {
    on(this.reserveTimeButton, "click", () => this.handleReserveTime());
  }

  handleReserveTime() {
    const value = _.go(
      this.reserveDateListElement.children,
      L.filter(reserveDateElement => reserveDateElement.classList.contains("backgroundGreen")),
      _.map(selectDateElement => [`${selectDateElement.children[1].textContent}`, `${this.hourOptiomElement.options[this.hourOptiomElement.selectedIndex].textContent}`, `${this.minuteOptionElement.options[this.minuteOptionElement.selectedIndex].textContent}`]),
    );
    this.emit("@reserve", value);
  }
}
