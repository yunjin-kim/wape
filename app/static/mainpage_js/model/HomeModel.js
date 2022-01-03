import HomeTodayWalkView from "../views/HomeTodayWalkView.js";
import HomeWeatherView from "../views/HomeWeatherView.js";


export default class HomeModel {
  constructor() {
    this.homeWeatherView = new HomeWeatherView(); // 비동기는 mvc 패턴으로 어떻게?
    this.homeTodayWalkView = new HomeTodayWalkView();
    this.getCurrentLoaction();
  }

  getRandomQuote() {
    const quotes = [
      "햇볕을 받으며 야외에서 걸으면 행복감을 느끼게 하는 세로토닌이 분비돼 우울감이 줄어듭니다",
      "햇볕을 받으며 야외에서 걸으면 통증을 완화하는 엔도르핀이 분비돼 마음이 안정됩니다",
      "저녁 식사 후 가볍게 걸으면 수면을 돕는 호르몬 ‘멜라토닌’ 분비가 촉진됩니다",
      "걷기 운동을 하면 우리 몸은 섭취한 음식을 복부 지방에 저장하지 않고 에너지원으로 사용합니다",
      "걸을 때는 팔다리 관절을 사용하기 때문에 관절 구조를 잘 유지하게 됩니다",
      "걷기는 심혈관과 심폐기관의 기능 유지를 도울 뿐만 아니라 순환계가 활력을 유지하게 합니다",
      "심장에서 뿜어져 나와 체내를 순환한 혈액이 심장으로 다시 흘러 들어가는 몸의 순환 시스템 기능을 돕는다",
      "걷기 운동은 식욕조절 호르몬인 ‘그렐린’ 분비에 영향을 주어 공복감을 조절해주기도 합니다",
    ];
    let quoteSentence = quotes[Math.floor(Math.random() * quotes.length)];

    return quoteSentence;
  }

  getCurrentLoaction() {
    const locationEvent = (event) => {this.getGeo(event)}; 
    navigator.geolocation.getCurrentPosition(locationEvent); 

  }

  async getGeo(event) {
    console.log(event)
    const API_KEY = "3f681357220c8b5aada0c70d0d540eaf";
    const lat = event.coords.latitude;
    const lon = event.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    this.setWeather(data);
  }

  setWeather(data) {
    let weather = data.weather[0].id;
    let weatherData = `${this.weatherEngToKor(weather)}`;
    let tempData = `${Math.floor(data.main.temp)}°`;
    let maxTempData = `${Math.floor(data.main.temp_max)}°`;
    let minTempData = `${Math.floor(data.main.temp_min)}°`;
    this.homeWeatherView.loadWeather(weatherData, tempData, maxTempData, minTempData)
  }

  weatherEngToKor(weather) {
    const weatherIndex = [201,200,202,210,211,212,221,230,231,232,
      300,301,302,310,311,312,313,314,321,500,
      501,502,503,504,511,520,521,522,531,600,
      601,602,611,612,615,616,620,621,622,701,
      711,721,731,741,751,761,762,771,781,800,
      801,802,803,804,900,901,902,903,904,905,
      906,951,952,953,954,955,956,957,958,959,
      960,961,962
    ];

    const weatherTypes = ["약한 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
      "천둥구름","강한 천둥구름","불규칙적 천둥구름","약한 연무를 동반한 천둥구름","연무를 동반한 천둥구름",
      "강한 안개비를 동반한 천둥구름","가벼운 안개비","안개비","강한 안개비","가벼운 적은비","적은비",
      "강한 적은비","소나기와 안개비","강한 소나기와 안개비","소나기","약한 비","비","강한 비",
      "매우 강한 비","극심한 비","우박","약한 소나기 비","소나기 비","강한 소나기 비","소나기 비",
      "가벼운 눈","눈","강한 눈","진눈깨비","소나기 진눈깨비","약한 비와 눈","비와 눈","약한 소나기 눈",
      "소나기 눈","강한 소나기 눈","박무","연기","연무","모래 먼지","안개","모래","먼지","화산재","돌풍",
      "토네이도","구름 한 점 없는 맑은 하늘","약간의 구름이 낀 하늘","흐린 하늘","구름이 거의 없는 하늘",
      "흐린 하늘","토네이도","태풍","허리케인","한랭","고온","바람부는","우박","바람이 거의 없는",
      "약한 바람","부드러운 바람","중간 세기 바람","신선한 바람","센 바람","돌풍에 가까운 센 바람","돌풍",
      "심각한 돌풍","폭풍","강한 폭풍","허리케인"
    ];
    for (let i = 0; i < weatherIndex.length; i++) {
      if (weatherIndex[i] == weather) {
        return weatherTypes[i];
      }
    }

    return "error";
  }

  setCalendar() {
    const daysArray = [];
    const date = new Date();
    const prevMonth = date.getMonth();
    const thisYear = date.getFullYear();
    const thisDay = date.getDate();
    const thisLast = new Date(thisYear, prevMonth+1, 0);
    const prevLast = new Date(thisYear, prevMonth, 0);
    const today = new Date();
    const todayMonth = today.getMonth()+1;
    for (let i = prevLast.getDate() -  prevLast.getDay();  i <= prevLast.getDate(); i++) {
      daysArray.push(i);
    }  
    for (let i = 1; i <= thisLast.getDate(); i++) {
      daysArray.push(i)
    }
    for (let i = 1; i <= 6 - thisLast.getDay(); i++) {
      daysArray.push(i);
    }
  
    daysArray.forEach((date, i) => {
      if(i >= 0 && i <=  prevLast.getDay() || i >= daysArray.length - (6 - thisLast.getDay())) {
        daysArray[i] = `<div class="NotThisMonth">${date}</div>`
      } else if(i === thisDay +  prevLast.getDay() && prevMonth+1 === todayMonth ) {
        daysArray[i] = `<div class="today thisMonth">${date}</div>`;
      } else{
        daysArray[i] = `<div class="thisMonth">${date}</div>`;
      }
    })
  
    return daysArray;
  }

  setReserveDate() {
    const getReserveDate = JSON.parse(localStorage.getItem("RESERVE_DATE"));

    return getReserveDate;
  }

  setDeleteReserveTime(deleteInfo) {
    const reverseList = JSON.parse(localStorage.getItem("RESERVE_DATE"));
    for (let i = 0; i < reverseList.length; i++) { // filter가 안 되는데 나중에 다시 
      reverseList[i].date === deleteInfo.deleteDate.match(/[^일,시,분, ]/gm).join('') &&
      (reverseList[i].hour + reverseList[i].minute) === deleteInfo.deleteTime.match(/[^일,시,분, ]/gm).join('') &&
      reverseList.splice(i, 1);
    }

    localStorage.setItem("RESERVE_DATE", JSON.stringify(reverseList));
  }

  getGoalStepData() {
    this.goalStep = JSON.parse(localStorage.getItem("STEP_GOAL"));
    
    return this.goalStep;
  }

  getStepData() {
    this.stepData = JSON.parse(localStorage.getItem("STEP_DATA"));
    
    return this.stepData.steps_count[0].value;
  }

  setGoalData(goalData) {
    localStorage.setItem("STEP_GOAL", JSON.stringify(goalData));
  }

  async getTodayStepData() {
    try {
      const googleTodayStepCountUrl = "https://v1.nocodeapi.com/kimyunjun/fit/lHneRLggDPetxSfn/aggregatesDatasets?dataTypeName=steps_count&timePeriod=today&durationTime=hourly";
      const response = await fetch(googleTodayStepCountUrl);
      const data = await response.json();
      this.checkTodayWalkData(data);
    } catch (e) {
      this.homeTodayWalkView.todayStepDataErrorModal();
      console.log(e);
    }
  }

  checkTodayWalkData(data) {
    console.log(data)
    if (!data.error && data.steps_count.length > 0) {
      this.homeTodayWalkView.renderTodayStep(data.steps_count);
    } else if (data.error === 1) {
      this.homeTodayWalkView.todayStepDataErrorModal();
    } else {
      this.homeTodayWalkView.renderTodayNoData();
    }
  }

}