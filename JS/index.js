document.addEventListener("DOMContentLoaded", function() {
    const animationsPlayed = sessionStorage.getItem('animationsPlayed');
    const slideshow = document.querySelector(".container");
    slideshow.classList.add("start-slideshow");

    removePreloader();
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
