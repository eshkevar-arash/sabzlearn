import {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow
}
from "./Funcs/auth.js";
/*========================================================*/
const nameInput = document.querySelector('.name')
const usernameInput = document.querySelector('.username')
const emailInput = document.querySelector('.email')
const phoneInput = document.querySelector('.phone')
const passwordInput = document.querySelector('.password')
const confirmPasswordInput = document.querySelector('.confirmPassword')
const registerFormBtn = document.querySelector('#register-form-Btn')
const loginFormRememberInputs = document.querySelector('#login-form__remember-input')
async function registerNewUserHandler(){
    const name = nameInput.value.trim()
    const username = usernameInput.value.trim()
    const email = emailInput.value.trim()
    const phone = phoneInput.value.trim()
    const password = passwordInput.value.trim()
    const confirmPassword = confirmPasswordInput.value.trim()
    if (!name || !username || !email || !phone || !password || !confirmPassword) {
        showErrorMessage('لطفاً تمام فیلدها را پر کنید');
    } else if (!isValidFullName(name)) {
        showErrorMessage('لطفاً نام و نام خانوادگی معتبر وارد کنید. حداقل هر بخش ۲ حرف و فقط حروف فارسی یا انگلیسی، فاصله و خط تیره مجاز است.');
    } else if (!isValidUsername(username)) {
        showErrorMessage('نام کاربری باید حداقل ۳ کاراکتر باشد و با حرف انگلیسی شروع شود. کاراکترهای حرف، عدد، نقطه (.), خط تیره (-) و آندرلاین (_) مجاز هستند');
    } else if (!isValidEmail(email)) {
        showErrorMessage('لطفاً یک ایمیل معتبر وارد کنید، مثل example@example.com');
    } else if (!isValidPhoneNumber(phone)) {
        showErrorMessage('لطفاً شماره موبایل معتبر وارد کنید، مثل +989123456789');
    } else if (!isValidPassword(password)) {
        showErrorMessage('پسورد باید حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد.');
    } else if (password !== confirmPassword) {
        showErrorMessage('پسورد و تکرار آن با هم مطابقت ندارند.');
    }else {
        const newUser = {
            name,
            username,
            email,
            phone,
            password,
            confirmPassword
        }
        registerFormBtn.textContent = 'در حال ارسال...'
        try {
            const data = await registerNewUser(newUser)
            console.log(data.user)
            console.log(data.accessToken)
            toastMessage('ثبت نام شما با موفقیت انجام شد')
        }catch (err){
            showErrorMessage(err.message)
        }finally {
            registerFormBtn.textContent = 'ثبت نام'
        }
    }
}
registerFormBtn.addEventListener('click', async event => {
    event.preventDefault()
    await registerNewUserHandler()
})

async function registerNewUser(user){
    const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (res.status === 409){
        throw new Error('ایمیل یا نام کاربری قبلا وارد شده است')
    }
    if (res.status === 404){
        throw new Error('دسترسی به سرور با مشکل مواجه شد'+ "..." + res.status)
    }
    const data = await res.json()
    return data
}


document.addEventListener('DOMContentLoaded', () => {
    resetRememberInput(loginFormRememberInputs)
    clearInputs(nameInput,usernameInput,emailInput,phoneInput,passwordInput,confirmPasswordInput)
})
