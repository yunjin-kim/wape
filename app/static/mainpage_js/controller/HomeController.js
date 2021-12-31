export default class HomeController {
  constructor(homeModel, { homeQuoteView, homeWeatherView, homeCalendarView, homeGoalView }) {

    this.homeModel = homeModel;

    this.homeQuoteView = homeQuoteView;
    this.homeWeatherView = homeWeatherView;
    this.homeCalendarView = homeCalendarView;
    this.homeGoalView = homeGoalView;

    this.setData();

    this.renderQuote();

    this.renderCalendar();

    this.subScribeViewEvents();

    this.setGoalGraph();
  }

  setData() {
    this.quoteData = this.homeModel.getRandomQuote();
    this.calendarData = this.homeModel.setCalendar();
    this.reserveDataList = this.homeModel.setReserveDate();
    this.stepData = this.homeModel.getStepData();
    this.goalStepData = this.homeModel.getGoalStepData();
  }

  renderQuote() {
    this.homeQuoteView.render(this.quoteData);
  }

  renderCalendar() {
    console.log("renderCalendar")
    this.homeCalendarView.render(this.calendarData);
    this.homeCalendarView.getResreveDate(this.reserveDataList)
  }

  subScribeViewEvents() {
    this.homeCalendarView.on("@click", (event) => this.bindReserveModalEvent(event));
    this.homeCalendarView.on("@delete", (event) => this.setDelteReverseTimeList(event));
    this.homeGoalView.on("@submit", (event) => this.changeGoalData(event));
  }

  bindReserveModalEvent(event) {
    this.homeCalendarView.setReserveList(this.reserveDataList, event.detail);
    this.homeCalendarView.renderReserveTme(this.reserveDataList, event.detail);
  }

  setDelteReverseTimeList(event) {
    this.homeModel.setDeleteReserveTime(event.detail);
  }

  changeGoalData(event) {
    this.homeModel.setGoalData(event.detail);
    this.setData(); // 걷기 데ㅣ터만 필요한데 모든 데이터 다 불러와서 어떻게 할지 고민
    this.setGoalGraph();
  }

  setGoalGraph() {
    this.homeGoalView.renderGoalGraph(this.stepData, this.goalStepData);
    this.homeGoalView.renderGoalRate(this.stepData, this.goalStepData);
  }

}