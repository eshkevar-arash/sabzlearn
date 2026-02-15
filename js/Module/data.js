function showErrorMessage(message) {
    return Swal.fire({
        icon: 'error',
        title: message,
        confirmButtonText: 'متوجه شدم',
        buttonsStyling: false,
        customClass: {
            popup: 'my-swal-popup',
            title: 'my-swal-title',
            confirmButton: 'my-swal-confirm'
        }
    })
}
function toastMessage(msg) {
    return Toast.fire({
        title: msg,
        icon: 'success',
        customClass: {
            popup: 'my-toast',
            icon: 'my-toast-icon',
            container: 'my-toast-container'
        },
        didClose: () => {
            /* console.log('✅ Toast بسته شد'); */
        }
    });
}
function resetRememberInput(checkboxInput){
    checkboxInput.checked = false
}
function clearInputs(...inputs){
    inputs.forEach(input => {
        input.value = ''
    })
}
function isValidPhoneNumber(input) {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(input);
}
function isValidUsername(username) {
    const regex = /^[A-Za-z][A-Za-z0-9._-]{2,}$/;
    return regex.test(username);
}
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
function isValidPassword(password) {
    // Regex بررسی استاندارد بودن پسورد
    // حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;
    return passwordRegex.test(password);
}
function isValidFullName(name) {
    // حداقل 2 حرف، فقط حروف فارسی و انگلیسی، فاصله و خط تیره مجاز
    const nameRegex = /^[A-Za-z\u0600-\u06FF]{2,}([ -][A-Za-z\u0600-\u06FF]+)*$/;
    return nameRegex.test(name.trim());
}
export {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs,
    isValidPhoneNumber,isValidUsername,isValidEmail,isValidPassword,isValidFullName
}