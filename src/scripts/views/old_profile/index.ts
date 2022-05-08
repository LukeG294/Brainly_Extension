
import {add_del_menu, delete_user_btn} from "./DelMenuExp"
import {show_recent_warnings} from "./RecentWarnings"
import {insert_bio} from "./UserBio"
import {manage_user} from "./ManageUser"
//@ts-ignore

async function oldProfile(){
  insert_bio()
  let perms = localStorage.userPerms.split(",")
  if(perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    let uid = (<string>window.location.href).split("-")[1].split("/")[0];
    show_recent_warnings(uid)
  }
  if(perms.includes("3") || perms.includes("4")){ 
    delete_user_btn()
  }
  if (perms.includes("4")){
    manage_user()
  }
}

if(localStorage.canUse === "true"){
  oldProfile()
}