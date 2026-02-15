import {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
}
from "./Module/data.js";
/*========================================================*/
const loginFormBtn = document.querySelector('.login-form__btn')
const loginFormRememberInputs = document.querySelector('#login-form__remember-input')
loginFormBtn.addEventListener('click', event => {
    event.preventDefault()
})






document.addEventListener('DOMContentLoaded', () => {
    resetRememberInput(loginFormRememberInputs)
})
