import { kelvinConverter } from './utils/temperature-utils.js';
import { getParams } from './utils/params.js';
import { getWeatherIcon } from './utils/icon-utils.js';

const weatherCardsBox = document.querySelector('.weather-cards');

let cityNames = getParams().cityNames.split(',').filter((item) => {
    return item != "";
});

/**
 * 
 * @param {string} cityImgSrc source of city img
 * @param {string} name name of city
 * @param {string} weather weather type of city
 * @param {string} weatherImgSource weather image of type
 * @param {string} temperature temperature of city
 * @param {string} windSpeed wind speed of city
 * @param {string} humidity humidity of city
 * @returns html template for weather card
 */
function createWeatherCardTemplate(
  cityImgSrc, 
  name, 
  weather, 
  weatherImgSource,
  temperature, 
  windSpeed,
  humidity
){
  return `
          <img src="${cityImgSrc}" alt="picture of city" />
          <div class="weather-data">
            <h4>${name}</h4>
            <div class="grid-template">
              <div class="col">
                <div class="icon-box weather">
                  <p>${weather}</p>
                  <img
                    src="${weatherImgSource}"
                    alt="weather logo"
                    class="icon"
                  />
                </div>
                <div class="icon-box temperature">
                  <p>
                    <span>${kelvinConverter(temperature)}</span> °C
                  </p>
                </div>
              </div>
              <div class="col">
                <div class="icon-box wind-speed">
                  <p>${windSpeed}</p>
                  <img
                    src="./images/Icons/windSpeed.svg"
                    alt="wind speed logo"
                    class="icon"
                  />
                </div>
                <div class="icon-box humidity">
                  <p>${humidity}</p>
                  <img
                    src="./images/Icons/humidity.svg"
                    alt="wind speed logo"
                    class="icon"
                  />
                </div>
              </div>
            </div>
          </div>
  `
}

cityNames.forEach((city) => {
  fetch((`http://localhost:5000/api/cities/${city}`))
    .then((response) => {
      if(!response.ok){
        let errorMsg = document.createElement('div');
        errorMsg.setAttribute('class', 'error-msg');
        errorMsg.innerHTML += "<button> X </button>";
        errorMsg.innerHTML += `<h3> ${city} is not a valid city name! </h3>`;
        errorMsg.innerHTML += `<p> Please go back to the start and write the name correctly to view the city.`;
        errorMsg.children[0].onclick = () => {
          errorMsg.remove();
        }
        document.querySelector('body').appendChild(errorMsg)
        return;
      }
      response.json().then((weatherData) => {
          let weatherCard = document.createElement('div');
          weatherCard.setAttribute('class', 'weather-card');
          weatherCard.innerHTML += createWeatherCardTemplate(
          weatherData.current.imgSrc,
          weatherData.current.name,
          weatherData.current.weatherType,
          getWeatherIcon(weatherData.current.weatherType),
          weatherData.current.temp,
          weatherData.current.windSpeed,
          weatherData.current.humidity
        )

        weatherCardsBox.appendChild(weatherCard);
        let newWeatherCard = weatherCardsBox
        .children[weatherCardsBox.children.length-1];
        
        newWeatherCard.onclick = () => {
          let cityName = newWeatherCard.children[1].children[0].innerHTML;
          window.location.href = `./city.html?name=${cityName}`;
        }

      }) 
    })
})

