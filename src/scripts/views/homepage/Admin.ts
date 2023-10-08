
import { sendMessages } from "../../common/ModFunctions";
import User from "../../common/User"
import Form from "scripts/Items/Form"
import Notify from "../../common/Notifications/Notify";
import Label from "../../common/Notifications/Status"
import { macc_d, mmContentModal } from "../../Items/macc-d_exp"
import Extension from "../../../locales/en/localization.json"
import { CommentHandler, Question } from "../../common/Content"
import { insert_ticket } from "../../common/ModFunctions";
import { extension_server_url, parseQuestionLink } from "configs/config";
import insertDelMenu from "@lib/insertDelMenu";
import BrainlyAPI from "../../common/BrainlyAPI";

export default new class AdminPanel{
    constructor(){
        document.querySelector(".brn-moderation-panel__content .sg-content-box__title").insertAdjacentHTML("afterend", `<div class = "user-mgmt"></div>`)
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
export async function mass_accdel(){
    let firebase_presets = await fetch(`${extension_server_url()}/configs/preset_messages`).then(data => data.json())
    let items_array = []
    for (const [key, value] of Object.entries(firebase_presets)) {
        items_array.push(value)
    }
    console.log(items_array)
    document.querySelector("body").insertAdjacentHTML("afterbegin", macc_d(items_array));
    document.querySelector(".modal_close").addEventListener("click", function(){document.querySelector(".modal_back").remove()})
    
    document.querySelector(".presets").addEventListener("change", function(){
        let rsn = document.querySelector(".presets input:checked").getAttribute("value");
        (<HTMLInputElement>document.querySelector(".deletion-reason")).value = rsn;
    });
    /*
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
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
        } else {
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--valid")
        }
        
    })
    */
    document.querySelector(".add-user").addEventListener("click", async function(){
        
        //@ts-expect-error
        let linksArray = String(document.querySelector(".profile-links").value).split("\n")
        let error = false
        linksArray.forEach(async element => {
            let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
            if (regexString.test(element)) {
                let uid = String(element).split("/")[4].split("-")[1]
                let uname = String(element).split("/")[4].split("-")[0]
                let perms = (<HTMLInputElement>document.querySelector(".deletion-reason")).value
                chrome.runtime.sendMessage({ data: {"id":uid,"username":uname, "permissions":perms}, message:"add_user" }, function () {});
               
            } else { error = true }
        })
        if (error){
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            Notify.Flash("There was an error applying the permissions.","error")
        } else {
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--valid")
            Notify.Flash("The users have been added.","success")
        }
        
    })
    document.querySelector(".remove-user").addEventListener("click", async function(){
       
        //@ts-expect-error
        let linksArray = String(document.querySelector(".profile-links").value).split("\n")
        let error = false
        linksArray.forEach(async element => {
            let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
            if (regexString.test(element)) {
                let uid = String(element).split("/")[4].split("-")[1]
                let uname = String(element).split("/")[4].split("-")[0]
                chrome.runtime.sendMessage({ data: {"id":uid,"username":uname}, message:"remove_user" }, function () {});
            } else { error = true }
        })
        if (error){
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            Notify.Flash("There was an error removing the permissions.","error")
        } else {
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--valid")
            Notify.Flash("The users have been removed.","error")
        }
        
    })
    let input = document.querySelector(".deletion-reason");

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
        await sendMessages(usersToMsg, (<HTMLInputElement>document.querySelector(".deletion-reason")).value)
        if (error){
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            Notify.Flash("There was an error sending the messages.","error")
        } else {
            linksArray = []
            document.querySelector(".profile-links").classList.add("sg-textarea--valid")
            Notify.Flash("The messages were sent.","success")
            
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

        document.querySelector(".profile-links").addEventListener("input", async () => {
            
            let linksArray = []
            //@ts-expect-error
            linksArray = String(document.querySelector(".profile-links").value).split("\n")
            let error = false
            linksArray.forEach(async element => {
                let regexString = new RegExp(`https:\/\/brainly\.com\/question\/.*`)
                if (regexString.test(element)) {} else { error = true; }
            })
            if (error){
              
                var old_element = document.querySelector(".confirm-questions")
                var new_element = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(new_element, old_element);
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                document.querySelector(".confirm-questions").addEventListener("click",async function(){
                    let arr = (<HTMLInputElement>document.querySelector(".profile-links")).value.split("\n").map(item => {{return parseQuestionLink(item)}});
                    for (let index = 0; index < arr.length; index++) {
                        const delay = ms => new Promise(res => setTimeout(res, ms));
                        await delay(300)
                        let question = new Question()
                        await question.Confirm(parseInt(arr[index]))
                        
                    }
                })

                document.querySelector(".delete-questions").addEventListener("click",async function(){
                    let arr = (<HTMLInputElement>document.querySelector(".profile-links")).value.split("\n").map(item => {return parseQuestionLink(item)});
                    insertDelMenu(
                        document.querySelector(".warnpts"),
                        "tasks",
                        () => { return arr },
                        () => { return arr },
                        false
                    )
                })
                
            }
            let subjects = await fetch(`https://brainly.com/api/28/api_config/desktop_view`).then(data => data.json()).then(data => data.data.subjects);
            let arr = (<HTMLInputElement>document.querySelector(".profile-links")).value.split("\n").map(item => {return parseQuestionLink(item)});
           
            
            
        })
        
    })
}
export function verification_queue(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
        <li class="sg-menu-list__element verification-queue">   
            <a class = "sg-menu-list__link" href = "https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/extension/verification">${Extension.titles.verificationQueue}</a>
        </li>
    `)
}
export function firebase_append(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
        <li class="sg-menu-list__element">   
            <a class = "sg-menu-list__link" href = "https://console.firebase.google.com/u/0/project/brainly-extension/firestore/data/~2Fconfigurations~2Ffeature_keys" target=_blank >Extension Configuration</a>
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

export async function not_using_place_questions(){
    let selector = document.querySelector(".question-area")
            selector.innerHTML = ''
            //@ts-ignore
            selector.style.height = ""
            //@ts-ignore
            for (let index = 0; index < arr.length; index++) {
                //@ts-ignore
                const element = arr[index];
                
                //@ts-ignore
                await BrainlyAPI.GetQuestion(element).then(data => {
                    
                    if (!data.data.task.settings.is_deleted){
                        //@ts-ignore
                        let subject = subjects.find(element => element["id"] === data.data.task.subject_id).name
                        //@ts-ignore
                        let responses = data.data.responses
                        //@ts-ignore
                        selector.style.height = "400px"
                        selector.insertAdjacentHTML('beforeend',/*html*/`
                            <div class="question-md">
                                <div class="question-data">
                                    <div class="subject">Question <a href='https://brainly.com/question/${element}' target=_blank>#${element}</a> - ${subject}</div>
                                </div>
                                <div class="question-answers">
                                <div class="ticket-button">
                               
                                    <div class="modticket">
                                    <div class="sg-spinner-container__overlay">
                                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
                                    </div>
                                    <div class="contenticon shield">
                                        <svg viewBox="0 0 512 512" style="overflow: visible" id="icon-shield" xmlns="http://www.w3.org/2000/svg">
                                            <title>Moderate</title>
                                            <path fill-rule="evenodd" d="M256 448c-32 0-192-16-192-192V96c0-11 6-32 32-32h320c11 0 32 6 32 32v176c0 160-160 176-192 176zm128-320H256v256c102 0 128-85 128-128V128z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            `)
                        document.querySelector(".modticket").addEventListener("click",function(){
                            insert_ticket(data.data.task.id, document.querySelectorAll(".question-md")[index].querySelector(".modticket > .sg-spinner-container__overlay"));
                        })
                        responses.forEach(answerer => {
                            let findNick = data.users_data.find(element => element["id"] === answerer.user_id).nick
                            let ranks = data.users_data.find(element => element["id"] === answerer.user_id).ranks.names
                            let answer_info = document.createElement("div")
                            let approved = false
                            if (answerer.approved.approver){
                                approved = true
                            }
                            document.querySelectorAll(".question-answers")[index].appendChild(answer_info)
                            answer_info.innerHTML = `${answerer.user_id},${approved},${findNick}, ${ranks}`
                        
                        })
                    } else {
                        
                        selector.insertAdjacentHTML('beforeend',/*html*/`
                            <div class="question-md" style="background-color:#ffe8e5">
                               <div class="question-data">
                                    <div class="subject">Question <a href='https://brainly.com/question/${element}' target=_blank>#${element} - Deleted</a></div>
                                </div>
                                ${Form.Checkbox({
                                    id: element,
                                    text: ""
                                }).outerHTML
                                }
                             </div>
                            `)
                    }
                    
                    
                    
                })
               
                
              
                
                
            }
}