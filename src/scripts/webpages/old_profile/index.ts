import {add_del_menu, delete_user_btn} from "./del_menu_exp"
import {show_recent_warnings} from "./recent_warnings"
//import { getPermissions, checkUser, checkPermissionSet } from "../common/permission_system"

//@ts-ignore

async function oldProfile(){
    let perms = localStorage.userPerms
    if(perms.includes("8")){
      let uid = (<string>window.location.href).split("-")[1].split("/")[0];
      show_recent_warnings(uid)
    }
    if(perms.includes("4")){
      delete_user_btn()
    }
}

if(localStorage.canUse === "true"){
  oldProfile()
}