import {ryver_notification} from "../../common/Ryver/RyverModal"
import {login_run} from "../../common/Ryver/RyverLogin"
import { ModObserver, AnsObserver } from "./Exports";
//import {subscribe, setAuth} from "../common/livemod"
import Notify from "../../common/Notifications/Notify";
import Extension from "../../../locales/en/localization.json"

if(localStorage.canUse === "true"){
  let perms = localStorage.getItem("userPerms").split(",")
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    ModObserver()
  }
  else if (perms.includes("32")){
    AnsObserver()
  }
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

// document.querySelector("html").insertAdjacentHTML("beforeend", "<textarea class = 'noswear'></textarea>");
// document.querySelector(".noswear").addEventListener("input", function(){
//   isProfanity((<HTMLInputElement>document.querySelector(".noswear")).value, function(t, blocked){
//     console.log(blocked)
//   }, "../../../configs/profanity.csv")
// });