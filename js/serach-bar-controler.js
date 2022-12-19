'use strict'

function onTextFinder(txt) {
    document.querySelector(".grid-container").classList.remove("canvasOpen")
    document.querySelector(".canvas-container").classList.remove("canvasOpen")
    renderImg(txt)
}

function renderSearchOption() {
    const searchWord = getKeywordsSearch()
    console.log('searchWord:', searchWord)
    let strHTML = searchWord.map(word => `
    <h1 data-word="${word}" class="fastOptions">${word}</h1>
    `)
    document.querySelector(".fast-search").innerHTML = strHTML.join('')
    addListenersImgFastSearch()
}

function addListenersImgFastSearch() {
    const elBut = document.querySelectorAll(".fastOptions")
    elBut.forEach(but => {
        but.addEventListener('click', () => onSerachWordClick(event));
    })
}

function onSerachWordClick(ev) {
    onTextFinder(ev.target.dataset.word)
    console.log('ev:', ev)
    const elBut = document.querySelector(".fast-search")
    if (elBut.classList.value.includes("open")) {
        elBut.classList.remove("openSearch")
    }
}

function increaseGridOfWord() {
    const elBut = document.querySelector(".fast-search")
    elBut.classList.toggle("openSearch")
    renderSearchOption()
}