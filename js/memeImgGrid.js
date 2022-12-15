'use strict'

function renderImg() {
    const imgs = getImgs()
    let strHTML = imgs.map(img => `
    <img  class= "grid-Img imgid${img.id}" data-imgID="${img.id}"
     src=${img.url} alt="${imgs.keywords}">
    `
    )

    document.querySelector(".grid-container").innerHTML = strHTML.join('')


    addEventClick()
    addEventHover()
}

function addEventClick() {

    const imgs = document.querySelectorAll('.grid-Img')
    imgs.forEach(img => {
        img.addEventListener('click', () => onClickImg());
    });
}


function addEventHover() {

    const imgs = document.querySelectorAll('.grid-Img')
    imgs.forEach(img => {
        img.addEventListener('mouseenter', () => onHoverImg());
    });

}

function onClickImg() {
    const gridCont=document.querySelector(".grid-container")
    gridCont.classList.toggle("canvasOpen")
    const canvasCont=document.querySelector(".canvas-container")
    canvasCont.classList.toggle("canvasOpen")
}

function onHoverImg() {

}
