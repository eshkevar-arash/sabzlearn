import {
 showErrorMessage, toastMessage, resetRememberInput, clearInputs,
 hideLoadingOverlay, showErrorOverlay, getMe, login
} from "./Funcs/auth.js";

const identifierElem = document.querySelector('#identifier')
const passwordElem = document.querySelector('#loginPassword')
const loginBtn = document.querySelector('#login-btn')
async function initApp(){
    resetRememberInput(rememberInputs)
    clearInputs(identifierElem,passwordElem)
    const token = CookieManager.get('token')
    try{
        [user] = await Promise.all([
         getMe(token)
        ])
     if (user){
         console.log(user)
        identifierElem.value = user.email
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

loginBtn.addEventListener('click', async event => {
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
        try {
            const data = await login(userInfo)
            if (rememberInputs.checked){
                CookieManager.set('token', data.accessToken, 2)
            }else {
                CookieManager.set('token', data.accessToken)
            }
            toastMessage('ورود شما با موفقیت انجام شد','index')
        }catch (err){
            showErrorMessage(err.message)
        }
        finally {
            loginBtn.querySelector('span').textContent = 'ورود'
        }

    }
})
document.addEventListener('DOMContentLoaded', async () => {
    /*console.log(rememberInputs.checked)*/
    await initApp()
})
