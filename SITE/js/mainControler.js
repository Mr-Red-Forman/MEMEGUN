'use strict'

function onInit(){

    // render the images
    renderImg()
    // add the canvas grid
    initCanvas()
}


// Img grid

function renderImg() {
    const imgs = getImgs()
    let strHTML = imgs.map(img => `
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

    // Hover
    imgs.forEach(img => {
        img.addEventListener('mouseenter', () => onHoverImg());
    });

}

function onClickImg(event) {
    const gridCont=document.querySelector(".grid-container")
    gridCont.classList.toggle("canvasOpen")
    const canvasCont=document.querySelector(".canvas-container")
    canvasCont.classList.toggle("canvasOpen")
    resizeCanvas()

    drawImg(event)
    
}

function onHoverImg() {

}

// Canvas 



let gElCanvas
let gCtx

function initCanvas(){
    gElCanvas=document.querySelector(".main-canvas")
    gCtx=gElCanvas.getContext('2d')

    resizeCanvas()

    addListenersCanvas()

}


function  addListenersCanvas() {
    // TODO:
        // addMouseListeners()
        // addTouchListeners()
    //Listen for resize ev
    
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()

    })
}


function renderCanvas() {
    //Set the backgournd color to grey remove when finish
    gCtx.fillStyle = '#ede5ff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.paintCanvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas()
}

function drawImg(ev,onImageReady) {
    const imgNum= ev.target.dataset.imgid
    const elImg = new Image() // Create a new html img element
    elImg.src = `/DOC/meme-imgs (square)/${imgNum}.jpg`// Send a network req to get that image, define the img src
    // console.log('elImg:', elImg)
    // // setTimeout(() => {
    // //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // // }, 10);
    // // When the image ready draw it on the canvas
    elImg.onload = () => {
        console.log('gElCanvas.width:',gElCanvas.width )
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }

}


