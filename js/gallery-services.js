'use strict'

let gImgs
let IMGS

gImgs=[]
IMGS='imgs'

function geImgtById(num){
    gMeme=loadFromStorage(IMGS)
    const meme=gMeme.find(gMeme=>gMeme.id===num)
    return meme
}

function getImgs(){

    if (!loadFromStorage(IMGS)){
        gImgs=_deafultgImgs()
    }else{
        gImgs=loadFromStorage(IMGS)
    }
    return gImgs
}

function insertImg (imgObj){
    gImgs.push(imgObj)
    saveToStorage(IMGS, gImgs)
}

function _deafultgImgs(){
    for (var i=1; i<18;i++){
        var randomid=makeId()
        insertImg({
            id:randomid,
            url:`"img/meme-imgs (square)/${i}.jpg"`,
            keywords:[keywords[getRandomIntInt(0, keywords.length-1)],keywords[getRandomIntInt(0, keywords.length-1)]]
        })
        insertMemeInfo({
            selectedImgId: randomid,
            selectedLineIdx: 0, 
            lines: []
               
        })
    }
    return gImgs
}