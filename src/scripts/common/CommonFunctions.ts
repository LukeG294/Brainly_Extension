/**
*
* @param {string} type Takes 3 values, success, error, info. Dhows default message if nothing provided
*
*/
import BrainlyAPI from "./BrainlyAPI"
import { Answer } from "./Content";
import Extension from "../../locales/en/localization.json"

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
      return `${secdiff} ${Extension.times.seconds} ${Extension.times.ago}`
    }
    else if(minutediff < 60){
      if(Math.floor(minutediff) > 1){str = 's'}
      return `${Math.floor(minutediff)} ${Extension.times.minute}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 60 && minutediff < 1440){
      if(Math.floor(minutediff/60) > 1){str = 's'}
      return `${Math.floor(minutediff/60)} ${Extension.times.hour}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 1440 && minutediff < 43829){
      if(Math.floor(minutediff/1440) > 1){str = 's'}
      return `${Math.floor(minutediff/1440)} ${Extension.times.day}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 43829 && minutediff < 2592000){
      if(Math.floor(minutediff/43829) > 1){str = 's'}
      return `${Math.floor(minutediff/43829)} ${Extension.times.month}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 2592000 && minutediff < 31104000){
      if(Math.floor(minutediff/2592000) > 1){str = 's'}
      return `${Math.floor(minutediff/2592000)} ${Extension.times.year}${str} ${Extension.times.ago}`
    }
  }
export function OpenDialog(heading, content, confirmfn){
  document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
    <div class="js-dialog sg-dialog__overlay sg-dialog__overlay--scroll sg-dialog__overlay--open" style="z-index: 999;">
      <div tabindex="0"></div><div role="dialog" class="sg-dialog__container sg-dialog__container--size-m sg-dialog__container--open" aria-modal="true" tabindex="-1">
       
        <div class="sg-dialog__header" id="dialog-header">
          <div class="sg-flex sg-flex--margin-bottom-m">
            <h1 class="sg-headline">${heading}</h1>
          </div>
        </div>
        <div class="sg-dialog__body">
          <div class="sg-flex sg-flex--margin-bottom-m">${content}</div>
          <div class="sg-flex sg-flex--justify-content-flex-end sg-space-x-s">
            <button class="sg-button sg-button--m sg-button--outline" onclick = "document.querySelector('.js-dialog').remove()"><span class="sg-button__text">cancel</span></button>
            <button class="sg-button sg-button--m sg-button--solid returnfun"><span class="sg-button__text">proceed</span></button>
          </div>
        </div>
      </div>
    <div tabindex="0">
    </div>
  </div>`)

  document.querySelector(".js-dialog .returnfun").addEventListener("click", () => {
    document.querySelector(".js-dialog").remove()
    confirmfn()
  });
}
export function ShowLoading(message:string, type:string){
  if (type === "fetching"){
    document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
    <div class="sg-label sg-label--blue-20 displayMessage" style = "position: fixed;right: 0;bottom: 0;margin: 24px;z-index: 999;">
      <div class="sg-spinner sg-spinner--gray-70 sg-spinner--small" style="height: 16px;width: 16px;"></div>
      <div class="sg-text sg-text--text-black sg-text--small sg-text--bold sg-label__text tabMessage" style="margin-left: 8px;">${message}</div>
    </div>`)
  }
  if (type === "handling"){
    document.querySelector("body").insertAdjacentHTML("afterbegin", /*html*/`
    <div class="sg-label sg-label--indigo-20 displayMessage" style = "position: fixed;right: 0;bottom: 0;margin: 24px;z-index: 999;">
      <div class="sg-spinner sg-spinner--gray-70 sg-spinner--small" style="height: 16px;width: 16px;"></div>
      <div class="sg-text sg-text--text-black sg-text--small sg-text--bold sg-label__text tabMessage" style="margin-left: 8px;">${message}</div>
    </div>`)
  }
 
}

export function UpdateLoading(message:string, remove:boolean){
  if (remove){
    document.querySelector('.displayMessage').remove();
  } else {
    document.querySelector('.tabMessage').innerHTML = message
  }
  
}
