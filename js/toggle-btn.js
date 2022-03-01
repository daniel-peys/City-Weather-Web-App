import { 
    fahrenheitConverter, 
    celciusConverter, 
    setTemperature 
} from './utils/temperature-utils.js';
  
const toggle = document.querySelector('.toggle');
const toggleBtn = document.querySelector('.bg-toggle');
const selector = toggle.id == 'city-btn' 
? '.temp-td' 
: '.temperature p';

let toggled = false;

toggleBtn.addEventListener('click', () => {
    if(!toggled){
        setTemperature(fahrenheitConverter, 'F', selector);
        if(window.innerHeight > 500) {
            toggle.style.left = "22px";
        } else {
            toggle.style.left = "17.5px";
        }
        toggled = true; 
    } else {
      setTemperature(celciusConverter, 'C', selector);
        toggle.style.left = "2.5px"
        toggled = false; 
    }
})


