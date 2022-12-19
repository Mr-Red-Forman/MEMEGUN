'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function renderImg(txt="") {
    const imgs = filterBySearch(txt)
    let strHTML = imgs.map((img) => `
    <img  class= "grid-Img imgid${img.id}" data-imgID="${img.id}"
     src=${img.url} alt="${imgs.keywords}">
    `
    )
    document.querySelector(".grid-container").innerHTML = strHTML.join('')
    addListenersImgGrid()
}

function addListenersImgGrid() {

    const imgs = document.querySelectorAll('.grid-Img')
    // click
    imgs.forEach(img => {
        img.addEventListener('click', () => onClickImg(event));
    });

    

    // // Hover
    // imgs.forEach(img => {
    //     img.addEventListener('mouseenter', () => onHoverImg());
    // });
}

function onClickImg(event) {
    changeScren()
    resizeCanvas()
    chosenImgInfo(event)
    gridEventLisner()
}

function changeScren() {
    const gridCont = document.querySelector(".grid-container")
    gridCont.classList.toggle("canvasOpen")
    const canvasCont = document.querySelector(".canvas-container")
    canvasCont.classList.toggle("canvasOpen")
}

// TODO hover funcations
// function onHoverImg() {

// }