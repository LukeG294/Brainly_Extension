import { brainly_legacy_api_url } from "configs/config"
import {confirmButton, requestApproval} from "./question_exports"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    window.onload = function(){
      confirmButton()
    }
    
  }
  let user = await fetch(`${brainly_legacy_api_url()}/api_users/me`).then(data => data.json())
  let num = user.data.user_category
  

  if (perms.includes("5") && num === 100){
  
    
      requestApproval()
    
  }
  
  
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
