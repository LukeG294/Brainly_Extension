
import { delete_user, sendMessages, startCompanionManager } from "../../common/ModFunctions";
import { showMessage, OpenDialog } from "../../common/CommonFunctions";
import {macc_d, mcompu, mmContentModal, mmsg_s} from "../../HTML_exports/macc-d_exp"
import Extension from "../../../locales/en/localization.json"
import {CommentHandler, Question} from "../../common/Content"

//@ts-ignore

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

export function mass_accdel(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element macc-d">   
        <a class = "sg-menu-list__link">${Extension.titles.massAccountDeleter}</a>
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
          
        })
    })
}
export function mass_msg(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
    <li class="sg-menu-list__element mmsg-s">   
    <a class = "sg-menu-list__link">${Extension.titles.massMessageUsers}</a>
    </li>
    
    `)

    document.querySelector(".mmsg-s").addEventListener("click", function(){
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
            for (let index = 0; index < linksArray.length; index++) {
                const element = linksArray[index];
                let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
                if (regexString.test(element)) {
                    let uid = String(element).split("/")[4].split("-")[1]
                    let uname = String(element).split("/")[4].split("-")[0]
                    usersToMsg.push(uid+"-"+uname)
                } else { error = true }
            }
            await sendMessages(usersToMsg, (<HTMLInputElement>document.querySelector(".message-content")).value)
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                
            }
           
        })
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


export function verification_queue(){
    document.querySelector(".brn-moderation-panel__list > ul > li:nth-child(1)").insertAdjacentHTML("afterend", /*html*/`
        <li class="sg-menu-list__element verification-queue">   
            <a class = "sg-menu-list__link" href = "https://brainly.com/companion/verification">${Extension.titles.verificationQueue}</a>
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
                let qid = String(element).split("/")[4].split("?")[0]
              
                usersToMsg.push(qid)
               
            }
            document.querySelector(".delete-content .spinner-container").classList.add("show")
            usersToMsg.forEach(async element => {
                
                let question = await new Question();
                console.log(element)
                //@ts-ignore
                let warnUser = document.getElementById("warn").checked
                 //@ts-ignore
                let takePts = document.getElementById("pts").checked
                 //@ts-ignore
                let reason = document.querySelector(".message-content").value
                
                await question.Delete(element, reason, warnUser, takePts)
            });
         
            if (error){
                document.querySelector(".profile-links").classList.add("sg-textarea--invalid")
            } else {
                document.querySelector(".profile-links").classList.add("sg-textarea--valid")
                document.querySelector(".delete-content .spinner-container").classList.remove("show")
                
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

           document.querySelector(".delete-comments .spinner-container").classList.add("show")
            //first page
            let finalCount = 0
            let OriginalResponse = await fetch("https://brainly.com/api/28/moderation_new/index", {
            "body": "{\"subject_id\":0,\"category_id\":0,\"schema\":\"moderation.index\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
            }).then(data => data.json());
            
            let OriginalCount = OriginalResponse.data.items.length
            document.getElementById('fetched-count').innerText = OriginalCount
            let OriginalLastId = OriginalResponse.data.last_id
            let FirstPageComments = OriginalResponse.data.items
            FirstPageComments.forEach(async element => {
                let commentObject = new CommentHandler()
            
                await commentObject.Delete(element.model_id, "Deleting all reported comments.", false);
                //@ts-expect-error
                document.querySelector('.deleted-count').innerText = parseInt(document.querySelector('.deleted-count').innerText) + 1
                finalCount+=1
            });
            fetchNextPage(OriginalLastId)
           
            //rest of pages
            async function fetchNextPage(last_id){
                let response = await fetch("https://brainly.com/api/28/moderation_new/get_comments_content", {
                    "body": `{\"subject_id\":0,\"category_id\":998,\"schema\":\"moderation.index\",\"last_id\":${last_id}}`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                    }).then(data => data.json());
                let count = response.data.items.length
                let comments = response.data.items
                comments.forEach(async element => {
                    let commentObject = new CommentHandler()
                
                    await commentObject.Delete(element.model_id, "Deleting all reported comments.", false);
                    //@ts-expect-error
                    document.querySelector('.deleted-count').innerText = parseInt(document.querySelector('.deleted-count').innerText) + 1
                    finalCount+=1
                });
                document.getElementById('fetched-count').innerText = parseInt(document.getElementById('fetched-count').innerText) + count
                if (response.data.last_id !== 0){
                    fetchNextPage(response.data.last_id)
                } else {
                    document.querySelector(".delete-comments .spinner-container").classList.remove("show")
                    showMessage(`Mod all comments cleared! ${finalCount} were removed.`,"success")
                }
            }
       }
       OpenDialog("Delete all reported comments", "Are you sure you want to delete all reported comments in the moderate all queue? Clicking on 'Proceed' will start the process. Please make sure you don't close the tab until you are notified, or else the reported comments will be partially removed.", removeComments);
    });
}