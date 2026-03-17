const btn = document.querySelector(".expand-btn");
const nav = document.querySelector("nav");

if(btn && nav){
  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = carousel.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let index = 0;
    let startX = 0;
    let isDragging = false;

    // criar bolinhas
    images.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
            resetAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // autoplay
    let autoplay = setInterval(nextSlide, 3000);

    function nextSlide() {
        index = (index + 1) % images.length;
        updateCarousel();
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(nextSlide, 3000);
    }

    // swipe mobile
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        let moveX = e.touches[0].clientX;
        let diff = startX - moveX;

        if (diff > 50) {
            nextSlide();
            isDragging = false;
            resetAutoplay();
        }

        if (diff < -50) {
            index = (index - 1 + images.length) % images.length;
            updateCarousel();
            isDragging = false;
            resetAutoplay();
        }
    });

    track.addEventListener('touchend', () => {
        isDragging = false;
    });
});