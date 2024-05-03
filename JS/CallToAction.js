/* Loading */
document.addEventListener("DOMContentLoaded", function () {
    removePreloader();
});
  
var preloader = document.getElementById("preloader")
function removePreloader() {
  preloader.classList.add("removePreloader");
}
  