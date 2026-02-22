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
    const mainHeaderProfileBox = document.querySelector('.main-header__profile-box')

    const mobileBar = document.querySelector('.mobile-bar')
    const mobileBarTopLogin = mobileBar.querySelector('.mobile-bar__top-login')
    const mobileBarTop = mobileBar.querySelector('.mobile-bar__top')
    const mobileLogoutBtn = mobileBar.querySelector('#mobile-logout-btn')
    const mobileBarShortCuts = mobileBar.querySelector('.mobile-bar__shortCuts')
    if (user){
        mainHeaderProfileBox.innerHTML = `
            <i class="fas fa-user main-header__profile-icon"></i>
            <span class="main-header__profile-text">${user.name}</span>
        `
        mobileLogoutBtn.style.display = 'flex'
        mobileBarTop.style.display = 'flex'
        mobileBarTopLogin.style.display = 'none'
        mobileBarShortCuts.style.display = 'block'
        mobileBarTop.innerHTML = `
            <div class="mobile-bar__info">
                <a href="#" class="mobile-bar__info-link">
                    <img class="mobile-bar__info-link-image" src="./images/info/bb2b510d7ee6483dd0acf1b88a80de79.jpg" alt="user">
                </a>
                <div class="mobile-bar__info-details">
                    <span class="mobile-bar__info-username">${user.name}</span>
                    <span class="mobile-bar__info-date">${user.phone}</span>
                </div>
            </div>
        `
    }
}
export {
    Toast,
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow,registerNewUser,CookieManager,
    hideLoadingOverlay,showErrorOverlay,hideErrorOverlay,getMe,login,showNameInNavbar
}