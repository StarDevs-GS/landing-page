const slideImage = document.getElementById("slide-image");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const images = [
    "./assets/slide1.png",
    "./assets/slide2.png",
    "./assets/slide3.png"
];

currentSlide = 0;

function showSlide() {
    slideImage.src = images[currentSlide];
}

function previousSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }

    showSlide();
}

function nextSlide() {
    currentSlide++;

    if (currentSlide >= images.length) {
        currentSlide = 0;
    }

    showSlide();
}

function start() {
    leftArrow.addEventListener("click", previousSlide);
    rightArrow.addEventListener("click", nextSlide);
    showSlide();
}

start();