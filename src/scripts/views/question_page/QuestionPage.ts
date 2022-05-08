
import {confirmButton, requestApproval} from "./QuestionExports"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    window.onload = function(){
      confirmButton()
    }
    
  }
  let user = await fetch(`https://brainly.com/api/28/api_users/me`).then(data => data.json())
  let num = user.data.user.mod_actions_count
  

  if (perms.includes("5") && !num){
  
    
      requestApproval()
    
  }
  
  
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
