'use strict'
let centerEmoji
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
    if (memeSetup.txt.length>0){highlightEditRow()}
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
    // console.log('3px 3px 3px ' + memeSteup)
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
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function highlightEditRow(){
    // console.log('currentRow(gCurrectImgId):',currentRow(gCurrectImgId))
    const currenctLine=currentRow(gCurrectImgId)
    console.log('currentLine:', currenctLine)
    if (currenctLine<0) return
    const {x_start,x_width,y_start,y_heigth}=getWordSize(gCurrectImgId,currenctLine)
    // console.log('wordLine:', x_start)
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x_start-x_width/1.5, y_start+10, x_width*1.3, -y_heigth*1.2)
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(wordLine.x_start, wordLine.y_top, wordLine.x_left, wordLine.y_buttom)
}
