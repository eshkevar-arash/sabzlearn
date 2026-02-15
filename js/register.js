import {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
}
from "./Module/data.js";
/*========================================================*/
const fullNameInput = document.querySelector('.fullName')
const usernameInput = document.querySelector('.username')
const emailInput = document.querySelector('.email')
const phoneInput = document.querySelector('.phone')
const passwordInput = document.querySelector('.password')
const confirmPasswordInput = document.querySelector('.confirmPassword')
const loginFormBtn = document.querySelector('.login-form__btn')
const loginFormRememberInputs = document.querySelector('#login-form__remember-input')
loginFormBtn.addEventListener('click', event => {
    event.preventDefault()
})






document.addEventListener('DOMContentLoaded', () => {
    resetRememberInput(loginFormRememberInputs)
    clearInputs(fullNameInput,usernameInput,emailInput,phoneInput,passwordInput,confirmPasswordInput)
})
