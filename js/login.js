import {
 showErrorMessage, CookieManager, toastMessage, resetRememberInput, clearInputs,
 hideLoadingOverlay, showErrorOverlay, getMe
} from "./Funcs/auth.js";
const identifierElem = document.querySelector('#identifier')
const passwordElem = document.querySelector('#loginPassword')
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
hideLoadingOverlay()
document.addEventListener('DOMContentLoaded', async () => {
    /*console.log(rememberInputs.checked)*/
    await initApp()
    resetRememberInput(rememberInputs)
    clearInputs(identifierElem,passwordElem)
})
