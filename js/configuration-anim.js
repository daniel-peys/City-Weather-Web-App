const welcomeScreen = document.querySelector('.welcome-screen');
const welcomeMessage = document.querySelector('.welcome-screen h1');
const cloudImg = document.querySelector('.welcome-cloud');
const sunImg = document.querySelector('.welcome-sun');
const formGroup = document.querySelector('.form-group');
const html = document.querySelector('html');

/**
 * Starts animation
 */
function startAnimation() {
        html.style.backgroundColor = "var(--bg-col)";
        welcomeMessage.style.height = "0px";
        welcomeMessage.style.fontSize = "0px";
        cloudImg.style.transform = "translateY(-100vh)";
        if(window.innerWidth > 950) {
            sunImg.style.transform = "translate(0, 0)";
            sunImg.style.width = "70%"
            sunImg.style.height = "auto";
            sunImg.style.left = "-30%";
            sunImg.style.top = "0";
        } else {
            sunImg.style.transform = "translate(-50%, 0)";
            sunImg.style.width = "80%"
            sunImg.style.height = "700px";
            sunImg.style.left = "50%";
            sunImg.style.top = `${-490}px`;
        }
}

cloudImg.addEventListener("click", startAnimation)
welcomeMessage.addEventListener("click", startAnimation)

// Check if elements are still visible, and delete if not.
let clearWindow = setInterval(() => {;
    let count = 0;

    if(welcomeMessage.style.height == "0px"){
        welcomeMessage.remove();
        count++;
    }

    if(cloudImg.getBoundingClientRect().bottom < 0){
        cloudImg.remove();
        count++;
    }

    if(count >= 2){
        welcomeScreen.remove();
        cloudImg.remove();
        formGroup.style.display = "flex";

        sunImg.classList.add('animated');
        sunImg.style.transition = "unset";

        setTimeout(() => {
            formGroup.style.transform = "translate(0)";
        }, 0 )
        clearInterval(clearWindow);
    }
}, 300);
