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
export {
    showErrorMessage,
    toastMessage,
    resetRememberInput,
    clearInputs
}