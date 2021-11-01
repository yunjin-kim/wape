export let weatherData;
export let tempData;
export let maxTempData;
export let minTempData;
export let lat;
export let lon;
const API_KEY = "3f681357220c8b5aada0c70d0d540eaf";

navigator.geolocation.getCurrentPosition(getGeo);

function getGeo(event){
  lat = event.coords.latitude;
  lon = event.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  if(lat){
    getWeather(url);
  }
}

function getWeather(url){
  fetch(url)
  .then(response => response.json())
  .then(data=> {
    goweather(data)
  })
  .catch(console.log)
}

function goweather(data){
      let weather = data.weather[0].id;
      weatherData = `${weatherEngToKor(weather)}`;
      tempData = `${Math.floor(data.main.temp)}°`;
      maxTempData = `${Math.floor(data.main.temp_max)}°`;
      minTempData = `${Math.floor(data.main.temp_min)}°`;
    }

function weatherEngToKor(weaId) {
  const weaArr = [201,200,202,210,211,212,221,230,231,232,
    300,301,302,310,311,312,313,314,321,500,
    501,502,503,504,511,520,521,522,531,600,
    601,602,611,612,615,616,620,621,622,701,
    711,721,731,741,751,761,762,771,781,800,
    801,802,803,804,900,901,902,903,904,905,
    906,951,952,953,954,955,956,957,958,959,
    960,961,962
  ];
  const weaKorArr = ["약한 비를 동반한 천둥구름","비를 동반한 천둥구름","폭우를 동반한 천둥구름","약한 천둥구름",
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
  for(let i = 0; i < weaArr.length; i++) {
    if(weaArr[i] == weaId) {
      return weaKorArr[i];
    }
  }
    return "error";
  }
  
  

