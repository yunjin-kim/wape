const API_KEY = "3f681357220c8b5aada0c70d0d540eaf";

navigator.geolocation.getCurrentPosition(getGeo);

function getGeo(event){
  console.log(event);
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  getWeather(url)
}

function getWeather(url){
  console.log(url)
  fetch(url)
  .then(response => response.json())
  .then(data=> {
    goweather(data)
    // const temp = data.main.temp;
    // const tempLow = data.main.temp_min;
    // const tempHigh = data.main.temp_max
    // const atmosCon =  data.weather[0].main;
  })
  .catch(console.log)
}

function goweather(data){
  const $atmosCon = document.querySelector('.mainpage__weather__atmos');
  $atmosCon.textContent = data.weather[0].main;;
}

// let request = requires("request");

// function getWeather(url){
//   return new Promise(resolve => {
//     request(url, )
//   })
// }

// const weatherSucc = (event) => {
//   console.log(event);
//   const lat = event.coords.latitude;
//   const lon = event.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   console.log(url)
//   fetch(url)
//   .then(response => response.json())
//   .then(data=> {
//     const temp = data.main.temp;
//     const tempLow = data.main.temp_min;
//     const tempHigh = data.main.temp_max
//     const atmosCon =  data.weather[0].main;
//   })
//   .then(showWeather)
// }

// const weatherFail = () => {
//   console.log("weather error");
// }


// const showWeather = () => {
//   const $atmosCon = document.querySelector('.mainpage__weather__atmos');
//   $atmosCon.textContent = atmosCon;
// }

// setTimeout(showWeather, 5000);