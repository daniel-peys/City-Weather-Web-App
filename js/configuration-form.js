const form = document.querySelector(".form-group form");
const inputGroups = document.querySelector(".input-groups");
const inputField = document.querySelector(".input-groups input");
const inputToSubmit = document.querySelector('.form-group form > input');


// Count of childs of input groups
let inputGroupChildCount = 1;

/**
 * 
 * @returns Create input group
 */
function createInputGroup() {
    let inputGroup = document.createElement('div');
    inputGroup.setAttribute('class', 'input-group');
    
    let label = document.createElement('label');
    label.innerHTML = "CITY:";
    label.setAttribute('for', 'city');

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Press enter to add city...');
    input.setAttribute('data-triggered', '');
    
    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    console.log(inputGroup);
    return inputGroup;
}



/**
 * 
 * @param {object} input DOM-Element: input
 */
function addInputEvent(input) {
    input.addEventListener("keydown", (e) => {
        if(input.dataset.triggered != "true" && e.key == "Enter"){
            addNewInputToDOM();
            input.dataset.triggered = "true";
        }
    })
}


/**
 * 
 * Adds a new input-group to the DOM
 */
function addNewInputToDOM() {
    inputGroups.appendChild(createInputGroup());
    const inputGroup = document
        .querySelectorAll('.input-group')[inputGroupChildCount];
    inputGroupChildCount++;
    addInputEvent(inputGroup.children[1]);

    setTimeout(() => {
        inputGroup.style.height = "unset";
        inputGroup.style.transform = "scale(1)";
        inputGroup.style.transition = "0.3s linear";
    }, 0)
}


/**
 * 
 * @returns Value for query string
 */
function generateQueryStringValue() {
    const inputs = document.querySelectorAll('.input-groups input');
    let value = "";

    inputs.forEach((input) => {
        value += input.value != "" ? `${input.value},` : "";
    })
    return value;
}

// Add value to input for query string
form.onsubmit = () => {
    inputToSubmit.value = generateQueryStringValue();
}

// Add first input event
addInputEvent(inputField)