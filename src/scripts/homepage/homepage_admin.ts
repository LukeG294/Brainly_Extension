
import { delete_user } from "../common/mod_functions";

import { showMessage } from "../common/common_functions";
import {macc_d} from "../common/macc-d_exp"

async function sendmsg(userLink){
    let token = localStorage.getItem("userAuth");
    let del_reason = (<HTMLInputElement>document.querySelector(".deletion-reason")).value;
    if(del_reason === ''){del_reason = "Not Provided"};
    //@ts-expect-error
    let mod_name = JSON.parse(document.querySelector('meta[name="user_data"]').content)["nick"]
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
**Deleted account**: ${userLink}
**Why**: ${del_reason}
###### **Moderator**: ${mod_name}`
                             
    })
    });
   
}

export function add_admin(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element macc-d">   
        <a class = "sg-menu-list__link">Mass-Account Deletion</a>
    </li>
    <li class="sg-menu-list__element mmsg-s">   
        <a class = "sg-menu-list__link">Mass-Message Users</a>
    </li>
    `)
    document.querySelector(".macc-d").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", macc_d());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
        
      
        document.querySelector(".presets").addEventListener("change", function(){
            let rsn = document.querySelector(".presets input:checked").getAttribute("reason");
            (<HTMLInputElement>document.querySelector(".deletion-reason")).value = rsn;
        });
        
        
        document.querySelector(".delete-acc").addEventListener("click", async function(){
            document.querySelector(".delete-acc .spinner-container").classList.add("show");
            //@ts-expect-error
            let linksArray = String(document.querySelector(".profile-links").value).split("\n")
            let error = false
            for (let index = 0; index < linksArray.length; index++) {
                const element = linksArray[index];
                let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
                if (regexString.test(element)) {
                   let uid = String(element).split("/")[4].split("-")[1]
                   await delete_user(uid)
                   await sendmsg(element);
                } else { error = true }
            }
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                
            }
            document.querySelector(".delete-acc .spinner-container").classList.remove("show");
        })
    })
}
