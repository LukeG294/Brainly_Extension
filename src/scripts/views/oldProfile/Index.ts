

import { extension_server_url, main_control_permissions } from "configs/config";
import {approveAll, rateAllFive, show_recent_warnings, user_manager, unapproveAll, OldObserver, quick_deleter} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"
import { runCheck } from "../../../scripts/common/ModFunctions";



async function initialize(){
  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
  let key = await fetch(`${extension_server_url()}/configs/feature_keys`).then(data => data.json())
  
  AnswerLink()
  QuestionCount()
  CommentCount()
  runCheck(user_manager, key["extension_permission_mgmt"], uid)
  
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")
  runCheck(show_recent_warnings, key["show_recent_warnings"], uid)
  runCheck(approveAll, key["admin_approve_all"])
  runCheck(unapproveAll, key["admin_unapprove_all"])
  runCheck(rateAllFive, key["rate_all_answers_five_stars"])
  runCheck(OldObserver, key["old_profile_tickets"])
  runCheck(quick_deleter, key["old_profile_quick_delete"])

}
initialize()

 


