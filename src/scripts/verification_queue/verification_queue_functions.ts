import {showMessage} from ".././common/common_functions"
import {Answer} from ".././common/content"
export async function removeAnswer(id, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch("https://th-extension.lukeg294.repl.co/answers/"+id,{method: "DELETE"})
  .then(response => response.json())

  if (!resp.statusCode){
    let item = button.parentElement.parentElement.parentElement
    button.classList.remove("show");
    item.style.opacity = '0.5'
    item.style.pointerEvents = 'none'
    
  } else {
    showMessage(resp.message,"error")
  }
    
}

export async function approveAnswer(id, answerId, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch("https://th-extension.lukeg294.repl.co/answers/"+id,{method: "DELETE"})
  .then(response => response.json())

  if (!resp.statusCode){
    let answer = new Answer()
    answer.Approve(answerId)
    let item = button.parentElement.parentElement.parentElement
    button.classList.remove("show");
    item.style.background = '#9CE8C2'
    item.style.pointerEvents = 'none'
    
  } else {
    showMessage(resp.message,"error")
  }
  
}

export async function loadNextPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
  //@ts-expect-error
    let currentPageDisplay = document.querySelector(".pagenum").innerText
    if (parseInt(currentPageDisplay) >= 0){
        let nextData = await fetch("https://TH-Extension.lukeg294.repl.co/get_next_page/"+currentPageDisplay)
        .then(response => response.json())
        //@ts-ignore
        document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) + 1
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
    if (parseInt(currentPageDisplay) >= 0){
        let prevData = await fetch("https://TH-Extension.lukeg294.repl.co/get_prev_page/"+currentPageDisplay)
        .then(response => response.json())
        //@ts-ignore
        document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) - 1
        //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return prevData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
    
    
}