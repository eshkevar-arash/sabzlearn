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
            console.log(rememberInputs.checked)
            if (rememberInputs.checked){
                CookieManager.set('token', data.accessToken, 2)
            }else {
                CookieManager.set('token', data.accessToken)
            }
            toastMessage('ثبت نام شما با موفقیت انجام شد','index')
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
    resetRememberInput(rememberInputs)
    clearInputs(identifierElem,passwordElem)
})
