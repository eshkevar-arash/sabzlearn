/*Start Courses TopBar*/
const coursesTopBarColumnBtn = document.querySelector('.courses-top-bar__column-btn')
const coursesTopBarRowBtn = document.querySelector('.courses-top-bar__row-btn')
const coursesTopBarSelection = document.querySelector('.courses-top-bar__selection')
const coursesTopBarSelectionBtn = coursesTopBarSelection.querySelector('.courses-top-bar__selection-btn')
const coursesTopBarSelectionList = coursesTopBarSelection.querySelector('.courses-top-bar__selection-list')
const coursesTopBarSelectionItems = coursesTopBarSelectionList.querySelectorAll('.courses-top-bar__selection-item')
/*Start Courses Top-Bar*/
coursesTopBarColumnBtn.addEventListener('click', () => {
    coursesTopBarColumnBtn.classList.add('courses-top-bar__btn--active')
    coursesTopBarRowBtn.classList.remove('courses-top-bar__btn--active')
})
coursesTopBarRowBtn.addEventListener('click', () => {
    coursesTopBarRowBtn.classList.add('courses-top-bar__btn--active')
    coursesTopBarColumnBtn.classList.remove('courses-top-bar__btn--active')
})

coursesTopBarSelectionBtn.addEventListener('click', event => {
    const {target} = event
    const targetBtn = target.closest('.courses-top-bar__selection-btn')
    if (targetBtn){
        targetBtn.parentElement.classList.toggle('courses-top-bar__selection--open')
    }
})
coursesTopBarSelectionList.addEventListener('click', event => {
    const {target} = event
    const targetLi = target.closest('.courses-top-bar__selection-item')
    if (targetLi){
        coursesTopBarSelection.querySelector('.courses-top-bar__selection-title').textContent = targetLi.textContent
        coursesTopBarSelection.classList.remove('courses-top-bar__selection--open')
        coursesTopBarSelectionItems.forEach(li => {
            li.classList.remove('courses-top-bar__selection-item--active')
        })
        targetLi.classList.add('courses-top-bar__selection-item--active')
    }
})
/*Finish Courses Top-Bar*/

/*Start Mobile Menu Btn*/
mobileMenuBtn.addEventListener('click', event => {
    const {target} = event
    if (!target.closest('.courses-top-bar__selection')){
        coursesTopBarSelection.classList.remove('courses-top-bar__selection--open')
    }
})
/*Finish Mobile Menu Btn*/
document.documentElement.addEventListener('click', event => {
    const {target} = event
    if (!target.closest('.courses-top-bar__selection')){
        coursesTopBarSelection.classList.remove('courses-top-bar__selection--open')
    }
})