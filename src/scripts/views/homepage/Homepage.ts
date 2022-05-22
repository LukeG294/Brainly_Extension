import {ryver_notification} from "../../common/Ryver/RyverModal"
import {login_run} from "../../common/Ryver/RyverLogin"
import { ModObserver, AnsObserver } from "./Exports";
import {AddContent} from "../../common/Preview/Functions"
//import {subscribe, setAuth} from "../common/livemod"

import Notify from "../../common/Notifications/Notify";
import Extension from "../../../locales/en/localization.json"

//@ts-ignore
async function homeperms(){
  let perms = localStorage.getItem("userPerms").split(",")
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    ModObserver()
  }
  else{
    AnsObserver()
  }
 
 
}
if(localStorage.canUse === "true"){
  homeperms()
}
else{
  Notify.Flash(Extension.common.unauthorized, "error")
}

//if user does not have username and password in local storage
if(!localStorage.getItem("userAuth")){
  window.addEventListener("load", function(){
  document.querySelector("body").insertAdjacentHTML("afterbegin", ryver_notification())
  login_run();
  })
}


