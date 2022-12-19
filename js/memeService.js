'use strict'

// let gKeywordSearchCountMap
// let gImgs
// let gMeme
// const KEY_WORDS='key_word'
// let IMGS
// let MEMES
// const keywords=['Trump', 'Cat', 'Dog', 'Snake', 'Rat', 'Sunrise', 'Monopolly','NYS','TLV','Friends',
// 'Army', 'Queen']

// function initServiceEl(){
//     gImgs=[]
//     gMeme=[]
//     IMGS='imgs'
//     MEMES='memes'
// }



// function getImgs(){

//     if (!loadFromStorage(IMGS)){
//         gImgs=_deafultgImgs()
//     }else{
//         gImgs=loadFromStorage(IMGS)
//     }
//     return gImgs
// }


// function insertImg (imgObj){
//     gImgs.push(imgObj)
//     saveToStorage(IMGS, gImgs)
// }

// function insertMemeInfo(memeObj){
//     gMeme.push(memeObj)
//     saveToStorage(MEMES, gMeme)
// }


// function changeRow(imgNum){
//     // work on the line order
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgNum)
//     gMeme[gMemeIdx].selectedLineIdx+=1
//     console.log('gMeme[gMemeIdx].lines.length:', gMeme[gMemeIdx].lines.length)
//     console.log('gMeme[gMemeIdx].selectedLineIdx',gMeme[gMemeIdx].selectedLineIdx)
//     if (gMeme[gMemeIdx].selectedLineIdx>=gMeme[gMemeIdx].lines.length){
//         gMeme[gMemeIdx].selectedLineIdx=0
//     }
//     saveToStorage(MEMES, gMeme)
// }

// function updateMeme(key,value,imgId, line){
//     // todo adjest to diftrent key
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     // Object.keys(gMeme[gMemeIdx].lines).length === 0
//     if (gMeme[gMemeIdx].lines.length===0){
//         addRow(imgId)
//     }
//     gMeme[gMemeIdx].lines[line][key]=value
//     // TODO add length of the word
//     saveToStorage(MEMES, gMeme)
// }



// function toTrash(imgId){
//     gMeme=loadFromStorage(MEMES)

//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     if (gMeme[gMemeIdx].lines.length===0) return

//     const currectLine=gMeme[gMemeIdx].selectedLineIdx
//     gMeme[gMemeIdx].lines.splice(currectLine,1)

//     let newLine
//     if (gMeme[gMemeIdx].lines.length-1< currectLine){
//         if (gMeme[gMemeIdx].lines.length===0){newLine=0
//         }else{
//             newLine=gMeme[gMemeIdx].lines.length-1
//         }
//     }
//     gMeme[gMemeIdx].selectedLineIdx=newLine

//     saveToStorage(MEMES, gMeme)
// }


// function canvasFunction (key, value,imgId){
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     const line=gMeme[gMemeIdx].selectedLineIdx
//     if (key==='size'){
//     gMeme[gMemeIdx].lines[line][key]+=value
//     }else{
//     gMeme[gMemeIdx].lines[line][key]=value
//     }
//     saveToStorage(MEMES, gMeme)
// }

// function addRow(imgId, elmoji=false){
//     const canvas=getCanvasSize()
//     console.log('canvas:', canvas)
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     const numbersOflines=gMeme[gMemeIdx].lines.length
//     let pos={}
//     if (elmoji){pos={y:canvas.height/2, x:canvas.width/2}
//     } else if (numbersOflines===0) {
//         pos={y:canvas.height/9, x:canvas.width/2}
//     }else if (numbersOflines===1){
//         pos={y:canvas.height/1.1, x:canvas.width/2}
//     } else if (numbersOflines>=2){
//         pos={y:canvas.height/2, x:canvas.width/2}
//     }
//     console.log('pos:', pos)
//     gMeme[gMemeIdx].lines.push({
//         pos:pos,
//         onDrag:false,
//         txt: "", 
//         size: 40, 
//         align: 'center', 
//         color: `"${getRandomColor()}"`,
//         strokColor:`"${getRandomColor()}"`
//     }
//     )
//     gMeme[gMemeIdx].selectedLineIdx=gMeme[gMemeIdx].lines.length-1
//     console.log('gMeme[gMemeIdx].lines:', gMeme[gMemeIdx].lines)
//     saveToStorage(MEMES, gMeme)

// }
// // 


// // need to work on
// function updateKeyWord(words){
//     gKeywordSearchCountMap=words
//     saveToStorage('key_word', gKeywordSearchCountMap)
// }

// function getMemeById(num){
//     gMeme=loadFromStorage(MEMES)
//     const meme=gMeme.find(gMeme=>gMeme.selectedImgId===num)
//     return meme
// }
// function geImgtById(num){
//     gMeme=loadFromStorage(IMGS)
//     const meme=gMeme.find(gMeme=>gMeme.id===num)
//     return meme
// }

// function addEmoji(emoji, imgId){
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     addRow(imgId, true)
//     gMeme=loadFromStorage(MEMES)
//     const lineIdx=gMeme[gMemeIdx].selectedLineIdx
//     gMeme[gMemeIdx].lines[lineIdx].txt=emoji
//     saveToStorage(MEMES, gMeme)
// }



// function isTextClicked(clickedPos,imgId) {
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     if (gMeme[gMemeIdx].lines.length===0) return -1
   
//     const catchLine=gMeme[gMemeIdx].lines.findIndex(line=>
//         ((line.pos.x<=clickedPos.x &&  line.pos.x+line.size*line.txt.length/2>=clickedPos.x)&&
//         (line.pos.y>=clickedPos.y && line.pos.y-line.size<=clickedPos.y)
//        ))
    
//     if (catchLine>=0){
//         gMeme[gMemeIdx].selectedLineIdx=catchLine
//         saveToStorage(MEMES, gMeme)
//     }
//     return catchLine
// }

// function setWordDrag(imgId,isDrag) {
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     if  (gMeme[gMemeIdx].lines.length<1) return
//     gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].onDrag=isDrag
//     saveToStorage(MEMES, gMeme)
// }

// function changePos (imgId,pos){
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.x=pos.x
//     gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.y=pos.y
//     saveToStorage(MEMES, gMeme)
// }

// function isLineDrag(imgId){
//     gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     if (gMeme[gMemeIdx].lines.length===0) return
//     return gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].onDrag
// }

// function getPreLocation(imgId){
//     const gMeme=loadFromStorage(MEMES)
//     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
//     const xLoc=gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.x
//     const yLoc=gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.y
//     const loc={x:xLoc,y:yLoc}
//     return loc
// }


// // function moveCircle(imgId, pos) { 
// //     const gMeme=loadFromStorage(MEMES)
// //     const gMemeIdx=gMeme.findIndex(img=>img.selectedImgId===imgId)
// //     gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.x += pos.x
// //     gMeme[gMemeIdx].lines[gMeme[gMemeIdx].selectedLineIdx].pos.y += pos.y
// //     saveToStorage(MEMES, gMeme)
// // }


// function filterBySearch(txt){
//     if (!txt) return getImgs()
//     const txts=textFinder(txt)
//     const filterImg=getImgs().filter(img=>txts.some(t=>img.keywords.includes(t)))
//     return filterImg
// }

// // NOT RELEVENT FOR NOW
// function textFinder(txt){
//     txt=txt.toLowerCase()
//     const kWord=keywords
//     let words=kWord.map(word=>{
//         return word.toLowerCase()})
//     let retWord=words.filter(word=> word.startsWith(txt))
//     words=retWord.map(word=>{
//         return word[0].toUpperCase() + word.slice(1).toLowerCase()})
//     return words
    
// }

// function getKeywordsSearch(){
//         if (!loadFromStorage('key_word')){
//             gKeywordSearchCountMap=keywords
//         }else{
//             gKeywordSearchCountMap=loadFromStorage('key_word')
//         }
//         return gKeywordSearchCountMap
//     }

// function _deafultgImgs(){
//     for (var i=1; i<18;i++){
//         var randomid=makeId()
//         insertImg({
//             id:randomid,
//             url:`"img/meme-imgs (square)/${i}.jpg"`,
//             keywords:[keywords[getRandomIntInt(0, keywords.length-1)],keywords[getRandomIntInt(0, keywords.length-1)]]
//         })
//         insertMemeInfo({
//             selectedImgId: randomid,
//             selectedLineIdx: 0, 
//             lines: []
               
//         })
//     }
//     return gImgs
// }

// function _deafultKeyWords(){
//     return{
//         "funny":12,
//         'cat':4,
//         'dog':15,
//         'trump':5,
//         'Israel':7,
//         'Read':8,
//         'HoloyKamoly':12
//     }
// }