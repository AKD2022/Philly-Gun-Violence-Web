/* Loading */
var preloader = document.getElementById("preloader")

window.addEventListener("load", removePreloader); 

function removePreloader() {
    preloader.classList.add("removePreloader");
    runAnimations();
}