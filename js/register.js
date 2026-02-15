import {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
}
from "./Module/data.js";
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
    toastMessage('ثبت نام با موفقیت انجام شد')
    // const name = nameInput.value.trim()
    // const username = usernameInput.value.trim()
    // const email = emailInput.value.trim()
    // const phone = phoneInput.value.trim()
    // const password = passwordInput.value.trim()
    // const confirmPassword = confirmPasswordInput.value.trim()
    // if (!name || !username || !email || !phone || !password || !confirmPassword){
    //     showErrorMessage('لطفا تمام فیلدها را پر کنید')
    // }else {
    //     console.log('ok')
    // }
}
registerFormBtn.addEventListener('click', event => {
    event.preventDefault()
    registerNewUserHandler()
})






document.addEventListener('DOMContentLoaded', () => {
    resetRememberInput(loginFormRememberInputs)
    clearInputs(fullNameInput,usernameInput,emailInput,phoneInput,passwordInput,confirmPasswordInput)
})
