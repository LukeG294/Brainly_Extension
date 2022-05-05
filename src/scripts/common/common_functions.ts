/**
*
* @param {string} type Takes 3 values, success, error, info. Dhows default message if nothing provided
*
*/

import { Answer } from "./content";

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export function showMessage(
    message:string,
    type:string = ""
    ){
        let flashbox = document.querySelector(".flash-messages-container")? document.querySelector(".flash-messages-container"):document.querySelector("#flash-msg");
        if(type !== ""){
            type = "sg-flash__message--"+type;
        }
        let flashmsg = document.createElement("div");
        flashmsg.classList.add("sg-flash")
        flashmsg.innerHTML = /*html*/`
                <div class="sg-flash__message ${type}">
                    <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">${message}</div>
                </div>
        `;
        flashmsg.addEventListener("click", function(){flashmsg.remove();});
        flashbox.appendChild(flashmsg);

}
export function get_time_diff( dt ){
    var input = new Date( dt )
    let datetime = new Date(input.toLocaleString('en-US')).getTime()
  
    let now = new Date().getTime();
    let timediff = Math.abs(now - datetime)
    let datediff = Math.ceil(timediff / (1000 * 3600 * 24));
    let secdiff = Math.abs(timediff/(1000));
    let minutediff = timediff/(60*1000);
    let hourdiff = timediff/(60*60*1000);
    let daydiff = timediff/(24*60*60*1000);
    let monthdiff = timediff/(30*24*60*60*1000);
    let yeardiff = timediff/(365*24*60*60*1000);
  
    let str = ''
    if(minutediff < 1){
      return `${secdiff} seconds ago`
    }
    else if(minutediff < 60){
      if(Math.floor(minutediff) > 1){str = 's'}
      return `${Math.floor(minutediff)} minute${str} ago`
    }
    else if(minutediff >= 60 && minutediff < 1440){
      if(Math.floor(minutediff/60) > 1){str = 's'}
      return `${Math.floor(minutediff/60)} hour${str} ago`
    }
    else if(minutediff >= 1440 && minutediff < 43829){
      if(Math.floor(minutediff/1440) > 1){str = 's'}
      return `${Math.floor(minutediff/1440)} day${str} ago`
    }
    else if(minutediff >= 43829 && minutediff < 2592000){
      if(Math.floor(minutediff/43829) > 1){str = 's'}
      return `${Math.floor(minutediff/43829)} month${str} ago`
    }
    else if(minutediff >= 2592000 && minutediff < 31104000){
      if(Math.floor(minutediff/2592000) > 1){str = 's'}
      return `${Math.floor(minutediff/2592000)} year${str} ago`
    }
  }
