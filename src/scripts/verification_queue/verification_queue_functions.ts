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