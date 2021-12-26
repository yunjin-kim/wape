export default class HomeController {
  constructor(homeModel, { homeQuoteView, homeWeatherView }) {

    this.homeModel = homeModel;

    this.homeQuoteView = homeQuoteView;
    this.homeWeatherView = homeWeatherView;

    this.setData();

    this.renderQuote();
  }

  setData() {
    this.quoteData = this.homeModel.getRandomQuote();
  }

  renderQuote() {
    this.homeQuoteView.render(this.quoteData);

  }

}