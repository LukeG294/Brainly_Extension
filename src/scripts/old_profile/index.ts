import {add_del_menu, deletion_listener, preset_delrsn} from "./del_menu_exp"
import {show_recent_warnings} from "./recent_warnings"
import { getPermissions } from "../common/permission_system"



//@ts-ignore
let data = document.querySelector(".show-all").href.split("/")[4].split("-")
let userData = {"nick":data[0], "id":data[1]}
let permsArr = []
async function checkPermissionSet(){
  let perms = await getPermissions(userData.nick, userData.id)
   permsArr = String(atob(perms)).split(",")
  
  if (permsArr.includes("8")){
    let uid = window.location.href.split("-")[1].split("/")[0];


    show_recent_warnings(uid);
  }
  if(((localStorage.getItem("userAuth") && document.querySelector("span.pseudolink.show-form")) || document.querySelector("li.menu-element.profile.styled > a > img").getAttribute("title") === "TheSection")&& document.querySelector("div.info_top > span.ranking > h2 > a").innerHTML !== "Deleted account"){
    if (permsArr.includes("4")){
        insert_data()
      }
   
          
    
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


function insert_data(){
    document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", /*html*/`
        <button class="sg-button sg-button--m sg-button--outline sg-button--icon-only user-del-btn">
            <span class="sg-button__icon sg-button__icon--m">
            <div class="sg-icon sg-icon--dark sg-icon--x32" style="height: 26px;width: 26px;">
                <svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg>
            </div><div class="mint-label__text" style="font-size: 13px;color: rgb(255, 121, 104);">delete user</div>
            </span>
        </button>
    `)
    document.querySelector(".user-del-btn").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", <string>add_del_menu())
        preset_delrsn()
        deletion_listener()
        document.querySelector(".modal_close").addEventListener("click", function(){
            document.querySelector(".modal_back").remove()
        });
    });
}



