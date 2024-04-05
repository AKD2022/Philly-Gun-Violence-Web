document.addEventListener("DOMContentLoaded", function() {
    const animationsPlayed = sessionStorage.getItem('animationsPlayed');

    function runAnimations() {
        // Intersection Observer for 'h1' elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-fade');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('h1');
        hiddenElements.forEach((el) => observer.observe(el));

        // Intersection Observer for 'p' elements
        const observer1 = new IntersectionObserver((entries1) => {
            entries1.forEach((entry1) => {
                if (entry1.isIntersecting) {
                    entry1.target.classList.add('p-fade');
                }
            });
        });

        const hiddenElements1 = document.querySelectorAll('p');
        hiddenElements1.forEach((el) => observer1.observe(el));

        // Intersection Observer for '.btn' elements
        const observer2 = new IntersectionObserver((entries2) => {
            entries2.forEach((entry2) => {
                if (entry2.isIntersecting) {
                    entry2.target.classList.add('btn-fade');
                }
            });
        });

        const hiddenElements2 = document.querySelectorAll('.btn');
        hiddenElements2.forEach((el) => observer2.observe(el));
    
        sessionStorage.setItem('animationsPlayed', true);
    }

    if (!animationsPlayed || window.performance && performance.navigation.type === 1) {
        runAnimations();
    }
});

/* Loading */
var preloader = document.getElementById("preloader")

window.addEventListener("load", removePreloader); 

function removePreloader() {
    preloader.classList.add("removePreloader");
    runAnimations();
}
