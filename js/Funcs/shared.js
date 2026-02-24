
function getRandomItems(arr, count = 6) {
    // کپی برای جلوگیری از تغییر آرایه اصلی
    const shuffled = [...arr]
    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
    }
    return shuffled.slice(0, Math.min(count, shuffled.length))
}
function createDesktopTopBarItem(row){
    const newLi = document.createElement('li')
    const newLink = document.createElement('a')
    newLi.className = 'top-bar__item'
    newLink.href = '#'
    newLink.className = 'top-bar__link'
    newLink.textContent = row.title
    newLi.appendChild(newLink)
    return newLi
}
export {
    getRandomItems,createDesktopTopBarItem
}