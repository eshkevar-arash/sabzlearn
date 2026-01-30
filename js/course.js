const introductionTopic = document.querySelector('.introduction-topic')
const introductionCollapses = introductionTopic.querySelectorAll('.introduction-collapse')
introductionTopic.addEventListener('click', event => {
    const targetCollapseBtn = event.target.closest('.introduction-collapse__btn')
    if (targetCollapseBtn){
        introductionCollapses.forEach(li => {
            if (li !== targetCollapseBtn.closest('.introduction-collapse')){
                li.classList.remove('introduction-collapse--open')
            }

        })
        targetCollapseBtn.closest('.introduction-collapse').classList.toggle('introduction-collapse--open')
    }
})