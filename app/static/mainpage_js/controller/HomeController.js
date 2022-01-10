export default class HomeController {
  constructor(
    homeModel,
    {
      homeQuoteView,
      homeWeatherView,
      homeCalendarView,
      homeGoalView,
      homeTodayWalkView,
      homeWalkReserveView,
    }
  ) {
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

    this.setTimeOptiom();

    this.setWalkDate(); // 네이밍 고민

    this.subScribeViewEvents();
  }

  setData() {
    // 모든 데이터 다 불러와서 어떻게 할지 고민
    this.quoteData = this.homeModel.getRandomQuote();
    this.calendarData = this.homeModel.setCalendar();
    this.reserveDataList = this.homeModel.setReserveDate();
    this.stepData = this.homeModel.getStepData();
    this.goalStepData = this.homeModel.getGoalStepData();

    this.hourOptions = this.homeModel.setTimeHourOption();
    this.minuteOptions = this.homeModel.setTimeMinuteOption();

    this.walkDateList = this.homeModel.setWalkDateList();
  }

  renderQuote() {
    this.homeQuoteView.render(this.quoteData);
  }

  renderCalendar() {
    console.log("renderCalendar");
    this.homeCalendarView.render(this.calendarData);
    this.homeCalendarView.getResreveDate(this.reserveDataList);
  }

  subScribeViewEvents() {
    this.homeCalendarView.on("@click", (event) => this.bindReserveModalEvent(event));
    this.homeCalendarView.on("@delete", (event) => this.setDeleteReverseTimeList(event));
    this.homeGoalView.on("@submit", (event) => this.changeGoalData(event));
    this.homeWalkReserveView.on("@reserve", (event) => this.setReserveDateList(event));
  }

  bindReserveModalEvent(event) {
    this.homeCalendarView.setReserveList(this.reserveDataList, event.detail);
    this.homeCalendarView.renderReserveTime(this.reserveDataList, event.detail);
  }

  setDeleteReverseTimeList(event) {
    this.homeModel.setDeleteReserveTime(event.detail);
    this.setData();
    this.renderCalendar();
  }

  changeGoalData(event) {
    this.homeModel.setGoalData(event.detail);
    this.setData();
    this.setGoalGraph();
  }

  setReserveDateList(event) {
    this.homeModel.addReserveDate(event.detail);
    // 달력 렌더 함수
  }

  setGoalGraph() {
    this.homeGoalView.renderGoalGraph(this.stepData, this.goalStepData);
    this.homeGoalView.renderGoalRate(this.stepData, this.goalStepData);
  }

  setTodayStepData() {
    this.homeModel.getTodayStepData();
  }

  setTodayDate() {
    this.homeTodayWalkView.renderTodayWalkDate();
  }

  setTimeOptiom() {
    this.homeWalkReserveView.rednerTimeOption(
      this.hourOptions,
      this.minuteOptions
    );
  }

  setWalkDate() {
    this.homeWalkReserveView.renderWalkDate(this.walkDateList);
  }
}
