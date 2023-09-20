import {confirmButton, newTickets, requestApproval} from "./QuestionExports"

async function questionPage(){
 
  confirmButton()
  newTickets()
  
  requestApproval()
  
    
}


window.onload = function(){
  questionPage()
}
