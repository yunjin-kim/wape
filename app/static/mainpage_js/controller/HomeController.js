export default class HomeController {
  constructor(homeModel, { homeQuoteView }) {

    this.homeModel = homeModel;

    this.homeQuoteView = homeQuoteView;

    this.setData();
  }

  setData() {
    console.log("setData")
    this.quoteData = this.homeModel.getRandomQuote();
    this.homeQuoteView.render(this.quoteData);
  }

}