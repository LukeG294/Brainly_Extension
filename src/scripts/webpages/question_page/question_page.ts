import {confirmButton, requestApproval} from "./question_exports"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1")){
    window.onload = function(){
      confirmButton()
    }
    
  }
  let user = await fetch("https://brainly.com/api/28/api_users/me").then(data => data.json())
  let num = user.data.user_category
  

  if (perms.includes("5") && num === 100){
    window.onload = function(){
      requestApproval()
    }
  }
  
  
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
