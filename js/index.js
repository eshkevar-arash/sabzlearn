import {
    Toast,
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName,
    errorOverlayShow,
    registerNewUser,
    hideLoadingOverlay,showErrorOverlay,hideErrorOverlay,getMe,showNameInNavbar,
    getDesktopTopBarMenu,renderDesktopTopBarMenu,getAllCourses,renderNewestCourses
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
    try{
        [user,desktopTopBarMenu,allCourses] = await Promise.all([
            getMe(token),
            getDesktopTopBarMenu(),
            getAllCourses()
        ])
        showNameInNavbar(user,token)
        renderDesktopTopBarMenu(desktopTopBarMenu)
        renderNewestCourses(allCourses)
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
