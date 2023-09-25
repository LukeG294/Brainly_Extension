

import { get_feature_key_needed, main_control_permissions } from "configs/config";
import {show_recent_warnings, user_manager} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"
import { runCheck } from "../../../scripts/common/ModFunctions";



async function initialize(){
  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
 
  let permissions = main_control_permissions()

  AnswerLink()
  QuestionCount()
  CommentCount()
  runCheck(user_manager, await get_feature_key_needed("extension_permission_mgmt"), uid)
  
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")
  runCheck(show_recent_warnings, await get_feature_key_needed("show_recent_warnings"), uid)
  
}
initialize()

 


