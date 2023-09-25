import { runCheck } from "../../../scripts/common/ModFunctions";
import {confirmButton, newTickets, requestApproval} from "./QuestionExports"
import { get_feature_key_needed } from "configs/config";

async function questionPage(){
  runCheck(confirmButton,  await get_feature_key_needed("question_page_confirm"))
  runCheck(newTickets,  await get_feature_key_needed("question_page_ticket"))
  runCheck(requestApproval,  await get_feature_key_needed("request_verification_button"))
  
 
  
    
}


window.onload = function(){
  questionPage()
}
