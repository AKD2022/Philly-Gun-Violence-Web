var clicked = "clicked";

/* Gets position of page */
window.addEventListener('scroll', function(e) {
    var scrollY = window.scrollY;
    if (scrollY < 750 || scrollY > 1200) {
        closeExpandedView();
    } 
    console.log(scrollY);
});

/* Expanding button function */
function expandCause(causeId, event) {
    event.preventDefault();
    event.stopPropagation();
    if (causeId == 'card1') {
        document.getElementById('expanded-view-1').style.display = 'block';
        /* Fade In */
        document.getElementById('expanded-view-1').style.transition = 'opacity 0.5s';
        document.getElementById('expanded-view-1').style.opacity = 0; 
        document.getElementById('expanded-view-1').offsetHeight;
        document.getElementById('expanded-view-1').style.opacity = 1;
        clicked = "open";
    } else if (causeId == 'card2') {
        document.getElementById('expanded-view-2').style.display = 'block';
        /* Fade In */
        document.getElementById('expanded-view-2').style.transition = 'opacity 0.5s';
        document.getElementById('expanded-view-2').style.opacity = 0; 
        document.getElementById('expanded-view-2').offsetHeight;
        document.getElementById('expanded-view-2').style.opacity = 1;
        clicked = "open";
    } else if (causeId == 'card3') {
        document.getElementById('expanded-view-3').style.display = 'block';
        /* Fade In */
        document.getElementById('expanded-view-3').style.transition = 'opacity 0.5s';
        document.getElementById('expanded-view-3').style.opacity = 0; 
        document.getElementById('expanded-view-3').offsetHeight;
        document.getElementById('expanded-view-3').style.opacity = 1;
        clicked = "open";
    }
    hideCards();
}

function hideCards() {
    if (clicked == "open") {
        const hiddenElements = document.querySelectorAll('.card');
        hiddenElements.forEach((el) => {
            el.classList.add('hide');
        });
    }
}

function showCards() {
    if (clicked == "open") {
        const hiddenElements = document.querySelectorAll('.card');
        hiddenElements.forEach((el) => {
            el.classList.remove('hide');
        });
    }
}

/* Closing expansion from button */
function closeExpandedView() {
    const closeViewElements = document.querySelectorAll('#expanded-view-1, #expanded-view-2, #expanded-view-3');
    closeViewElements.forEach((el) => {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = 0; 
        setTimeout(() => {
            el.style.display = 'none'; 
            el.style.opacity = 1;
        }, 500); 
    });
    showCards();
}

/* Slideshow */
const sliders = [
    { id: '#expanded-view-1', currentSlide: 0 },
    { id: '#expanded-view-2', currentSlide: 0 },
    { id: '#expanded-view-3', currentSlide: 0 }
];

function showSlide(slider) {
    const slides = document.querySelectorAll(`${slider.id} .slide`);
    slides.forEach((slide, index) => {
        if (index === slider.currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        } 
    });
}

function nextSlide(sliderIndex) {
    const slider = sliders[sliderIndex];
    console.log(sliderIndex);
    if (slider.currentSlide < 1) {
        slider.currentSlide++;
        showSlide(slider);
    } 
}

function prevSlide(sliderIndex) {
    const slider = sliders[sliderIndex];
    if (slider.currentSlide > 0) {
        slider.currentSlide--;
        showSlide(slider);
    }
}

sliders.forEach((slider, index) => {
    showSlide(slider);
});
