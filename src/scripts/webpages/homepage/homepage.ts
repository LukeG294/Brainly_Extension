import {ryver_notification} from "../../common/Ryver/ryver_modal"
import {login_run} from "../../common/Ryver/ryver_login"
import { ModObserver, AnsObserver, HomeMod } from "./homepage_exports";
//import {subscribe, setAuth} from "../common/livemod"
import { mass_msg, mass_accdel, usr_mgmt } from "./homepage_admin";
import { showMessage } from "../../common/common_functions";

//@ts-ignore

async function homeperms(){
  let perms = localStorage.getItem("userPerms");
  if (perms.includes("5")){
    ModObserver()
  }
  if(perms.includes("10")){
    mass_msg()
  }
  if(perms.includes("11")){
    mass_accdel()
  }
  // if(perms.includes("14")){
  //   verification_queue()
  // }
  if(perms.includes("100")){
    usr_mgmt()
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


