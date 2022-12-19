'use strict'
let gKeywordSearchCountMap

const keywords=['Trump', 'Cat', 'Dog', 'Snake', 'Rat', 'Sunrise', 'Monopolly','NYS','TLV','Friends',
'Army', 'Queen']

function updateKeyWord(words){
    gKeywordSearchCountMap=words
    saveToStorage('key_word', gKeywordSearchCountMap)
}

function filterBySearch(txt){
    if (!txt) return getImgs()
    const txts=textFinder(txt)
    const filterImg=getImgs().filter(img=>txts.some(t=>img.keywords.includes(t)))
    return filterImg
}

function textFinder(txt){
    txt=txt.toLowerCase()
    const kWord=keywords
    let words=kWord.map(word=>{
        return word.toLowerCase()})
    let retWord=words.filter(word=> word.startsWith(txt))
    words=retWord.map(word=>{
        return word[0].toUpperCase() + word.slice(1).toLowerCase()})
    return words
}

function getKeywordsSearch(){
    if (!loadFromStorage('key_word')){
        gKeywordSearchCountMap=keywords
    }else{
        gKeywordSearchCountMap=loadFromStorage('key_word')
    }
    return gKeywordSearchCountMap
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