import {
    getRandomItems,createDesktopTopBarItem,createCourseBox,createCourseBoxPopular
} from "./shared.js";



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
function hideLoadingOverlay(){
    const loadingOverlay = document.querySelector('#loading-overlay')
    loadingOverlay.classList.add('hidden')
}
function showErrorOverlay(msg){
    errorOverlay.querySelector('h2').textContent = msg
    errorOverlay.classList.add('errorOverlay--show')
}
function hideErrorOverlay(){
    errorOverlay.classList.remove('errorOverlay--show')
}
function showErrorMessage(message) {
    return Swal.fire({
        icon: 'error',
        title: message,
        confirmButtonText: 'متوجه شدم',
        buttonsStyling: false,
        customClass: {
            popup: 'my-swal-popup',
            title: 'my-swal-title',
            confirmButton: 'my-swal-confirm'
        }
    })
}

function toastMessage(msg,redirectPath=null) {
    Toast.fire({
        title: msg,
        icon: 'success',
        customClass: {
            popup: 'my-toast',
            icon: 'my-toast-icon',
            container: 'my-toast-container'
        },
        didClose: () => {
            if (redirectPath){
                window.location.href = `${redirectPath}.html`
            }
        }
    });
}
function resetRememberInput(checkboxInput){
    checkboxInput.checked = false
}
function clearInputs(...inputs){
    inputs.forEach(input => {
        input.value = ''
    })
}
function isValidPhoneNumber(input) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(input);
}
function isValidUsername(username) {
    const regex = /^[A-Za-z][A-Za-z0-9._-]{2,}$/;
    return regex.test(username);
}
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
function isValidPassword(password) {
    // Regex بررسی استاندارد بودن پسورد
    // حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;
    return passwordRegex.test(password);
}
function isValidFullName(name) {
    // حداقل 2 حرف، فقط حروف فارسی و انگلیسی، فاصله و خط تیره مجاز
    const nameRegex = /^[A-Za-z\u0600-\u06FF]{2,}([ -][A-Za-z\u0600-\u06FF]+)*$/;
    return nameRegex.test(name.trim());
}
function errorOverlayShow(elem){
    elem.classList.add('errorOverlay--show')
}
async function registerNewUser(user) {
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json().catch(() => null)

        if (!res.ok) {
            switch (res.status) {
                case 400:
                    throw new Error('اطلاعات ارسال‌شده معتبر نیست.')
                case 401:
                    throw new Error('شما مجوز انجام این عملیات را ندارید.')
                case 403:
                    throw new Error('دسترسی به این بخش امکان‌پذیر نیست.')
                case 404:
                    throw new Error('سرویس ثبت‌نام یافت نشد.')
                case 409:
                    throw new Error('ایمیل یا نام کاربری قبلاً ثبت شده است.')
                case 422:
                    throw new Error(data?.message || 'اطلاعات وارد شده صحیح نیست.')
                case 500:
                    throw new Error('خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.')
                default:
                    throw new Error(data?.message || 'خطایی غیرمنتظره رخ داد.')
            }
        }

        return data

    } catch (error) {
        if (error.name === 'TypeError') {
            throw new Error('ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.')
        }

        throw error
    }
}
async function getMe(token){
    if (!token){
        return false
    }

    try {
        const res = await fetch(`${baseUrl}/auth/me`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })

        if (!res.ok){
            throw new Error('خطای سرور')
        }

        const data = await res.json()
        return data

    } catch (err){
        // اینجا network error هم گرفته میشه
        throw new Error('ارتباط با سرور برقرار نشد.')
    }
}
async function login(user){
    const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (res.status === 401){
        throw  new Error('کاربر مورد با این ایمیل یا نام کاربری یافت نشد')
    }
    if (!res.ok) {
        throw new Error("دسترسی به سرور با مشکل مواجه شد")
    }
    const data = await res.json()
    return data
}

function showNameInNavbar(user){
    console.log(user)

    if (user){
        loginOrRegister.style.display = 'none'
        userProfix.style.display = 'flex'
        userProfix.querySelector('.main-header__profile-text').textContent = user.name

        /*mainHeaderProfileBox.addEventListener('click', event => {
            event.preventDefault()
        })*/
        mobileLogoutBtn.style.display = 'flex'

        mobileBarTop.style.display = 'flex'
        mobileBarTop.querySelector('.mobile-bar__info-username').textContent = user.name
        mobileBarTop.querySelector('.mobile-bar__info-date').textContent = user.phone
        mobileBarTopLogin.style.display = 'none'
        mobileBarShortCuts.style.display = 'block'
    }
}
async function getDesktopTopBarMenu(){
    const res = await fetch(`${baseUrl}/menus/topbar`,{
        method: "GET"
    })
    if (!res.ok){
        throw new Error('دسترسی به سرور با مشکل مواجه شد')
    }
    const data = await res.json()
    return data
}

function renderDesktopTopBarMenu(arr){
    const desktopTopBar = document.querySelector('.top-bar')
    const topBarMenu = desktopTopBar.querySelector('.top-bar__menu')
    topBarMenu.innerHTML = ''
    const fragmentElem = document.createDocumentFragment()
    const selectArr = getRandomItems(arr)
    selectArr.forEach(row => {
        fragmentElem.appendChild(createDesktopTopBarItem(row))
    })
    topBarMenu.appendChild(fragmentElem)
}
async function getAllCourses(){
    const res = await fetch(`${baseUrl}/courses`, {
        method: "GET"
    })
    if (!res.ok){
        throw new Error('دسترسی به سرور با مشکل مواجه شد')
    }
    const data = await res.json()
    return data
}

function renderNewestCourses(allCourses){
    const fragmentElem = document.createDocumentFragment()
    const newestCoursesWrapper = document.querySelector('#newest-courses')
    newestCoursesWrapper.innerHTML = ''
    const lastCourses = allCourses.reverse().slice(0,6)
    lastCourses.forEach(course => {
        fragmentElem.appendChild(createCourseBox(course))
    })
    newestCoursesWrapper.appendChild(fragmentElem)
}
async function getPopularCourses(){
    const res = await fetch(`${baseUrl}/courses/popular`,{
        method: "GET"
    })
    if (!res.ok){
        throw new Error('دسترسی به سرور با مشکل مواجه شد')
    }
    const data = await res.json()
    return data
}

function renderPopularCourse(popularCourses){
    console.log(popularCourses)
    const fragmentElem = document.createDocumentFragment()
    const popularWrapper = document.querySelector('#popular-swiper-wrapper')
    popularWrapper.innerHTML = ''
    popularCourses.forEach(course => {
        console.log(course)
        fragmentElem.appendChild(createCourseBoxPopular(course))
    })
    popularWrapper.appendChild(fragmentElem)
}
export {
    Toast,
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow,registerNewUser,
    hideLoadingOverlay,showErrorOverlay,hideErrorOverlay,getMe,login,showNameInNavbar,
    getDesktopTopBarMenu,renderDesktopTopBarMenu,getAllCourses,renderNewestCourses,
    getPopularCourses,renderPopularCourse
}