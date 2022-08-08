
import {deleteUserBtn} from "./DelMenuExp"
import {show_recent_warnings} from "./RecentWarnings"
import {QuestionCount, CommentCount, AnswerLink} from "./UserBio"
import {manage_user} from "./ManageUser"

async function oldProfile(){
  let perms = localStorage.userPerms.split(",")

  AnswerLink()
  QuestionCount()
  CommentCount()

  if(perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    let uid = (<string>window.location.href).split("-")[1].split("/")[0];
    show_recent_warnings(uid)
  }

  if(perms.includes("3") || perms.includes("4")) deleteUserBtn();

  if (perms.includes("4")) manage_user();
}

if(localStorage.canUse === "true") oldProfile();