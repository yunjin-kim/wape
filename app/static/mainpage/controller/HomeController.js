export default class HomeController {
  constructor(
    homeModel, {
      homeQuoteView,
      homeWeatherView,
      homeCalendarView,
      homeGoalView,
      homeTodayWalkView,
      homeWalkReserveView,
    }) {
    this.homeModel = homeModel;

    this.homeQuoteView = homeQuoteView;
    this.homeWeatherView = homeWeatherView;
    this.homeCalendarView = homeCalendarView;
    this.homeGoalView = homeGoalView;
    this.homeTodayWalkView = homeTodayWalkView;
    this.homeWalkReserveView = homeWalkReserveView;

    this.setData();

    this.renderQuote();

    this.renderCalendar();

    this.setGoalGraph();

    this.setTodayStepData();

    this.setTodayDate();

    this.setTimeOption();

    this.setReserveWalkDate();

    this.subScribeViewEvents();
  }

  setData() {
    this.setCalendarData();
    this.setGoalData();
    this.setReserveData();
  }

  setReserveData() {
    this.hourOptions = this.homeModel.setTimeHourOption();
    this.minuteOptions = this.homeModel.setTimeMinuteOption();
    this.walkDateList = this.homeModel.setWalkDateList();
  }

  setGoalData() {
    this.stepData = this.homeModel.getStepData();
    this.goalStepData = this.homeModel.getGoalStepData();
  }

  setCalendarData() {
    this.calendarData = this.homeModel.setCalendar();
    this.reserveDateList = this.homeModel.setReserveDate();
  }

  renderQuote() {
    this.quoteData = this.homeModel.getRandomQuote();
    this.homeQuoteView.render(this.quoteData);
  }

  renderCalendar() {
    this.homeCalendarView.render(this.calendarData);
    this.homeCalendarView.getResreveDate(this.reserveDateList);
  }

  subScribeViewEvents() {
    this.homeCalendarView.on("@click", (event) => this.bindReserveModalEvent(event));
    this.homeCalendarView.on("@delete", (event) => this.setDeleteReverseTimeList(event));
    this.homeGoalView.on("@submit", (event) => this.changeGoalData(event));
    this.homeWalkReserveView.on("@reserve", (event) => this.setReserveDateList(event));
  }

  bindReserveModalEvent(event) {
    this.homeCalendarView.setReserveList(this.reserveDateList, event.detail);
  }

  setDeleteReverseTimeList(event) {
    this.homeModel.setDeleteReserveTime(event.detail);
    this.setCalendarData();
    this.renderCalendar();
  }

  changeGoalData(event) {
    this.homeModel.setGoalData(event.detail);
    this.setGoalData();
    this.setGoalGraph();
  }

  setReserveDateList(event) {
    this.homeModel.addReserveDate(event.detail);
    this.setData();
    this.renderCalendar();
    this.homeWalkReserveView.initialReserveElement();
  }

  setGoalGraph() {
    this.homeGoalView.renderGoalGraph(this.stepData, this.goalStepData);
    this.homeGoalView.renderGoalRate(this.stepData, this.goalStepData);
  }

  async setTodayStepData() {
    this.todayStepData = await this.homeModel.getTodayStepData();
    this.homeTodayWalkView.renderTodayStep(this.todayStepData);
  }

  setTodayDate() {
    this.homeTodayWalkView.renderTodayWalkDate();
  }

  setTimeOption() {
    this.homeWalkReserveView.rednerTimeOption(this.hourOptions, this.minuteOptions);
  }

  setReserveWalkDate() {
    this.homeWalkReserveView.renderWalkDate(this.walkDateList);
  }
}
