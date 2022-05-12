
import {confirmButton, newTickets, requestApproval} from "./QuestionExports"
//@ts-ignore
import Extension from "../../../locales/en/localization.json"
async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    window.onload = function(){
      //confirmButton()
      newTickets()
    }
    
  }
  let user = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_users/me`).then(data => data.json())
  let num = user.data.user.mod_actions_count
  

  if (perms.includes("5") && !num){
  
    
      requestApproval()
    
  }
  
  
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
