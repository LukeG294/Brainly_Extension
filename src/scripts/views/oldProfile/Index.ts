

import {show_recent_warnings} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"

import Components from "scripts/Items/Components"


  let uid = (<string>window.location.href).split("-")[1].split("/")[0];
 
  let perms = localStorage.userPerms.split(",")

  AnswerLink()
  QuestionCount()
  CommentCount()
  
  document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", "<div class = 'modMenu'></div>")
 

  show_recent_warnings(uid)
  

 


