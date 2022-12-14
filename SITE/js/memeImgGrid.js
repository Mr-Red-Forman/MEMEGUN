'use strict'

function renderImg(){
    const imgs=getImgs() 
    let strHTML=imgs.map(img=>`
    <img  class= "grid-Img imgid${img.id}" data-imgID="${img.id}" onclick="onImgClick(this)" onmouseover="onImgHover(this)"
    onmouseout=onMouseOut() src=${img.url} alt="${imgs.keywords}">
    `
    )
    console.log('strHTML:', strHTML)

    document.querySelector(".grid-container").innerHTML=strHTML.join('')

}

function onImgClick(img){
   console.log('click', img)
    
}

function onImgHover(img){
    const imgNumber=img.dataset.imgid
    const item=document.querySelector(`.imgid${imgNumber}`)
    item.classList.add("info")
    item.addEventListener('mouseout',onMouseOut(imgNumber))
}

function onMouseOut(imgNumber){
    console.log('imgNumber:', imgNumber)
    const item=document.querySelector(`.imgid${imgNumber}`)
    item.classList.remove("info")
    console.log('item:', document.querySelector(`.imgid${imgNumber}`))



}