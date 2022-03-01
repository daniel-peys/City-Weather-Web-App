/**
 * 
 * @param {string} weatherType type of the weather
 * @returns image link
 */
function createWeatherIconLink(weatherType){
    return `./images/Icons/${weatherType}.svg`
}

/**
 * 
 * @param {string} weatherType type of the weather 
 * @returns image link for weather type
 */
function getWeatherIcon(weatherType) {
    switch(weatherType){
      case "Thunderstorm":
        return createWeatherIconLink("storm");
      case "Drizzle":
        return createWeatherIconLink("drizzle");
      case "Rain":
        return createWeatherIconLink("rain");
      case "Snow":
        return createWeatherIconLink("snow");
      case "Atmosphere":
        return createWeatherIconLink("smog");
      case "Clear":
        return createWeatherIconLink("sun");
      case "Clouds":
        return createWeatherIconLink("clouds");
    }
}

export {getWeatherIcon};