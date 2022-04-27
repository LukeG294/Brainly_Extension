import {ticket_data} from "../common/Mod Ticket/ticket_functions"
import {showMessage} from "../common/common_functions"


function noclick(){
    document.querySelector("body").insertAdjacentHTML("afterbegin",/*html*/`
        <div class="blockint"></div>
    `)
}
export async function delete_content(type:string, id:string, reason:string, warn:boolean, take_point:boolean){
    let model_type_id = 0;
    if(type === "task") {model_type_id = 1;}
    if(type === "response") {model_type_id = 2;}
    await fetch(`https://brainly.com/api/28/moderation_new/delete_${type}_content`, {
        method: "POST",
        body:JSON.stringify({
          "reason_id":2,
          "reason":reason,
          "give_warning":warn,
          "take_points": take_point,
          "schema":`moderation.${type}.delete`,
          "model_type_id":model_type_id,
          "model_id":id,
        })
      })
}
export async function insert_ticket(id, butspinner){
    butspinner.classList.add("show");
    noclick()

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status === 200){
        let basic_data = JSON.parse(this.responseText)
        console.log(basic_data)
        if(!basic_data.data.task.settings.is_deleted){
            //if question is not deleted
            let xhttp1 = new XMLHttpRequest();
            xhttp1.onreadystatechange = async function() {
            if (this.readyState == 4 && this.status == 200) {
                let res = JSON.parse(this.responseText);
                if(res.schema !== "moderation/responses/moderation.ticket.error.res"){
                    //no issues, show ticket now
                    ticket_data(id,res,basic_data, butspinner)
                }
                else{
                    //ticket reserved
                    butspinner.classList.remove("show");
                    document.querySelector(".blockint").remove();
                    showMessage("Ticket is already reserved for another moderator")
                }
            }}
            let body = {
                "model_type_id":1,
                "model_id":id,
                "schema":"moderation.content.get"
            }
            xhttp1.open("POST", `https://brainly.com/api/28/moderation_new/get_content`, true);
            xhttp1.send(JSON.stringify(body));
        }
        else{
            //question does not exist
            butspinner.classList.remove("show");
            document.querySelector(".blockint").remove();
            showMessage("Question has been deleted", "error")
        }
    }}
    xhttp.open("GET", `https://brainly.com/api/28/api_tasks/main_view/${id}`);
    xhttp.send();
}
export function confirm_answer(answerToConfirm:string){
    var data = JSON.stringify({
        "operationName": "AcceptModerationReportContent",
        "variables": {
        "input": {
            "contentType": "Answer",
            "contentId": answerToConfirm
        }
        },
        "query": "mutation AcceptModerationReportContent($input: AcceptModerationReportContentInput!) {\n  acceptModerationReportContent(input: $input) {\n    validationErrors {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n"
    });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
        
    }
    });

    function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    }
    xhr.open("POST", "https://brainly.com/graphql/us");
    xhr.setRequestHeader("authority", "brainly.com");
    xhr.setRequestHeader("x-b-token-long", getCookie("Zadanepl_cookie[Token][Long]"));
    xhr.setRequestHeader("accept", "*/*");
    xhr.setRequestHeader("sec-ch-ua-mobile", "?0");
    xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36");
    xhr.setRequestHeader("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"");
    xhr.setRequestHeader("sec-ch-ua-platform", "\"macOS\"");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("origin", "https://brainly.com");
    xhr.setRequestHeader("sec-fetch-site", "same-origin");
    xhr.setRequestHeader("sec-fetch-mode", "cors");
    xhr.setRequestHeader("sec-fetch-dest", "empty");
    xhr.setRequestHeader("referer", "https://brainly.com/tools/moderation?pageSize=60");

    xhr.send(data);
}
export function approve_answer(answerToConfirm:string){
    var raw = JSON.stringify({
        "model_type": 2,
        "model_id": answerToConfirm
      });
      
      fetch("https://brainly.com/api/28/api_content_quality/confirm", { method: "POST",body: raw}).then(data => data.json());
}
export function confirm_question(id){
    fetch("https://brainly.com/api/28/moderation_new/accept", {
      "referrer": "https://brainly.com/tasks/archive_mod",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"model_type_id\":1,\"model_id\":${id},\"schema\":\"moderation.content.ok\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
}
export async function delete_user(uid:string){
    await fetch("https://brainly.com/admin/users/delete/"+uid, {
    headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1"
    }
    });
}
export async function get_warnings(user:string){
    let warn_arr = [];
    let txt = await fetch("https://brainly.com/users/view_user_warns/" + user).then(data => data.text());
    let parser = new DOMParser();
    let warnPage = parser.parseFromString(txt, 'text/html');
    let warns = warnPage.querySelectorAll("#content-old tr");
    for(let i=1;i< warns.length; i++){
        let row = warns[i];
        var this_warn = {
            date: row.children[0].innerHTML,
            reason: row.children[1].innerHTML,
            content: row.children[2].innerHTML,
            moderator: row.children[4].children[0].innerHTML,
            isRevoked: row.children[5].children[0].innerHTML !== "Undo"
        }
        warn_arr.push(this_warn);
    }
    return warn_arr
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
export function sendMessages(users_ids, content){

    function getConvoId(userid, varContent){
        var data = JSON.stringify({
        "user_id": userid
        });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
        let response = JSON.parse(this.responseText)
       
        let convoID = response["data"]["conversation_id"]
            var data = JSON.stringify({
            "content": varContent,
            "conversation_id": convoID
        });
    
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
            console.log(this.responseText);
            }
        });
       
  
          
        xhr.open("POST", "https://brainly.com/api/28/api_messages/send");
        xhr.setRequestHeader("authority", "brainly.com");
        xhr.setRequestHeader("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"");
        xhr.setRequestHeader("sec-ch-ua-mobile", "?0");
        xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-b-token-long", getCookie("Zadanepl_cookie[Token][Long]"));
        xhr.setRequestHeader("accept", "text/plain, */*; q=0.01");
        xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
        
        
        xhr.send(data);
        }
    });
    
    xhr.open("POST", "https://brainly.com/api/28/api_messages/check");
    xhr.setRequestHeader("authority", "brainly.com");
    
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-b-token-long", getCookie("Zadanepl_cookie[Token][Long]"));
    
    
    xhr.send(data);
    }
    

    let convo_ids = []
    for (let i = 0; i < users_ids.length; i++) {
        let idForConvo = String(users_ids[i]).split("-")[0]
        let unameForConvo = String(users_ids[i]).split("-")[1]
        let varContent = content.replaceAll("{user}",unameForConvo)
        
        getConvoId(idForConvo,varContent)
       
    }
}
export async function startCompanionManager(){
    let txt = await fetch("https://th-extension.lukeg294.repl.co/all").then(data => data.json());
    let modal = document.querySelector(".modal_mcomp_u")
    modal.insertAdjacentHTML("beforeend",`
    <button class="add-companion-user sg-button sg-button--solid-blue sg-button--s sg-button--icon-only">
      <span class="sg-button__icon">
        <div class="sg-icon sg-icon--adaptive sg-icon--x16">
          <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-friend_add" aria-hidden="true"></use></svg>
        </div>
      </span>
    </button>
    `)
    for (let index = 0; index < txt.length; index++) {
        const element = txt[index].data;
        let databaseId = txt[index].ref["@ref"].id
       
        if (element.avatar === "https://brainly.com/img/"){
            element.avatar = "https://brainly.com/img/avatars/100-ON.png"
        }
       
        modal.insertAdjacentHTML("beforeend",`<div class="companionUserObject"><img src=${element.avatar} class="companionUserAvatar"></img> <a href=${element.profile} class="username">${element.username}</a>  <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue edit-user"><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Edit Permissions</span></button><button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach remove-user" id=${databaseId}><div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div><span class="sg-button__text">Remove Access</span></button></div>`)
        
    }
    let removeButtons = document.querySelectorAll(".remove-user")
    for (let index = 0; index < removeButtons.length; index++) {
        const element = removeButtons[index];
       
        element.addEventListener("click", async function(){
            element.querySelector(".spinner-container").classList.add("show");
            var requestOptions = {
            method: 'DELETE'};

            await fetch("https://th-extension.lukeg294.repl.co/users/"+element.id,requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            element.querySelector(".spinner-container").classList.remove("show");
            element.parentElement.remove();
        })
    }
    document.querySelector(".add-companion-user").addEventListener("click", async function(){
        let profileLink = prompt("profile link?")
        let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
        if (regexString.test(profileLink)) {
            let user = await fetch(profileLink).then(data => data.text());
            let parser = new DOMParser();
            let profilePage = parser.parseFromString(user, 'text/html');
            //@ts-ignore
            let avatar = profilePage.querySelector("#main-left > div.personal_info > div.header > div.avatar > a > img").src
            //@ts-ignore
            let username = profilePage.querySelector("#main-left > div.personal_info > div.header > div.info > div.info_top > span.ranking > h2 > a").innerText
            //@ts-ignore
            let id = profilePage.querySelector("#main-panel > div.mint-header__container > div.mint-header__right.mint-hide-for-mobile.menu-right > ul > li.menu-element.profile.styled > div > div > div.left > a").href.split("/")[4].split("-")[1]
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "username": username,
                "password": parseInt(id),
                "avatar": avatar,
                "profile": profileLink,
                "permissions": ""
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            
            };

            fetch("https://th-extension.lukeg294.repl.co/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
           
             
           
        } else {
            showMessage("That's not a valid profile link.","error")
        }
    })
}
  
