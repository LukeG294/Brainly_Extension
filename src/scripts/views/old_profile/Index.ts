
import {add_del_menu, delete_user_btn} from "./DelMenuExp"
import {show_recent_warnings} from "./RecentWarnings"
import {add_answer_link, add_comment_count, add_question_count, insert_bio} from "./UserBio"
import {manage_user} from "./ManageUser"
//@ts-ignore

async function oldProfile(){
  let perms = localStorage.userPerms.split(",")

  add_answer_link()
  add_question_count()
  add_comment_count()

  if(perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    let uid = (<string>window.location.href).split("-")[1].split("/")[0];
    show_recent_warnings(uid)
  }

  if(perms.includes("3") || perms.includes("4")) delete_user_btn();

  if (perms.includes("4")) manage_user();
}

if(localStorage.canUse === "true") oldProfile();