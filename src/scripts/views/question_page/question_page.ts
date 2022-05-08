import {confirmButton, requestApproval} from "./question_exports"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("9")){
    window.onload = function(){
      confirmButton()
    }
    
  }
  if (perms.includes("13")){
    window.onload = function(){
      requestApproval()
    }
  }
  
  
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
