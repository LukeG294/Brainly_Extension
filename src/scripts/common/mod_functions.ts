import {insertdata_ticket} from "../common/Mod Ticket/ticket_functions"
import {ticket} from "../common/Mod Ticket/ticket_exp"

export function show_ticket(qid:string){
    document.body.insertAdjacentHTML("beforeend", <string>ticket())
      insertdata_ticket(qid)

      document.querySelector(".modal_close").addEventListener("click", async function(){
        document.querySelector(".modal_back").remove()
        await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${qid},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
      });
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