import { extension_server_url } from "configs/config";
import { runCheck } from "../../../scripts/common/ModFunctions";
import {confirmButton, newTickets, requestApproval} from "./QuestionExports"




async function questionPage(){
  let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
  runCheck(confirmButton,  key["question_page_confirm"])
  runCheck(newTickets,  key["question_page_ticket"])
  runCheck(requestApproval,  key["request_verification_button"])
  
 
  
    
}


window.onload = function(){
  questionPage()
}
