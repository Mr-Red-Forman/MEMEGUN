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
    chengeScreen()
    
    resizeCanvas()
    chosenImgInfo(event)
    
}

function chengeScreen(){
    const gridCont=document.querySelector(".grid-container")
    gridCont.classList.toggle("canvasOpen")
    const canvasCont=document.querySelector(".canvas-container")
    canvasCont.classList.toggle("canvasOpen")
}

function onHoverImg() {

}

// Canvas 



let gElCanvas
let gCtx
let gCurrectImgId

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
    // gCtx.fillStyle = '#ede5ff'
    // //Clear the canvas,  fill it with grey background
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

    if (gCurrectImgId) {drowImg()}
    

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth/2
    gElCanvas.height = elContainer.offsetHeight
    renderCanvas()
    
   
}

function chosenImgInfo(ev) {
    gCurrectImgId= ev.target.dataset.imgid
    drowImg()
    
}

function drowImg(){
    const elImg = new Image()
    elImg.src= `/DOC/meme-imgs (square)/${gCurrectImgId}.jpg`
    const memeArray=getMemeById(gCurrectImgId).lines
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        // const meme=getMemeById(gCurrectImgId)
        memeArray.map(line=> drowText(line))
    }
}

function drowText(memeSteup){
    console.log('memeSteup.pos:',memeSteup.pos )
    const loc= { x: gElCanvas.width /memeSteup.pos.w , y: gElCanvas.height/memeSteup.pos.w}
    gCtx.lineWidth = 2
    gCtx.strokeStyle = memeSteup.strokColor
    gCtx.fillStyle = memeSteup.color
    gCtx.textAlign = memeSteup.align
    gCtx.font = memeSteup.size+'px arial'
    gCtx.fillText(memeSteup.txt, loc.x, loc.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(memeSteup.txt, loc.x, loc.y)
    peltatColorChange(memeSteup)

}


function onTypeMeme(text){
    const currectLineNumber=getMemeById(gCurrectImgId).selectedLineIdx
    console.log('currectLineNumber:',currectLineNumber )
    const currectLine=getMemeById(gCurrectImgId).lines[currectLineNumber]
    currectLine.txt=text
    updateMeme('txt',text ,gCurrectImgId ,currectLineNumber)
    renderCanvas()
}

function onChangeRow(){
    document.getElementById("textAdd").value=""
    changeRow(gCurrectImgId)
    renderCanvas()
}

function onTrash(){
    toTrash(gCurrectImgId)
    chengeScreen()
    gCurrectImgId=''
    renderImg()
}


function onCanvasFuncion(key, value){
    canvasFunction(key,value ,gCurrectImgId)
    renderCanvas()
}

function peltatColorChange(memeSteup){
    document.getElementById("fontCol").style.backgroundColor=memeSteup.color
    document.getElementById("impactCol").style.backgroundColor=memeSteup.strokColor
}

function onAddRow(){
    addRow(gCurrectImgId)
    document.getElementById("textAdd").value=""

    renderCanvas()
}




