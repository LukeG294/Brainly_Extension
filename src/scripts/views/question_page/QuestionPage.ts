import {confirmButton, newTickets, requestApproval} from "./QuestionExports"
import Extension from "../../../locales/en/localization.json"

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    window.onload = function(){
      //confirmButton()
      newTickets()
    }
  }
  
  if (perms.includes("5")){requestApproval()}
}

if(localStorage.canUse === "true"){
  
  questionPage()
}
