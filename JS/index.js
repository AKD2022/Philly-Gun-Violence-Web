document.addEventListener("DOMContentLoaded", function () {
    removePreloader();
    const animationsPlayed = sessionStorage.getItem('animationsPlayed');
    const slideshow = document.querySelector(".container");

    function runAnimations() {
        const texts = document.querySelectorAll(".text");
        let delay = 450;

        texts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('show');
                text.style.transitionDelay = `${index * 0.5}s`; // Adjust the delay for each text element
            }, delay);
            delay += 450; // 1000 ms
            sessionStorage.setItem('animationsPlayed', true);
        });
    }
    slideshow.classList.add("start-slideshow");

    if (!animationsPlayed || (window.performance && performance.navigation.type === 1)) {
        runAnimations();
    } else {
        const texts = document.querySelectorAll(".text");
        texts.forEach((text, index) => {
            text.classList.add('show');
        });
    }
});

/* Loading */
var preloader = document.getElementById("preloader");

function removePreloader() {
    preloader.classList.add("removePreloader");
}


/* Splash Screen */
setTimeout(function () {
    document.querySelector('.splash-screen').classList.add('fade-out');
}, 4000);