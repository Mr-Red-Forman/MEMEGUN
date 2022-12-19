'use strict'
let gMeme
let MEMES

MEMES='memes'
gMeme=[]

function insertMemeInfo(memeObj){
    gMeme.push(memeObj)
    saveToStorage(MEMES, gMeme)
}

function changeRow(imgNum){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgNum)
    gMeme[gMemeIdx].selectedLineIdx+=1
    console.log('gMeme[gMemeIdx].lines.length:', gMeme[gMemeIdx].lines.length)
    console.log('gMeme[gMemeIdx].selectedLineIdx',gMeme[gMemeIdx].selectedLineIdx)
    if (gMeme[gMemeIdx].selectedLineIdx>=gMeme[gMemeIdx].lines.length){
        gMeme[gMemeIdx].selectedLineIdx=0
    }
    saveToStorage(MEMES, gMeme)
}

function updateMeme(key,value,imgId, line){
    // todo adjest to diftrent key
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    // Object.keys(gMeme[gMemeIdx].lines).length === 0
    if (gMeme[gMemeIdx].lines.length===0){
        addRow(imgId)
    }
    gMeme[gMemeIdx].lines[line][key]=value
    // TODO add length of the word
    saveToStorage(MEMES, gMeme)
}

function toTrash(imgId){
    gMeme=loadFromStorage(MEMES)

    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    if (gMeme[gMemeIdx].lines.length===0) return

    const currectLine=gMeme[gMemeIdx].selectedLineIdx
    gMeme[gMemeIdx].lines.splice(currectLine,1)

    let newLine
    if (gMeme[gMemeIdx].lines.length-1< currectLine){
        if (gMeme[gMemeIdx].lines.length===0){newLine=0
        }else{
            newLine=gMeme[gMemeIdx].lines.length-1
        }
    }
    gMeme[gMemeIdx].selectedLineIdx=newLine

    saveToStorage(MEMES, gMeme)
}

function canvasFunction (key, value,imgId){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    const line=gMeme[gMemeIdx].selectedLineIdx
    if (key==='size'){
    gMeme[gMemeIdx].lines[line][key]+=value
    }else{
    gMeme[gMemeIdx].lines[line][key]=value
    }
    saveToStorage(MEMES, gMeme)
}

function addRow(imgId, elmoji=false){
    const canvas=getCanvasSize()
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    const numbersOflines=gMeme[gMemeIdx].lines.length
    let pos={}
    if (elmoji){pos={y:canvas.height/2, x:canvas.width/2}
    } else if (numbersOflines===0) {
        pos={y:canvas.height/9, x:canvas.width/2}
    }else if (numbersOflines===1){
        pos={y:canvas.height/1.1, x:canvas.width/2}
    } else if (numbersOflines>=2){
        pos={y:canvas.height/2, x:canvas.width/2}
    }
    gMeme[gMemeIdx].lines.push({
        pos:pos,
        onDrag:false,
        txt: "", 
        size: 40, 
        align: 'center', 
        color: `"${getRandomColor()}"`,
        strokColor:`"${getRandomColor()}"`
    }
    )
    gMeme[gMemeIdx].selectedLineIdx=gMeme[gMemeIdx].lines.length-1
    console.log('gMeme[gMemeIdx].lines:', gMeme[gMemeIdx].lines)
    saveToStorage(MEMES, gMeme)
}

function getMemeById(num){
    gMeme=loadFromStorage(MEMES)
    const meme=gMeme.find(gMeme=>gMeme.selectedImgId===num)
    return meme
}

function addEmoji(emoji, imgId){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    addRow(imgId, true)
    gMeme=loadFromStorage(MEMES)
    const lineIdx=gMeme[gMemeIdx].selectedLineIdx
    gMeme[gMemeIdx].lines[lineIdx].txt=emoji
    saveToStorage(MEMES, gMeme)
}

function isTextClicked(clickedPos,imgId) {
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    if (gMeme[gMemeIdx].lines.length===0) return -1
   
    const catchLine=gMeme[gMemeIdx].lines.findIndex(line=>(
        (line.pos.x<=clickedPos.x &&  line.pos.x+line.size*line.txt.length/2>=clickedPos.x)&&
        (line.pos.y>=clickedPos.y && line.pos.y-line.size<=clickedPos.y)
       ))
    
    if (catchLine>=0){
        gMeme[gMemeIdx].selectedLineIdx=catchLine
        saveToStorage(MEMES, gMeme)
    }
    return catchLine
}

function setWordDrag(imgId,isDrag) {
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    if  (gMeme[gMemeIdx].lines.length<1) return
    gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].onDrag=isDrag
    saveToStorage(MEMES, gMeme)
}

function changePos (imgId,pos){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.x=pos.x
    gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.y=pos.y
    saveToStorage(MEMES, gMeme)
}

function isLineDrag(imgId){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    if (gMeme[gMemeIdx].lines.length===0) return
    return gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].onDrag
}

function getPreLocation(imgId){
    const gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    const xLoc=gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.x
    const yLoc=gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.y
    const loc={x:xLoc,y:yLoc}
    return loc
}

function currentRow(imgId){
    const gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    if (!gMeme[gMemeIdx].lines.length) return -1
    return gMeme[gMemeIdx].selectedLineIdx
}

function getWordSize(imgId, curretLine){
    const gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
    const line=gMeme[gMemeIdx].lines[curretLine]
    return{
        x_start:line.pos.x,
        x_width:line.size*line.txt.length/2,
        y_start:line.pos.y,
        y_heigth:line.size
    }

}
