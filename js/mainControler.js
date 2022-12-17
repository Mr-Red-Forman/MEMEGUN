'use strict'

let centerEmoji
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    initServiceEl()
    // render the images
    renderImg()
    // add the canvas grid
    initCanvas()
    // render searchBar
    renderSearchOption() 
    
}


// search bar
function onTextFinder(txt){
    document.querySelector(".grid-container").classList.remove("canvasOpen")
    document.querySelector(".canvas-container").classList.remove("canvasOpen")
    renderImg(txt)
}

// Img grid

// if (!txt){
//     return
// }

function renderSearchOption(){
    const searchWord=getKeywordsSearch()
    console.log('searchWord:', searchWord)
    let strHTML = searchWord.map(word => `
    <h1 data-word="${word}" class="fastOptions">${word}</h1>
    `)
    document.querySelector(".fast-search").innerHTML = strHTML.join('')
    addListenersImgFastSearch()
}

function addListenersImgFastSearch(){
    const elBut=document.querySelectorAll(".fastOptions")
    elBut.forEach(but => {
        but.addEventListener('click', () => onSerachWordClick(event));
    })
}

function onSerachWordClick(ev){
    onTextFinder(ev.target.dataset.word)
    console.log('ev:', ev)
    const elBut=document.querySelector(".fast-search")
    if (elBut.classList.value.includes("open")){
        elBut.classList.remove("openSearch")}
}

function increaseGridOfWord(){
    const elBut=document.querySelector(".fast-search")
    elBut.classList.toggle("openSearch")
    renderSearchOption()
}

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

    

    // Hover
    imgs.forEach(img => {
        img.addEventListener('mouseenter', () => onHoverImg());
    });

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

function onHoverImg() {

}

// Canvas 

// 

let gElCanvas
let gCtx
let gCurrectImgId

function initCanvas() {
    gElCanvas = document.querySelector(".main-canvas")
    gCtx = gElCanvas.getContext('2d')
    onEmojiSearch()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}


function gridEventLisner(){

    // escap
    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {
            //if esc key was not pressed in combination with ctrl or alt or shift
            const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey)
            if (isNotCombinedKey) {
                document.querySelector(".grid-container").classList.remove("canvasOpen")
                document.querySelector(".canvas-container").classList.remove("canvasOpen")

            }
        }
    })

    // mouse Event
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)

}

function renderCanvas() {
    if (gCurrectImgId) { drowImg() }

}

function resizeCanvas() {
    const elContainer = document.querySelector('.paintCanvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    // const elcontrolButs = document.querySelector('.controlButs')
    // elcontrolButs.width = elContainer.offsetWidth 
    // elcontrolButs.height = elContainer.offsetHeight
    renderCanvas()
}

function getCanvasSize() {
    return gElCanvas
}

function chosenImgInfo(ev) {
    gCurrectImgId = ev.target.dataset.imgid
    drowImg()

}

function drowImg() {
    const elImg = new Image()
    let img = geImgtById(gCurrectImgId)
    elImg.src = img.url.split('"')[1]
    const memeArray = getMemeById(gCurrectImgId).lines
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        // const meme=getMemeById(gCurrectImgId)
        memeArray.map(line => drowText(line))
    }
}

function drowText(memeSetup) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = memeSetup.strokColor
    gCtx.fillStyle = memeSetup.color
    gCtx.textAlign = memeSetup.align
    gCtx.font = memeSetup.size + 'px arial'
    gCtx.fillText(memeSetup.txt, memeSetup.pos.x, memeSetup.pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(memeSetup.txt, memeSetup.pos.x, memeSetup.pos.y)
    peltatColorChange(memeSetup)

}


function onTypeMeme(text) {
    const currectLineNumber = getMemeById(gCurrectImgId).selectedLineIdx

    updateMeme('txt', text, gCurrectImgId, currectLineNumber)
    renderCanvas()
}

function onChangeRow() {
    document.getElementById("textAdd").value = ""
    changeRow(gCurrectImgId)
    renderCanvas()
}

function onTrash() {
    toTrash(gCurrectImgId)
    document.getElementById("textAdd").value = ""
    renderCanvas()
}


function onCanvasFuncion(key, value) {
    canvasFunction(key, value, gCurrectImgId)
    renderCanvas()
}

function peltatColorChange(memeSteup) {
    console.log('3px 3px 3px ' + memeSteup)
    // document.getElementById("fontCol").style.backgroundColor = memeSteup.color
    // document.getElementById("impactCol").style.textShadow = '3px 3px 3px ' + memeSteup.strokColor;
}

function onAddRow() {
    addRow(gCurrectImgId)
    document.getElementById("textAdd").value = ""

    renderCanvas()
}

function onEmojiSearch(nextStep) {
    // var emojRange = [128513, 128591]
    centerEmoji += nextStep
    if (!centerEmoji) {
        centerEmoji = 128514
    }
    else {
        if (128514 < centerEmoji & 128590 > centerEmoji) {
            centerEmoji += nextStep
        }
    }
    document.getElementById('leftEmoji').innerHTML = "&#" + (centerEmoji + 1) + ";";
    document.getElementById('centerEmoji').innerHTML = "&#" + centerEmoji + ";";
    document.getElementById('rightEmoji').innerHTML = "&#" + (centerEmoji - 1) + ";";
    renderCanvas()
}

function onAddEmoji(emoji) {
    addEmoji(emoji.innerText, gCurrectImgId)
    renderCanvas()
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (isTextClicked(pos, gCurrectImgId)<0) return
    setWordDrag(gCurrectImgId,true)

    changePos(gCurrectImgId, pos)
    document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
    const isDrag=isLineDrag(gCurrectImgId)
    
    const pos = getEvPos(ev)


    if (!isDrag) return
    

    const loc=getPreLocation(gCurrectImgId)
    const changeInPos={x:pos.x-loc.x, y:pos.y-loc.y}
    // distenceChange(gCurrectImgId, pos)
    moveCircle (gCurrectImgId, changeInPos)



    renderCanvas()
}

function onUp() {
    setWordDrag(gCurrectImgId,false)
    document.body.style.cursor = 'default'
}


function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}




