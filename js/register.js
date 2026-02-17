import {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName
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
function registerNewUserHandler(){
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
        console.log('ok')
    }
}
registerFormBtn.addEventListener('click', async event => {
    event.preventDefault()
    registerNewUserHandler()
})





async function getAllUsers() {
    const res = await fetch(`${baseUrl}/users`)

    console.log('status:', res.status)

    if (!res.ok) {
        throw new Error(`خطا از سرور - status: ${res.status}`)
    }

    const data = await res.json()
    return data
}
document.addEventListener('DOMContentLoaded', () => {
    /*resetRememberInput(loginFormRememberInputs)
    clearInputs(nameInput,usernameInput,emailInput,phoneInput,passwordInput,confirmPasswordInput)*/
})
