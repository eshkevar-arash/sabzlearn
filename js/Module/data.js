function showErrorMessage(msg){
    Swal.fire({
        title: msg,
        icon: "error"
    })
}
function toastMessage(msg){
    Toast.fire({
        title: msg,
        icon: 'success',
        didClose: () => {
            /*console.log('✅ Toast بسته شد');*/
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