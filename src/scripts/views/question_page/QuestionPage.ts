import {newTickets, requestApproval} from "./QuestionExports"

async function questionPage(){
  let perms = localStorage.userPerms
  
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
      newTickets()
  }
  
  if (perms.includes("5")) requestApproval()
}

if(localStorage.canUse === "true"){
  window.onload = function(){
  questionPage()
  }
}
