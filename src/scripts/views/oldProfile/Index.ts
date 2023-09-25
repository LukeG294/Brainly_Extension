

import { main_control_permissions } from "configs/config";
import {show_recent_warnings, user_manager} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"
import { runCheck } from "../../../scripts/common/ModFunctions";



  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
 
  let {Administrator, Moderator} = main_control_permissions()

  AnswerLink()
  QuestionCount()
  CommentCount()
  runCheck(user_manager, Administrator, uid)
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")

  show_recent_warnings(uid)


 


