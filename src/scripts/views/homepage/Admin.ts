
import { sendMessages } from "../../common/ModFunctions";
import User from "../../common/User"
import { startCompanionManager } from "../../common/Management";
import Notify from "../../common/Notifications/Notify";
import Label from "../../common/Notifications/Status"
import {macc_d, mcompu, mmContentModal, mmsg_s} from "../../HTML_exports/macc-d_exp"
import Extension from "../../../locales/en/localization.json"
import {CommentHandler, Question} from "../../common/Content"
import Ryver from "../../common/Ryver/Ryver";

//@ts-ignore
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
async function sendmsg(userLink){
    let del_reason = (<HTMLInputElement>document.querySelector(".deletion-reason")).value;
    if(del_reason === ''){del_reason = "Not Provided"};
    //@ts-expect-error
    let mod_name = JSON.parse(document.querySelector('meta[name="user_data"]').content)["nick"]
    let message = `---
    **Deleted account**: ${userLink}
**Why**: ${del_reason}
###### **Moderator**: ${mod_name}`
    Ryver.Message('1291498', message, "workrooms")
}
export function mass_accdel(){
    document.querySelector("body").insertAdjacentHTML("afterbegin", macc_d());
    document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
    
    document.querySelector(".presets").addEventListener("change", function(){
        let rsn = document.querySelector(".presets input:checked").getAttribute("reason");
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
                await sendmsg(element);
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
            let rsn = document.querySelector(".presets input:checked").getAttribute("reason");
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
export function usr_mgmt(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element mcomp-u">   
    <a class = "sg-menu-list__link">${Extension.titles.manageUsers}</a>
    </li>
    
    `)

    document.querySelector(".mcomp-u").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", mcompu());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
        startCompanionManager()
        
    })
}
export function brainly_tools(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element mcomp-u">   
    <a class = "sg-menu-list__link" href='https://brainly.com/tools/moderation'>Brainly Tools</a>
    </li>`)
    
}
export function verification_queue(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
        <li class="sg-menu-list__element verification-queue">   
            <a class = "sg-menu-list__link" href = "https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/companion/verification">${Extension.titles.verificationQueue}</a>
        </li>
    `)
}
export function md_content(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element mm-content">   
        <a class = "sg-menu-list__link">${Extension.titles.massManageContent}</a>
    </li>
    `)

    document.querySelector(".mm-content").addEventListener("click", function(){
        document.querySelector("body").insertAdjacentHTML("afterbegin", mmContentModal());
        document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
        // Init a timeout variable to be used below
        let timeout = null;

        
        document.querySelector(".delete-content").addEventListener("click", async function(){
           
            //@ts-expect-error
            let linksArray = String(document.querySelector(".profile-links").value).split("\n")
            let error = false
            let usersToMsg = []
            for (let index = 0; index < linksArray.length; index++) {
                const element = linksArray[index];
                let regexString = new RegExp(`https:\/\/brainly\.com\/question\/.*-.*`)
                let qid = String(element).split("/")[4]
              
                usersToMsg.push(qid)
               
            }
            document.querySelector(".delete-content .spinner-container").classList.add("show")
            usersToMsg.forEach(async element => {
                
                let question = await new Question();
                console.log(element)
                //@ts-ignore
                let warnUser = document.getElementById("warn").checked
                 //@ts-ignore
                let takePts = document.getElementById("pts").checked;
                let givePts = true;
                //let givePts = (<HTMLInputElement>document.getElementById("res-pts")).checked;
                 //@ts-ignore
                let reason = document.querySelector(".message-content").value
                
                await question.Delete(element, reason, warnUser, takePts, givePts)
            });
         
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                document.querySelector(".delete-content .spinner-container").classList.remove("show")
                
            }
           
        })
        document.querySelector(".confirm-content").addEventListener("click", async function(){
           
            //@ts-expect-error
            let linksArray = String(document.querySelector(".profile-links").value).split("\n")
            let error = false
            let usersToMsg = []
            for (let index = 0; index < linksArray.length; index++) {
                const element = linksArray[index];
                let regexString = new RegExp(`https:\/\/brainly\.com\/question\/.*-.*`)
                let qid = String(element).split("/")[4].split("?")[0]
              
                usersToMsg.push(qid)
               
            }
            document.querySelector(".confirm-content .spinner-container").classList.add("show")
            usersToMsg.forEach(async element => {
                
                let question = await new Question();
                await question.Confirm(parseInt(element))
            });
         
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                document.querySelector(".confirm-content .spinner-container").classList.remove("show")
                
            }
           
        })
    })
}
export function reportedCommentsDeleter(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element reported-comments-deleter">   
        <a class = "sg-menu-list__link">${Extension.titles.reportedCommentsDeleter}</a>
    </li>
    `)

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
        Label.Show("Fetched " + String(StoredToDelete.length)+ " reported comments...", "blue", true)
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
                Label.Update("Fetched " + String(StoredToDelete.length)+ " reported comments...","blue", true)
            });
            
            if (response.data.last_id !== 0){
                fetchNextPage(response.data.last_id)
                
            } else {
                Label.Update(`0 deleted / 0 reserved / 0 cached / ${String(StoredToDelete.length)} fetched`, "red", true)

                let deleted = 0
                let cached = 0
                let reserved = 0
                
                for (let i = 0; i < StoredToDelete.length; i++) {
                    let commentObject = new CommentHandler()
                    
                    let resp = await commentObject.Delete(StoredToDelete[i], "Deleting all reported comments.", false)
                    console.log(resp)
                        //@ts-expect-error
                    if (resp.error === 'cached'){
                        
                        cached += 1
                       
                        
                        //@ts-expect-error
                    } else if (resp.error === 'reserved'){
                       
                        reserved += 1
                    } else {
                       
                        deleted += 1
                    }
                    Label.Update(`${deleted} deleted / ${reserved} reserved / ${cached} cached / ${String(StoredToDelete.length)} fetched`,"red", true)
                    // await commentObject.Delete(StoredToDelete[i], "Deleting all reported comments.", false);
                }
                
            }
        }
    }

    Notify.Dialog("Delete all reported comments", "Are you sure you want to delete all reported comments in the moderate all queue? Clicking on 'Proceed' will start the process. Please make sure you don't close the tab until you are notified, or else the reported comments will be partially removed.", removeComments)
    });
}
