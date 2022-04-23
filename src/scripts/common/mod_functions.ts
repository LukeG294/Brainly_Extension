import {ticket_data} from "../common/Mod Ticket/ticket_functions"
import {showMessage} from "../common/common_functions"

function noclick(){
    document.querySelector("body").insertAdjacentHTML("afterbegin",/*html*/`
        <div class="blockint"></div>
    `)
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
