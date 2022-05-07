import {showMessage} from "../common/common_functions"
import {Answer} from "../common/content"

export async function loadNextPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
  //@ts-expect-error
    let currentPageDisplay = parseInt(document.querySelector(".pagenum").innerText)
    if (currentPageDisplay >= 0){
        let nextData = await fetch("https://TH-Extension.lukeg294.repl.co/get_next_page/"+String(currentPageDisplay))
        .then(response => response.json())
        //@ts-ignore
       
        if (!nextData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) + 1
          //@ts-ignore
          
        } 
         //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return nextData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
}

export async function loadPrevPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
    //@ts-expect-error
    let currentPageDisplay = document.querySelector(".pagenum").innerText
    if (parseInt(currentPageDisplay) > 1){
        let prevData = await fetch("https://TH-Extension.lukeg294.repl.co/get_prev_page/"+currentPageDisplay)
        .then(response => response.json())
        if (!prevData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) + 1
          //@ts-ignore
          
        } 
        //@ts-ignore
        document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) - 1
        //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return prevData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
    
    
}