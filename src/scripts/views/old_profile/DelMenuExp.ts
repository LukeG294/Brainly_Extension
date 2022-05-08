import { delete_user } from "../../common/ModFunctions";
import Extension from "../../../locales/en/localization.json"
export function add_del_menu(){
    return /*html*/`
        <div class="modal_back">
            <div class="modal-accdel">
                <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div></div>
            <div class = "modal_close">
                <div class="sg-icon sg-icon--dark sg-icon--x32">
                    <svg class="sg-icon__svg"><use xlink:href="#icon-close"></use></svg>
                </div>
            </div>
            <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">Delete User</h1>
            <div class="content">
                <textarea placeholder="Add Reason Here" class="sg-textarea sg-textarea--tall del-rsn"></textarea>
                <div class="presets">
                    <label class="sg-radio sg-radio--xxs" for="links">
                        <input type="radio" class="sg-radio__element" name="group1" id="links" reason = "Link Spammer">
                        <span class="sg-radio__ghost" aria-hidden="true"></span>
                        <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Link spammer</span>
                    </label>
                    <label class="sg-radio sg-radio--xxs" for="alt">
                        <input type="radio" class="sg-radio__element" name="group1" id="alt" reason = "Alternate Accounts">
                        <span class="sg-radio__ghost" aria-hidden="true"></span>
                        <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Alt Accounts</span>
                    </label>
                    <label class="sg-radio sg-radio--xxs" for="username">
                        <input type="radio" class="sg-radio__element" name="group1" id="username" reason = "Inappropriate Username">
                        <span class="sg-radio__ghost" aria-hidden="true"></span>
                        <span class="sg-text sg-text--small sg-text--bold sg-radio__label">Inappropriate Username</span>
                    </label>
                </div>
                <button class="sg-button sg-button--m sg-button--solid-light delete-acc"><span class="sg-button__text">Delete!</span></button>
            </div>
            </div>
        </div>
    `
}
async function sendmsg(){
    let token = localStorage.getItem("userAuth");
    let del_reason = (<HTMLInputElement>document.querySelector(".modal-accdel .del-rsn")).value;
    if(del_reason === ''){del_reason = "Not Provided"};
    let mod_name = document.querySelector(".menu-element.profile.styled > a > span:nth-child(2)").innerHTML
    await fetch('https://brainlyus.ryver.com/api/1/odata.svc/workrooms(1291498)/Chat.PostMessage()', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' +token
        },
        body: JSON.stringify({
      "createSource": {
        "avatar": "https://camo.githubusercontent.com/30eb9e12b3f4f08d458a18dd5357be53348530ad1be7ca65b422e07083445790/68747470733a2f2f636f6e746174746166696c65732e73332e75732d776573742d312e616d617a6f6e6177732e636f6d2f746e7432393834362f6e75476d4f73676856485539555a7a2f506173746564253230496d61676525334125323044656325323038253243253230323032312532302d2532303225334133392533413135616d",
        "displayName": "Brainly Companion"
      },
      "body":
        `---
**Deleted account**: ${window.location.href}
**Why**: ${del_reason}
###### **Moderator**: ${mod_name}`
                             
    })
    });
    location.reload()
}
function check_deletion(uid:string):any{
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", async function() {
          if(this.readyState === 4) {
              let response = this.responseText;
              var parser = new DOMParser();
              var htmldoc = parser.parseFromString(response, "text/xml");
              return (htmldoc.querySelector("title").innerHTML.split("-")[1] === " User's profile :deleted" ? true : false)
          }
        });
    xhr.open("GET","https://brainly.com/profile/user-"+uid);
    xhr.send()
}
function preset_delrsn(){
    document.querySelector(".presets").addEventListener("change", function(){
        let rsn = document.querySelector(".presets input:checked").getAttribute("reason");
        (<HTMLInputElement>document.querySelector(".modal-accdel .del-rsn")).value = rsn;
    });
}
function deletion_listener(){
    document.querySelector(".modal-accdel .delete-acc").addEventListener("click", async function(){
        let uid = document.querySelector("#main-left > div.personal_info > div.header > div.info > div.info_top > span.ranking > h2 > a").getAttribute("href").split("-")[1]
        document.querySelector(".modal-accdel .spinner-container").classList.add("show");
        await delete_user(uid);
            await sendmsg();
        document.querySelector(".modal-accdel .spinner-container").classList.remove("show");
    })
}
export function delete_user_btn(){
    document.querySelector(".mod-profile-panel").insertAdjacentHTML("beforeend", /*html*/`
        <button class="sg-button sg-button--m sg-button--outline sg-button--icon-only user-del-btn">
            <span class="sg-button__icon sg-button__icon--m">
            <div class="sg-icon sg-icon--dark sg-icon--x32" style="height: 26px;width: 26px;">
                <svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg>
            </div><div class="mint-label__text" style="font-size: 13px;color: rgb(255, 121, 104);">${Extension.buttons.deleteUser}</div>
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