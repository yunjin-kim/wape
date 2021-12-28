export default class HomeController {
  constructor(homeModel, { homeQuoteView, homeWeatherView, homeCalendarView }) {

    this.homeModel = homeModel;

    this.homeQuoteView = homeQuoteView;
    this.homeWeatherView = homeWeatherView;
    this.homeCalendarView = homeCalendarView;

    this.setData();

    this.renderQuote();

    this.renderCalendar();

    this.subScribeViewEvents();
  }

  setData() {
    this.quoteData = this.homeModel.getRandomQuote();
    this.calendarData = this.homeModel.setCalendar();
    this.reserveDataList = this.homeModel.setReserveDate();
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
  }

  bindReserveModalEvent(event) {
    this.homeCalendarView.setReserveList(this.reserveDataList, event.detail);
    this.homeCalendarView.renderReserveTme(this.reserveDataList, event.detail);
  }

  setDelteReverseTimeList(event) {
    this.homeModel.setDeleteReserveTime(event.detail);
  }

}