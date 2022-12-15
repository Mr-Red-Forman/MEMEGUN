'use strict'

let gElCanvas
let gCtx

function initCanvas(){
    gElCanvas=document.querySelector(".main-canvas")
    gCtx=gElCanvas.getContext('2d')

    resizeCanvas()

    addListenersCavas()

}


function  addListenersCavas() {
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
    //Set the backgournd color to grey
    gCtx.fillStyle = '#ede5ff'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-canvas')
    console.log('elContainer:', elContainer.offsetWidth)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas()
}





// function resizeCanvas() {
//     const elContainer = document.querySelector('.main-canvas')
//     const perent=elContainer.parentElement

//     elContainer = parent.offsetWidth;
//     elContainer = parent.offsetHeight;

//     // elContainer.style.width ="100px"
//     // elContainer.style.height="100px"

//     // gElCanvas.width = elContainer.offsetWidth
//     // gElCanvas.height = elContainer.offsetHeight
// }