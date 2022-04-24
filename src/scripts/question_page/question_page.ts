
import {confirm_button} from "../common/confirm_button"
import {confirm_answer} from "../common/mod_functions"
import { getPermissions } from "../common/permission_system"
//@ts-ignore

let userData = JSON.parse(document.querySelector('meta[name="user_data"]').content)
let permsArr = []
async function checkPermissionSet(){
  let perms = await getPermissions(userData.nick, userData.id)
 
   permsArr = String(atob(perms)).split(",")
   if (permsArr.includes("9")){
    confirmButton()
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

function confirmButton(){
  function ConfirmButtonListener(number){
    document.getElementById("confirm"+number).addEventListener("click",function(){
      let answerIDs = JSON.parse(document.querySelector("#question-sg-layout-container > div.brn-qpage-layout.js-main-container.js-ads-screening-content > div.brn-qpage-layout__main.empty\\:sg-space-y-m.md\\:empty\\:sg-space-y-l > article").getAttribute("data-z"))
      let answerToConfirm = answerIDs["responses"][number]["id"]
      confirm_answer(answerToConfirm)
    })
  }
  
    
    let answers = document.querySelectorAll("div[data-testid = 'moderation_box_answer'] > div")
     
    for (let i = 0; i < answers.length; i++) {
      answers[i].insertAdjacentHTML("afterbegin", `<div id=confirm${i}>`+confirm_button()+`</div>`) //set the id of the confirm button to confirm0 or confirm1 for click events later
      ConfirmButtonListener(i) //add the event listener to the button
    } 
    
  
  
  
}
