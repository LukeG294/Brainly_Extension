import {ryver_notification} from "../common/Ryver/ryver_modal"
import {login_run} from "../common/Ryver/ryver_login"
import { ModObserver, AnsObserver } from "./homepage_exports";
//import {subscribe, setAuth} from "../common/livemod"
import { checkUser, checkPermissionSet } from "../common/permission_system"

//@ts-ignore

async function homeperms(){
  let perms = await checkPermissionSet();
  if (perms.includes("5")){
    ModObserver()
  }
}
//checkUser("new", homeperms)
AnsObserver()
//if user does not have username and password in local storage
if(!localStorage.getItem("userAuth")){
  window.addEventListener("load", function(){
  document.querySelector("body").insertAdjacentHTML("afterbegin", ryver_notification())
  login_run();
  })
}


