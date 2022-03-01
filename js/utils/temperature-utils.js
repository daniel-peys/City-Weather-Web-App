/**
 * 
 * @param {number} temp temperature in kelvin
 * @returns temperature in celcius
 */
function kelvinConverter(temp) {
    return roundTwoDecimals(Number(temp) - 273.15)
}
  
/**
 * 
 * @param {number} temp temperature in celcius
 * @returns temperature in fahrenheit
 */
function fahrenheitConverter(temp) {
    return roundTwoDecimals((Number(temp) * 9/5) + 32);
}
  
/**
 * 
 * @param {number} temp temperature in fahrenheit
 * @returns temperature in celcius
 */
function celciusConverter(temp) {
    return roundTwoDecimals((Number(temp) - 32) * 5/9);
}
 
/**
 * 
 * @param {number} number 
 * @returns rounded number to two decimals
 */
function roundTwoDecimals(number) {
    return Math.round(number * 100) / 100;
}

/**
 * 
 * @param {function} convertFunction convert function
 * @param {string} symbol symbol of temperature unit 
 * @param {string} selector CSS selector 
 */
function setTemperature(convertFunction, symbol, selector){
    const elements = document.querySelectorAll(selector);
    elements.forEach((temp) => {
      temp.innerHTML = `
        <span>
          ${convertFunction(temp.getElementsByTagName('span')[0].innerHTML)}
        </span> ${symbol}°
      `;
    }) 
}

export {kelvinConverter, fahrenheitConverter, celciusConverter, setTemperature};