'use strict'

let gKeywordSearchCountMap
let gImgs
let gMeme
// const KEY_WORDS='key_word'
const IMGS='imgs'
const MEMES='memes'

const keywords=['Trump', 'Cat', 'Dog', 'Snake', 'Rat', 'Sunrise', 'Monopolly','NYS','TLV','Friends',
'Army', 'Queen']

// NOT RELEVENT FOR NOW
// function textFinder(txt){
//     txt=txt.toLowerCase()
//     const kWord=getKeywords()
//     let words=Object.keys(kWord).map(word=>{
//         return word.toLowerCase()})
//     let retWord=words.filter(word=> word.startsWith(txt))
//     words=retWord.map(word=>{
//         return word[0].toUpperCase() + word.slice(1).toLowerCase()})
//     // return words
    
// }

// function getKeywords(){
    //     if (!loadFromStorage('key_word')){
    //         gKeywordSearchCountMap=_deafultKeyWords()
    //     }else{
    //         gKeywordSearchCountMap=loadFromStorage('key_word')
    //     }
    //     return gKeywordSearchCountMap
    // }


function getImgs(){
    if (!loadFromStorage(IMGS)){
        gImgs=_deafultgImgs()
    }else{
        gImgs=loadFromStorage(IMGS)
    }
    return gImgs
}


function insertImg (imgObj){
    if (!gImgs) gImgs=[]
    gImgs.push(imgObj)
    saveToStorage(IMGS, gImgs)
}

function insertMemeInfo(memeObj){
    if (!gMeme) gMeme=[]
    gMeme.push(memeObj)
    saveToStorage(MEMES, gMeme)
}


function changeRow(imgNum){
    // work on the line order
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===+imgNum)
    gMeme[gMemeIdx].selectedLineIdx+=1
    if (gMeme[gMemeIdx].selectedLineIdx>gMeme[gMemeIdx].lines.length){
        gMeme[gMemeIdx].selectedLineIdx=0
    }
}

function updateMeme(key,value,imgId, line){
    // todo adjest to diftrent key
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===+imgId)
    gMeme[gMemeIdx].lines[line][key]=value
    saveToStorage(MEMES, gMeme)
}



function toTrash(imgNum){
    console.log('imgNum:', imgNum)
    gImgs=loadFromStorage(IMGS)
    gMeme=loadFromStorage(MEMES)

    const gImgsIdx=gImgs.findIndex(img=>img.id===+imgNum)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===+imgNum)

    gImgs.splice(gImgsIdx,1)
    gMeme.splice(gMemeIdx,1)


    saveToStorage(IMGS, gImgs)
    saveToStorage(MEMES, gMeme)
}


function canvasFunction (key, value,imgId){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===+imgId)
    const line=gMeme[gMemeIdx].selectedLineIdx
    if (key==='size'){
        console.log('in:')
    gMeme[gMemeIdx].lines[line][key]+=value
    }else{
    gMeme[gMemeIdx].lines[line][key]=value
    }
    saveToStorage(MEMES, gMeme)
}

function addRow(imgId){
    gMeme=loadFromStorage(MEMES)
    const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===+imgId)
    const numbersOflines=gMeme[gMemeIdx].lines.length
    let pos={}
    if (numbersOflines===0) {
        pos={h:2, w:10}
    }else if (numbersOflines===1 || numbersOflines>2){
        pos={h:2, w:2}
    } else if (numbersOflines===2){
        pos={h:2, w:0.1}
    }
    gMeme[gMemeIdx].lines.push({
        pos:pos,
        txt: "", 
        size: 20, 
        align: 'left', 
        color: 'red',
        strokColor:"white"
    }
    )
    gMeme[gMemeIdx].selectedLineIdx=gMeme[gMemeIdx].lines.length-1
    console.log('gMeme[gMemeIdx].Lines:', gMeme[gMemeIdx])
    saveToStorage(MEMES, gMeme)

}
// 


// need to work on
function updateKeyWord(words){
    gKeywordSearchCountMap=words
    saveToStorage('key_word', gKeywordSearchCountMap)
}

function getMemeById(num){
    gMeme=loadFromStorage(MEMES)
    const meme=gMeme.find(gMeme=>gMeme.selectedImgId===+num)
    return meme
}








function _deafultgImgs(){

    for (var i=1; i<18;i++){
        insertImg({
            id:i,
            url:`"/DOC/meme-imgs (square)/${i}.jpg"`,
            keywords:[keywords[getRandomIntInt(0, keywords.length-1)],keywords[getRandomIntInt(0, keywords.length-1)]]
        })
        insertMemeInfo({
            selectedImgId: i,
            selectedLineIdx: 0, 
            lines: [ 
                { 
                pos:{h:2, w:10},
                txt: 'I sometimes eat Falafel', 
                size: 20, 
                align: 'left', 
                color: 'red',
                strokColor:"white"
                } 
                ] 
               
        })
    }

}

function _deafultKeyWords(){
    return{
        "funny":12,
        'cat':4,
        'dog':15,
        'trump':5,
        'Israel':7,
        'Read':8,
        'HoloyKamoly':12
    }
}