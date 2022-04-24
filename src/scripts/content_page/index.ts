import {addResponseButtons} from "./responses"
import {addTaskButtons} from "./tasks"
import {addticket} from "./button_functions"
import { getPermissions } from "../common/permission_system"




    //tasks page
    if(window.location.href.includes("task") || (!window.location.href.includes("responses") && !window.location.href.includes("comments_tr"))){
        addTaskButtons()
        console.log("taskpage")
    }

    //responses page
    if(window.location.href.includes("responses")){
        addResponseButtons()
    }

    //comments page
    if(window.location.href.includes("comments_tr")){

    }
    


//@ts-ignore
let data = document.querySelector(".show-all").href.split("/")[4].split("-")
let userData = {"nick":data[0], "id":data[1]}
let permsArr = []
async function checkPermissionSet(){
  let perms = await getPermissions(userData.nick, userData.id)
   permsArr = String(atob(perms)).split(",")
     
  if (permsArr.includes("6")){
    addticket()
  }
}

function checkUser(){
  var data = JSON.stringify({
    "username": userData.nick,
    "password": userData.id
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      let response = JSON.parse(this.responseText);
      if (response.statusCode !== 401){
        
         checkPermissionSet()
       
      }
    }
  });
  
  xhr.open("POST", "https://th-extension.lukeg294.repl.co/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}

checkUser()


