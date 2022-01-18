import { qs } from "../../helper.js";
import View from "./View.js";

export default class AnayStepView extends View {
  constructor() {
    super(qs(".anaypage__walk"));

    this.stepDayOfWeekWrap = qs(".anaypage__walk__graph__day__ul");

  }

  setDayOfWeek(dayOfWeekData) {
    for (let i = 0; i < dayOfWeekData.length; i++) {
      this.stepDayOfWeekWrap.children[i].textContent = dayOfWeekData[i];
    }
  }
}