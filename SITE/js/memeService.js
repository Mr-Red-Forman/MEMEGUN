'use strict'

let gKeywordSearchCountMap
let gImgs
// const KEY_WORDS='key_word'
const IMGS='imgs'

const keywords=['Trump', 'Cat', 'Dog', 'Snake', 'Rat', 'Sunrise', 'Monopolly','NYS','TLV','Friends',
'Army', 'Queen']


function textFinder(txt){
    txt=txt.toLowerCase()
    const kWord=getKeywords()
    let words=Object.keys(kWord).map(word=>{
        return word.toLowerCase()})
    let retWord=words.filter(word=> word.startsWith(txt))
    words=retWord.map(word=>{
        return word[0].toUpperCase() + word.slice(1).toLowerCase()})
    // return words
    
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
    if (!gImgs) gImgs=[]
    gImgs.push(imgObj)
    saveToStorage(IMGS, gImgs)


// add key word 
}

function _deafultgImgs(){

    for (var i=1; i<18;i++){
        insertImg({
            id:i,
            url:`"/DOC/meme-imgs (square)/${i}.jpg"`,
            keywords:[keywords[getRandomIntInt(0, keywords.length-1)],keywords[getRandomIntInt(0, keywords.length-1)]]
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

function getKeywords(){
    if (!loadFromStorage('key_word')){
        gKeywordSearchCountMap=_deafultKeyWords()
    }else{
        gKeywordSearchCountMap=loadFromStorage('key_word')
    }
    return gKeywordSearchCountMap
}


// need to work on
function updateKeyWord(words){
    gKeywordSearchCountMap=words
    saveToStorage('key_word', gKeywordSearchCountMap)
}

