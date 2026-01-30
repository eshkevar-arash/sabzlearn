const mobileMenuBtn = document.querySelector('.mobile-menu__btn')
const mobileBar = document.querySelector('.mobile-bar')
const overlay = document.querySelector('.overlay')
mobileMenuBtn.addEventListener('click', () => {
    mobileBar.classList.add('mobile-bar--show')
    overlay.classList.add('overlay--show')
})
overlay.addEventListener('click', () => {
    mobileBar.classList.remove('mobile-bar--show')
    overlay.classList.remove('overlay--show')
})