import {
    getRandomItems,createDesktopTopBarItem
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
function createCourseBox(course){
    const newDiv = document.createElement('div')
    newDiv.className = 'col-12 col-md-6 col-xl-4'
    newDiv.innerHTML = `
        <div class="courses-box">
            <div class="courses-box__header">
                <a href="#" class="courses-box__header-link">
                    <img src="./images/courses/fareelancer.png" class="courses-box__header-image">
                </a>
            </div>
            <div class="courses-box__main">
                <a href="#" class="courses-box__title">${course.name}</a>
                <div class="courses-box__rating-teacher">
                    <div class="courses-box__teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user courses-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher courses-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                        <a href="#" class="courses-box__teacher-link">${course.creator}</a>
                    </div>
                    <div class="courses-box__rating">
                        <img src="./images/svgs/star.svg" alt="rating">
                        <img src="./images/svgs/star_fill.svg" alt="rating">
                        <img src="./images/svgs/star_fill.svg" alt="rating">
                        <img src="./images/svgs/star_fill.svg" alt="rating">
                    </div>
                </div>
                <div class="courses-box__status">
                    <div class="courses-box__users">
                        <svg class="svg-inline--fa fa-users courses-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="fas fa-users courses-box__users-icon"></i> Font Awesome fontawesome.com -->
                        <span class="courses-box__users-count">${course.registers}</span>
                    </div>
                    <span class="courses-box__price">${course.price === 0? 'رایگان': course.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="courses-box__footer">
                <a href="#" class="courses-box__footer-link ">
                    مشاهده اطلاعات
                    <svg class="svg-inline--fa fa-arrow-left courses-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg><!-- <i class="fas fa-arrow-left courses-box__footer-icon"></i> Font Awesome fontawesome.com -->
                </a>
            </div>
        </div>
    `

    return newDiv
}

function renderNewestCourses(allCourses){
    const fragmentElem = document.createDocumentFragment()
    const newestCoursesWrapper = document.querySelector('#newest-courses')
    newestCoursesWrapper.innerHTML = ''
    console.log(newestCoursesWrapper)
    console.log(allCourses)
    const lastCourses = allCourses.reverse().slice(0,6)
    console.log(lastCourses)
    lastCourses.forEach(course => {
        console.log(course)
        fragmentElem.appendChild(createCourseBox(course))
    })
    newestCoursesWrapper.appendChild(fragmentElem)
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
}