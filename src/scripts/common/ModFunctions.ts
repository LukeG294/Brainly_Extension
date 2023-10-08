import {ticket_data} from "./Mod Ticket/ticket_functions"
import Notify from "./Notifications/Notify"
import BrainlyAPI from "./BrainlyAPI"
import Extension from "../../locales/en/localization.json"

export function noclick(){
    document.querySelector("body").insertAdjacentHTML("afterbegin",/*html*/`
        <div class="blockint"></div>
    `)
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
export function runCheck(f, needed_num, arg1 = "", arg2 = ""){
    //@ts-ignore
    let arr = atob(getCookie("l.token")).split(",")
    for (let index = 0; index < needed_num.length; index++) {
        const element = needed_num[index];
        if (arr.includes(element)) {
            f(arg1,arg2)
            break
        } 
    }
}
export async function insert_ticket(id, butspinner){
    noclick()
    butspinner.classList.add("show");
    try{
        let res = await BrainlyAPI.Legacy("POST", "moderation_new/get_content", ({
            "model_type_id":1,
            "model_id":id,
            "schema":"moderation.content.get"
        }));
        ticket_data(id,res, butspinner)
    }catch(e){
        butspinner.classList.remove("show");
        document.querySelector(".blockint").remove();
        Notify.Flash(String(e).replace("Error: ",""), "error");
    }
}
export async function sendMessages(users_ids, content){
    document.querySelector(".send-message .spinner-container").classList.add("show");
    async function getConvoId(userid, varContent){
        var data = JSON.stringify({
        "user_id": userid
        });
    
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", async function() {
            if(this.readyState === 4) {
            let response = JSON.parse(this.responseText)
        
            let convoID = response["data"]["conversation_id"]
                var data = JSON.stringify({
                "content": varContent,
                "conversation_id": convoID
            });
        
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            
            xhr.addEventListener("readystatechange",  function() {
                if(this.readyState === 4) {
                console.log(this.responseText);
                document.querySelector(".send-message .spinner-container").classList.remove("show");
                }
            });
       
  
          
        xhr.open("POST", `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_messages/send`);
        xhr.setRequestHeader("authority", "brainly.com");
        xhr.setRequestHeader("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"");
        xhr.setRequestHeader("sec-ch-ua-mobile", "?0");
        xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-b-token-long", getCookie("Zadanepl_cookie[Token][Long]"));
        xhr.setRequestHeader("accept", "text/plain, */*; q=0.01");
        xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
        
        
        await xhr.send(data);
        }
    });
    
    xhr.open("POST", `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/api/28/api_messages/check`);
    xhr.setRequestHeader("authority", "brainly.com");
    
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-b-token-long", getCookie("Zadanepl_cookie[Token][Long]"));
    
    
    await xhr.send(data);
    }
    

    users_ids.forEach(element => {
        let idForConvo = String(element).split("-")[0]
        let unameForConvo = String(element).split("-")[1]
        let varContent = content.replaceAll("{user}",unameForConvo)
        let splitContent = varContent.split("{new}")
        splitContent.forEach(element => {
            getConvoId(idForConvo,element)
        });
        
    })
   
}
