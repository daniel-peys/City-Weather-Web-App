import { kelvinConverter } from './utils/temperature-utils.js';
import { getParams } from './utils/params.js';
import { getWeatherIcon } from './utils/icon-utils.js';

const body = document.querySelector('body');
const cityNameHeading = document.querySelectorAll('.text-box h1')[0];
const cityImg = document.querySelector('.img-box img');
const currentTemp = document.querySelector('.temp-td span');
const weekTempsBig = document.querySelectorAll(
    '.temp-td:not(#header):not(.temp-small) span'
);
const weekTempsSmall = document.querySelectorAll('.temp-small span');
const weatherTitle = document.querySelector('.weather p');
const weatherImg = document.querySelector('.weather img');
const windSpeed = document.querySelector('.wind-speed p');
const weatherDescr = document.querySelector('.description');
const humidity = document.querySelector('.humidity p');
const sunrise = document.querySelectorAll('.sun p')[0];
const sunset = document.querySelectorAll('.sun p')[1];
const weekDays = document.querySelectorAll('.temp-day');

const cityName = getParams().name;

/**
 * 
 * @param {list} elementsBig elements of table for big screen
 * @param {list} elementsSmall elements of table for small screen
 * @param {json} data temperature data
 * Sets the temperatures of the week days
 */
function setDailyTemps(elementsBig, elementsSmall, data) {
    for(let i = 0; i < 7; i++){
       elementsBig[i].innerHTML = kelvinConverter(data.daily[i].temp);
       elementsBig[i+7].innerHTML = kelvinConverter(data.daily[i].tempFeel);
       elementsSmall[i].innerHTML = kelvinConverter(data.daily[i].temp);
       elementsSmall[i+7].innerHTML = kelvinConverter(data.daily[i].tempFeel);
    }
}


/**
 * 
 * @param {json} data temperature data 
 * Sets the data of the city 
 */
function setData(data) {
    cityNameHeading.innerHTML = cityName;
    cityImg.src = data.current.imgSrc;
    currentTemp.innerHTML = kelvinConverter(data.current.temp);
    weatherTitle.innerHTML = data.current.weatherType;
    weatherImg.src = getWeatherIcon(data.current.weatherType);
    windSpeed.innerHTML = data.current.windSpeed;
    weatherDescr.innerHTML = data.current.weatherDescr.charAt(0).toUpperCase() 
    + data.current.weatherDescr.slice(1);
    humidity.innerHTML = data.current.humidity;
    setDailyTemps(weekTempsBig, weekTempsSmall, data);
    sunrise.innerHTML = data.current.sunrise;
    sunset.innerHTML = data.current.sunset;
}

/**
 * Displays body after data loaded
 */
function displayBody() {
    body.style.height = "unset";
    body.style.transform = "scale(1)";
}

fetch((`http://localhost:5000/api/cities/${cityName}`))
    .then((response) => {
       response.json().then((response) => {
           setData(response);
           displayBody();
       })
})

weekDays[new Date().getDay()-1].style.background = "turquoise";
weekDays[new Date().getDay()-1].style.color = "black";
weekDays[new Date().getDay()+6].style.background = "turquoise";
weekDays[new Date().getDay()+6].style.color = "black";