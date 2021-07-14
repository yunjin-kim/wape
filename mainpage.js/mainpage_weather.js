const API_KEY = "3f681357220c8b5aada0c70d0d540eaf";

const weatherSucc = (event) => {
  console.log(event);
  const lat = event.coords.latitude;
  const lon = event.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url)
  fetch(url)
  .then(response => response.json())
  .then(data=> {
    const temp = data.main.temp;
    const atmosCondition =  data.weather[0].main;
  })

}

const weatherFail = () => {
  console.log("weather error");
}

navigator.geolocation.getCurrentPosition(weatherSucc, weatherFail);
