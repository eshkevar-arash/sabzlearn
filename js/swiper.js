var popularSwiper = new Swiper("#popular-swiper", {
    /*dir: "rtl",*/
    loop: true,
    autoplay: {
        delay: 3000, // هر ۳ ثانیه
        disableOnInteraction: false, // حتی اگر کاربر کلیک کند، متوقف نشود
        pauseOnMouseEnter: true // این خط مهم است!
    },
    slidesPerView: 'auto', // برای سایزهای کوچیک
    spaceBetween: 20,
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
});

var presellSwiper = new Swiper("#presell-swiper", {
    slidesPerView: 'auto', // برای سایزهای کوچیک
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
});
/*Start blog swiper*/
var blogSlider = new Swiper("#blog-slider", {
    slidesPerView: 1, // برای سایزهای کوچیک
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000, // هر ۳ ثانیه
        disableOnInteraction: false, // حتی اگر کاربر کلیک کند، متوقف نشود
        pauseOnMouseEnter: true // این خط مهم است!
    },
    breakpoints: {
        576: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 2
        },
        1400: {
            slidesPerView: 3
        },
    }
});
/*Finish blog swiper*/