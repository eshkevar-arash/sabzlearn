import {
    Toast,
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow,
    registerNewUser,
    CookieManager,
    hideLoadingOverlay,showErrorOverlay,hideErrorOverlay,getMe
}
    from "./Funcs/auth.js";

const userCountElem = document.querySelector('#users-count')
const numbersCourseElem = document.querySelector('#numbers-course')
const minutesCourseElem = document.querySelector('#minutes-course')

function makeCounter(elem, max){
    let index = 0
    let counter = setInterval(()=>{
        elem.textContent = index.toLocaleString()
        index++
        if (index > max){
            clearInterval(counter)
        }
    }, 0.5)
}
const userCount = 31_71
const numbersCourse = 40
const minutesCourse = 31_320
makeCounter(userCountElem, userCount)
makeCounter(numbersCourseElem, numbersCourse)
makeCounter(minutesCourseElem, minutesCourse)

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
document.addEventListener('DOMContentLoaded', async () =>{
    await initApp()
})
