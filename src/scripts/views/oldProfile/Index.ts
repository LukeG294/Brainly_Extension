

import {show_recent_warnings, user_manager} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"




  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
 


  AnswerLink()
  QuestionCount()
  CommentCount()
  user_manager(uid)
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")

  show_recent_warnings(uid)


 


