
import { sendMessages } from "../../common/ModFunctions";
import User from "../../common/User"

import Notify from "../../common/Notifications/Notify";
import Label from "../../common/Notifications/Status"
import { macc_d, mcompu, mmContentModal, mmsg_s } from "../../Items/macc-d_exp"
import Extension from "../../../locales/en/localization.json"
import { CommentHandler } from "../../common/Content"

import { parseQuestionLink } from "configs/config";
import insertDelMenu from "@lib/insertDelMenu";

export default new class AdminPanel{
    constructor(){
        document.querySelector(".brn-moderation-panel__content .sg-content-box__title").insertAdjacentHTML("afterend", `<div class = "user-mgmt"></div>`)
    }
    MassMsg(){
        document.querySelector(".user-mgmt").insertAdjacentHTML("afterbegin", /*html*/`
            <button class = "mass-msg panbut">
                <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-messages"></use></svg></div>
            </button>
        `);
        document.querySelector(".mass-msg").addEventListener("click", function(){mass_msg()})
    }
    Accdel(){
        document.querySelector(".user-mgmt").insertAdjacentHTML("afterbegin", /*html*/`
            <button class = "mass-accdel panbut">
            <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-profile_view"></use></svg></div>
            </button>
        `);
        document.querySelector(".mass-accdel").addEventListener("click", function(){mass_accdel()})
    }
}
export function mass_accdel(){
    document.querySelector("body").insertAdjacentHTML("afterbegin", macc_d());
    document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
    
    document.querySelector(".presets").addEventListener("change", function(){
        let rsn = document.querySelector(".presets input:checked").getAttribute("value");
        (<HTMLInputElement>document.querySelector(".deletion-reason")).value = rsn;
    });

    document.querySelector(".delete-acc").addEventListener("click", async function(){
        
        //@ts-expect-error
        let linksArray = String(document.querySelector(".profile-links").value).split("\n")
        let error = false
        linksArray.forEach(async element => {
            let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
            if (regexString.test(element)) {
                let uid = String(element).split("/")[4].split("-")[1]
                User.Delete(uid);
               
            } else { error = true }
        })
        if (error){
            document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
        } else {
            document.querySelector(".profile-links").classList.add("sg-textarea--valid")
        }
        
    })
}
export function mass_msg(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", mmsg_s());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
        
        
        document.querySelector(".presets").addEventListener("change", function(){
            let rsn = document.querySelector(".presets input:checked").getAttribute("value");
            (<HTMLInputElement>document.querySelector(".message-content")).value = rsn;
        });
        let input = document.querySelector(".message-content");

        // Init a timeout variable to be used below
        let timeout = null;

        // Listen for keystroke events
        input.addEventListener('keyup', function (e) {
            // Clear the timeout if it has already been set.
            // This will prevent the previous task from executing
            // if it has been less than <MILLISECONDS>
            clearTimeout(timeout);

            // Make a new timeout set to go off in 1000ms (1 second)
            timeout = setTimeout(function () {
                if (String((<HTMLInputElement>input).value).includes("{user}")){
                    //@ts-ignore
                    document.querySelector(".send-message").setAttribute("style","background-color:#6D83F3 !important")
                } else {
                    //@ts-ignore
                    document.querySelector(".send-message").setAttribute("style","background-color:#4FB3F6 !important")
                }
            }, 100);
        });
        document.querySelector(".send-message").addEventListener("click", async function(){
           
            //@ts-expect-error
            let linksArray = String(document.querySelector(".profile-links").value).split("\n")
            let error = false
            let usersToMsg = []
            linksArray.forEach(element => {
               
                let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
                if (regexString.test(element)) {
                    let uid = String(element).split("/")[4].split("-")[1]
                    let uname = String(element).split("/")[4].split("-")[0]
                    usersToMsg.push(uid+"-"+uname)
                } else { error = true }
            })
            await sendMessages(usersToMsg, (<HTMLInputElement>document.querySelector(".message-content")).value)
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                
            }
           
        })
}


export function md_content(){
    document.querySelector(".user-mgmt").insertAdjacentHTML("afterbegin", /*html*/`
            <button class = "mm-content panbut">
                <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-answer"></use></svg></div>
            </button>
        `);
  

    document.querySelector(".mm-content").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", mmContentModal());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})

        document.querySelector(".profile-links").addEventListener("input", () => {
            
            let arr = (<HTMLInputElement>document.querySelector(".profile-links")).value.split("\n").map(item => {return parseQuestionLink(item)});
            insertDelMenu(
                document.querySelector(".warnpts"),
                "tasks",
                () => { return arr },
                () => { return arr },
                false
            )
        })
    })
}
export function verification_queue(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
        <li class="sg-menu-list__element verification-queue">   
            <a class = "sg-menu-list__link" href = "https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/companion/verification">${Extension.titles.verificationQueue}</a>
        </li>
    `)
}
export function reportedCommentsDeleter(){
    document.querySelector(".user-mgmt").insertAdjacentHTML("afterbegin", /*html*/`
            <button class = "reported-comments-deleter panbut">
                <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-comment"></use></svg></div>
            </button>
        `);
   

    document.querySelector(".reported-comments-deleter").addEventListener("click", function(){
       async function removeComments(){
          
        let StoredToDelete = []
        //first page
        
        let OriginalResponse = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderation_new/get_comments_content`, {
            "body": `{\"subject_id\":0,\"category_id\":998,\"schema\":\"moderation.index\"}`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
            }).then(data => data.json())
        
        let OriginalLastId = OriginalResponse.data.last_id
        let FirstPageComments = OriginalResponse.data.items
        
        FirstPageComments.forEach(async element => {
            StoredToDelete.push(element.model_id)
        });
        fetchNextPage(OriginalLastId)
        let commentNum = new Label("commentNum")
        commentNum.Show("Fetched " + String(StoredToDelete.length)+ " reported comments...", "blue", true)
        //rest of pages
        async function fetchNextPage(last_id){
            let response = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/moderation_new/get_comments_content`, {
                "body": `{\"subject_id\":0,\"category_id\":998,\"schema\":\"moderation.index\",\"last_id\":${last_id}}`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
                }).then(data => data.json());
            let count = response.data.items.length
            let comments = response.data.items
            comments.forEach(async element => {
                StoredToDelete.push(element.model_id)
                commentNum.Update("Fetched " + String(StoredToDelete.length)+ " reported comments...")
            });
            
            if (response.data.last_id !== 0){
                fetchNextPage(response.data.last_id)
                
            } else {
                commentNum.Close();
                let delStat = new Label("delStat")
                delStat.Show(`0 deleted / 0 reserved / 0 cached / ${String(StoredToDelete.length)} fetched`, "red", true)

                let deleted = 0
                let cached = 0
                let reserved = 0
                
                for (let i = 0; i < StoredToDelete.length; i++) {
                    let commentObject = new CommentHandler()
                    
                    let resp = await commentObject.Delete(StoredToDelete[i], "Deleting all reported comments.", false)
                        //@ts-expect-error
                    if (resp.error === 'cached'){
                        cached += 1
                        //@ts-expect-error
                    } else if (resp.error === 'reserved'){
                        reserved += 1
                    } else {
                        deleted += 1
                    }
                    delStat.Update(`${deleted} deleted / ${reserved} reserved / ${cached} cached / ${String(StoredToDelete.length)} fetched`)
                    // await commentObject.Delete(StoredToDelete[i], "Deleting all reported comments.", false);
                }
                delStat.Close();
                Notify.Flash("All Comments Deleted Successfully!", "success")
            }
        }
    }

    Notify.Dialog("Delete all reported comments", "Are you sure you want to delete all reported comments in the moderate all queue? Clicking on 'Proceed' will start the process. Please make sure you don't close the tab until you are notified, or else the reported comments will be partially removed.", removeComments, true)
    });
}
