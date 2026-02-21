import {
 showErrorMessage, CookieManager, toastMessage, resetRememberInput, clearInputs,
 hideLoadingOverlay, showErrorOverlay, getMe
} from "./Funcs/auth.js";

const identifierElem = document.querySelector('#identifier')
const passwordElem = document.querySelector('#loginPassword')
const loginBtn = document.querySelector('#login-btn')
async function initApp(){
    const token = CookieManager.get('token')
    console.log(token)
    try{
        [user] = await Promise.all([
         getMe(token)
        ])
     if (user){
        console.log(user)
     }else {
        console.log('no token')
     }
    }
    catch (err){
       showErrorOverlay(err.message)
    }
    finally {
       hideLoadingOverlay()
    }

}
loginBtn.addEventListener('click', event => {
    event.preventDefault()
    const identifier = identifierElem.value.trim()
    const password = passwordElem.value.trim()
    if (!identifier || !password){
        showErrorMessage('لطفاً تمام فیلدها را پر کنید')
    }else {
        const userInfo = {
            identifier,
            password
        }
        loginBtn.querySelector('span').textContent = 'در حال ارسال ...'

    }
})
document.addEventListener('DOMContentLoaded', async () => {
    /*console.log(rememberInputs.checked)*/
    await initApp()
    resetRememberInput(rememberInputs)
    clearInputs(identifierElem,passwordElem)
})
