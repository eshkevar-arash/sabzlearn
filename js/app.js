const baseUrl = "http://localhost:4000/v1"
let users
const Toast = Swal.mixin({
    showClass: {
        popup: `
                      animate__animated
                      animate__fadeInDown
                      animate__faster
                    `
    },
    hideClass: {
        popup: `
                      animate__animated
                      animate__fadeOutRight
                      animate__faster
                    `
    },
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
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

/*Start Mobile Category Menu*/
const mobileCategoryMenu = document.querySelector('.mobile-category__menu')
const mobileCategoryMenuItems = mobileCategoryMenu.querySelectorAll('.mobile-category__menu-item')

mobileCategoryMenu.addEventListener('click', event => {
    const targetSvg = event.target.closest('.mobile-category__menu-icon')
    if (targetSvg){
        const targetLi = targetSvg.parentElement.parentElement
        mobileCategoryMenuItems.forEach(item => {
            if (item !== targetLi){
                item.classList.remove('mobile-category__menu-item--open')
            }
        })
        targetLi.classList.toggle('mobile-category__menu-item--open')
    }
})
/*Finish Mobile Category Menu*/

/*Start Retry-Button For Reload Site*/
const retryBtn = document.querySelector('.retryBtn')
const errorOverlay = document.querySelector('.errorOverlay')
retryBtn.addEventListener('click', () => {
    errorOverlay.classList.remove('errorOverlay--show')
    window.location.reload()
})
/*Finish Retry-Button For Reload Site*/