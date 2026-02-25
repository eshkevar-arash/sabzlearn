const baseUrl = "http://localhost:4000/v1"
const CookieManager = {
    // ساختن یا آپدیت کوکی
    set: function(name, value, days) {
        let expires = ""
        if (days) {
            const date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = "expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + value + "; path=/; " + expires
    },

    // خوندن کوکی
    get: function(name) {
        const nameEQ = name + "="
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim()
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length)
        }
        return null
    },

    // حذف کوکی
    delete: function(name) {
        document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
let users
let user
/*let token*/
let desktopTopBarMenu
let allCourses;
let popularCourses
const loginOrRegister = document.querySelector('#login-or-register')
const userProfix = document.querySelector('#user-profix')

const mobileBar = document.querySelector('.mobile-bar')
const mobileBarTopLogin = mobileBar.querySelector('.mobile-bar__top-login')
const mobileBarTop = mobileBar.querySelector('.mobile-bar__top')
const mobileLogoutBtn = mobileBar.querySelector('#mobile-logout-btn')
const mobileBarShortCuts = mobileBar.querySelector('.mobile-bar__shortCuts')
const rememberInputs = document.querySelector('#login-form__remember-input')
const mobileMenuBtn = document.querySelector('.mobile-menu__btn')

const overlay = document.querySelector('.overlay')
if (mobileMenuBtn){
    mobileMenuBtn.addEventListener('click', () => {
        mobileBar.classList.add('mobile-bar--show')
        overlay.classList.add('overlay--show')
    })
}
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
const errorOverlay = document.querySelector('.errorOverlay')
const retryBtn = errorOverlay.querySelector('.retryBtn')
retryBtn.addEventListener('click', () => {
    errorOverlay.classList.remove('errorOverlay--show')
    window.location.reload()
})
/*Finish Retry-Button For Reload Site*/
function logout(){
    CookieManager.delete('token')
    window.location.href = 'index.html'
}
if (mobileLogoutBtn){
    mobileLogoutBtn.addEventListener('click', () => {
        logout()
    })
}

/*start Tooltip*/
const tooltipContent = `
  <div class="custom-tooltip">
    <a href="#">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.5 3a.5.5 0 0 1 .5.5v3.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L10 7.293V3.5a.5.5 0 0 1 .5-.5z"/>
      </svg>
      لینک اول
    </a>
    <a href="#">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
      لینک دوم
    </a>
    <a href="#">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 15A7 7 0 1 1 15 8a7.008 7.008 0 0 1-7 7z"/>
        <path d="M7 4h2v5H7zm0 6h2v2H7z"/>
      </svg>
      لینک سوم
    </a>
    <button class="logout-btn" id="tooltip-logout-btn" >
         <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"></path>
        </svg>
        خروج از حساب کاربری                           
    </button>
    
  </div>
`;

tippy('#user-profix', {
    content: tooltipContent,
    allowHTML: true,
    trigger: 'click',
    theme: 'light',
    interactive: true,
    animation: 'shift-away-subtle',
    zIndex: 1000, // بالاتر از .overlay
    onShow(instance) {
        document.querySelector('.tooltip-overlay').classList.add('active');
        const logoutBtn = instance.popper.querySelector('#tooltip-logout-btn')

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                logout()
            })
        }
    },
    onHide(instance) {
        document.querySelector('.tooltip-overlay').classList.remove('active');
    },

});
/*start Tooltip*/