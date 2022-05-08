import {ryver_notification} from "../../common/Ryver/ryver_modal"
import {login_run} from "../../common/Ryver/ryver_login"
import { ModObserver, AnsObserver } from "./homepage_exports";
//import {subscribe, setAuth} from "../common/livemod"
import { mass_msg, mass_accdel, usr_mgmt, verification_queue } from "./homepage_admin";
import { showMessage } from "../../common/common_functions";

//@ts-ignore

async function homeperms(){
  let perms = localStorage.getItem("userPerms").split(",")
  if (perms.includes("1") || perms.includes("2") || perms.includes("3") || perms.includes("4")){
    ModObserver()
  }
  if(perms.includes("4")){
    mass_msg()
    mass_accdel()
    usr_mgmt()
  }
  if(perms.includes("5") || perms.includes("4")){
    verification_queue()
  }
  else{
    AnsObserver()
  }
 
}
if(localStorage.canUse === "true"){
  homeperms()
}
else{
  showMessage("You are not Authorised to use this Extension", "error")
}

//if user does not have username and password in local storage
if(!localStorage.getItem("userAuth")){
  window.addEventListener("load", function(){
  document.querySelector("body").insertAdjacentHTML("afterbegin", ryver_notification())
  login_run();
  })
}


