const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const GOOGLE_API_KEY = "AIzaSyCQJHrCj162GoZnKZq5hhkhav7mWGu7vFs";
const OPEN_WEATHER_API_KEY = "243f5f66bae450760833fa4d3768a993";

app.use(cors());

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});


/**
 * 
 * @param {string} cityName Name of the city
 * @returns URL to get the ReferenceID for the city photo
 */
function createCityPhotoReferenceURL(cityName) {
  return `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&fields=photos%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${GOOGLE_API_KEY}`;
}


/**
 * 
 * @param {string} photoReference Google ReferenceID 
 * @returns URL to get the city photo
 */
function createCityPhotoImageURL(photoReference){
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&maxheight=600&photo_reference=${photoReference.replace('"', '').replace('"', '')}&key=${GOOGLE_API_KEY}`;
}


/** 
 * 
 * @param {string} cityName Name of the city
 * @returns URL to get the coordinates of the city
 */
function createGeoCodingURL(cityName) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${OPEN_WEATHER_API_KEY}`;
}

/**
 * 
 * @param {number} lat latitude
 * @param {number} lon longitude
 * @returns URL to get the weather data
 */
function createWeatherURL(lat, lon){
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${OPEN_WEATHER_API_KEY}`;
}

/**
 * 
 * @param {number} time Unix epoch time in seconds
 * @param {number} offset Offset for time zone in seconds
 * @returns Unix epoch time converted to correct time zone in seconds
 */
function convertTimeZone(time, offset){
  return 1000*(time + offset);
}


/**
 * 
 * @param {JSON} response JSON from Weather API response
 * @returns JSON with daily weather data
 */
function createDailyJSON(response, offset){
  let dailyData = [];

  for(let i = 0; i < response.length; i++){
    dailyData.push({
      day: response[i].dt,
      temp: response[i].temp.day,
      tempFeel: response[i].feels_like.day,
    })
  }
  return dailyData;
}


/**
 * 
 * @param {string} cityName Name of the city
 * @param {string} srcValue Image source for html element
 * @param {json} response JSON with daily weather data
 * @returns JSON for final response
 */
function createFinalJSON(cityName, srcValue, response){
  return cleanResponse = {
    current: {
    name: cityName,
    imgSrc: srcValue,
    weatherType: response.data.current.weather[0].main,
    weatherDescr: response.data.current.weather[0].description,
    temp: response.data.current.temp,
    feelTemp: response.data.current.feels_like,
    tempMin: response.data.current.temp_min,
    tempMax: response.data.current.temp_max,
    humidity: response.data.current.humidity,
    windSpeed: response.data.current.wind_speed,
    sunrise: new Date(convertTimeZone(response.data.current.sunrise, response.data.timezone_offset)).toLocaleTimeString(),
    sunset: new Date(convertTimeZone(response.data.current.sunset, response.data.timezone_offset)).toLocaleTimeString(),
    },
    daily: createDailyJSON(response.data.daily, response.data.timezone_offset),
  }
}


// Get weather data with picture for a city
app.get('/api/cities/:city', (req, res) => {
  
  // Get City Photo Reference
  axios(createCityPhotoReferenceURL(req.params.city))
  .then((response) => {
    const photoReference = JSON.stringify(response.data.candidates[0].photos[0].photo_reference);

    // Get City Photo
    axios(createCityPhotoImageURL(photoReference), 
    { responseType: 'arraybuffer' })
    .then((response) => {
      const base64ImageString = Buffer.from(response.data, 'binary').toString('base64');
      const srcValue = "data:image/png;base64,"+base64ImageString;

      // Get Coordinates from City Name
      axios(createGeoCodingURL(req.params.city))
      .then((response) => {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;

        // Get current weather data
        axios(createWeatherURL
        (lat, lon))
        .then((response) => {
 
          res.status(200).send(JSON.stringify(createFinalJSON
          (req.params.city, srcValue, response)));
        })
        .catch((error) => {
          res.status(404).send('<h1> 404 Error :( </h1>');
          console.log(error);
        })

      })
      .catch((error) => {
        res.status(404).send('<h1> 404 Error :( </h1>');
        console.log(error);
      })
      
    })
    .catch((error) => {
      res.status(404).send('<h1> 404 Error :( </h1>');
      console.log(error);
    }); 

  })
  .catch((error) => {
    res.status(404).send('<h1> 404 Error :( </h1>');
    console.log(error);
  });  
})
