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
function toastMessage(msg) {
    Toast.fire({
        title: msg,
        icon: 'success',
        customClass: {
            popup: 'my-toast',
            icon: 'my-toast-icon',
            container: 'my-toast-container'
        },
        didClose: () => {
            /* console.log('✅ Toast بسته شد'); */
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
export {
    Toast,
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow,registerNewUser,
}