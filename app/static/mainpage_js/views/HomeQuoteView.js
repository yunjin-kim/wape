import { qs } from "../../helper.js";
import View from "./Views.js";

export default class HomeQuoteView extends View {
  constructor() {
    super(qs(".mainpage__quote"));

  }

  render(quoteData) {
    this.quoteElement = qs(".quote", this.element);
    this.quoteElement.textContent = quoteData;
  }
  
}