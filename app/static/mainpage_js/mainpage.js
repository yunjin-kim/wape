import { setProfile, setUserTitle } from "./mainpage_profile.js";

import HomeModel from "./model/HomeModel.js";
import HomeController from "./controller/HomeController.js";
import HomeQuoteView from "./views/HomeQuoteView.js";
import HomeWeatherView from "./views/HomeWeatherView.js";
import homeCalendarView from "./views/HomeCalendarView.js";
import HomeGoalView from "./views/HomeGoalView.js";
import HomeTodayWalkView from "./views/HomeTodayWalkView.js";
import HomeWalkReserveView from "./views/HomeWalkReserveView.js";

(function hasStepData() {
  setUserTitle();
  setProfile();
})();

document.addEventListener("DOMContentLoaded", homeMain);

function homeMain() {
  const homeModel = new HomeModel();
  
  const views = {
    homeQuoteView: new HomeQuoteView(),
    homeWeatherView: new HomeWeatherView(),
    homeCalendarView: new homeCalendarView(),
    homeGoalView: new HomeGoalView(),
    homeTodayWalkView: new HomeTodayWalkView(),
    homeWalkReserveView: new HomeWalkReserveView(),
  };

  new HomeController(homeModel, views);
}