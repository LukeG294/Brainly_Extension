import {ticket_data} from "../common/Mod Ticket/ticket_functions"
import {showMessage} from "../common/common_functions"
import{ removeUser, editUser, checkPermissionSet, getPermissions, removeAnswer} from "../permissions/permission_system"
import{ permissionChecks } from "../webpages/homepage/homepage_exports"
import {extension_server_url} from "../../configs/server"
function noclick(){
    document.querySelector("body").insertAdjacentHTML("afterbegin",/*html*/`
        <div class="blockint"></div>
    `)
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
    let txt = await fetch(`${extension_server_url()}/all`).then(data => data.json());
    let modal = document.querySelector(".modal_mcomp_u")
    modal.querySelector(".sg-spinner-container").classList.add("remove")

    //inserting the  "add user" button
    modal.querySelector(".users").insertAdjacentHTML("beforeend",/*html*/`
    <div class = "adduserbox">
    <button class="add-companion-user sg-button sg-button--solid-blue sg-button--s sg-button--icon-only">
      <span class="sg-button__icon">
        <div class="sg-icon sg-icon--adaptive sg-icon--x16">
          <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-friend_add" aria-hidden="true"></use></svg>
        </div>
      </span>
    </button>
    </div>
    `)

    //inserting all registered users
    for (let index = 0; index < txt.length; index++) {
        const element = txt[index].data;
        let databaseId = txt[index].ref["@ref"].id
       
        if (element.avatar === "https://brainly.com/img/"){
            element.avatar = "https://brainly.com/img/avatars/100-ON.png"
        }
       
        modal.querySelector(".users").insertAdjacentHTML("afterbegin",/*html*/`
        <div class="companionUserObject" style="overflow-y:scroll">
            <div class="user">
                <img src=${element.avatar} class="companionUserAvatar"></img> 
                <a href=${element.profile} class="username">${element.username}</a>  
            </div>
            <div class="changedb">
                <button id=${databaseId} class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue edit-user">
                    <div class="spinner-container">
                        <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
                    </div>
                    <span class="sg-button__text"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-pencil"></use></svg></div></span>
                </button>
                <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach remove-user" id=${databaseId}>
                    <div class="spinner-container">
                        <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
                    </div>
                    <span class="sg-button__text"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></span>
                </button>
            </div>
            <div class="permlist"></div>
        </div>`)
        
    }

    let removeButtons = document.querySelectorAll(".remove-user")
    for (let index = 0; index < removeButtons.length; index++) {
        const element = removeButtons[index];
       
        element.addEventListener("click", async function(){
            element.querySelector(".spinner-container").classList.add("show");
            await removeUser(element.id)
            element.querySelector(".spinner-container").classList.remove("show");
            element.parentElement.parentElement.remove();
        })
    }
    let editButtons = document.querySelectorAll(".edit-user")
    let appended = null
    for (let index = 0; index < editButtons.length; index++) {
       
        const element = editButtons[index];
       
        element.addEventListener("click", async function(){
            if(document.querySelector(".users .openelem")){
                document.querySelector(".users .openelem").classList.remove("openelem")
            }
            element.querySelector(".spinner-container").classList.add("show");

            if (!appended){
                let userToGet = element.parentElement.parentElement.querySelector(".username")
                //@ts-ignore
                let prevPerms = await getPermissions(userToGet.innerText,userToGet.href.split("/")[4].split("-")[1])
                element.parentElement.parentElement.querySelector(".permlist").insertAdjacentHTML("beforeend",permissionChecks())
                element.parentElement.parentElement.classList.add("openelem")
                let decodedPerms = atob(prevPerms).split(",")
                for (let index = 0; index < decodedPerms.length; index++) {
                    const permsElement = decodedPerms[index];
                    
                   let foundCheck = element.parentElement.parentElement.querySelector(".perm"+permsElement)
                
                   if (foundCheck){
                       //@ts-expect-error
                    foundCheck.checked = true
                   }
                }
                document.querySelector(".submit-permissions").addEventListener("click", async function(){
                    this.querySelector(".spinner-container").classList.add("show");
                    let perms = []
                    let userOptions = this.parentElement.querySelectorAll(".permission")
                    for (let index = 0; index < userOptions.length; index++) {
                        const element = userOptions[index];
                        if (element.children[0].checked){
                            perms.push(element.children[0].id)
                        }
                        
                    }
                    await editUser(element.id, perms)
                    this.querySelector(".spinner-container").classList.remove("show");
                })
                 appended = true
            } else {
                let checks = document.querySelectorAll(".permission")
                for (let index = 0; index < checks.length; index++) {
                    const element = checks[index];
                    element.remove();
                }
                document.querySelector(".submit-permissions").remove()
                element.parentElement.parentElement.classList.remove("openelem")
                appended = false
            }
            element.querySelector(".spinner-container").classList.remove("show");
        })
    }
    let appendAddUser = false
    document.querySelector(".add-companion-user").addEventListener("click", async function(){
        if (!appendAddUser){
            this.style.setProperty('flex', '1', 'important');
            appendAddUser = true
            this.insertAdjacentHTML("afterend",/*html*/`
            <input type="text" placeholder="Username" class="sg-input userSpace" >
            <button class="sg-button sg-button--m sg-button--solid-mint confirm-add-user">
                <div class="spinner-container"><div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div></div>
                <span class="sg-button__text">Add User</span>
            </button>
            `)
            
            let input = document.querySelector(".userSpace")

            // Init a timeout variable to be used below
            let timeout = null;

            // Listen for keystroke events
            input.addEventListener('keyup', function (e) {
                // Clear the timeout if it has already been set.
                // This will prevent the previous task from executing
                // if it has been less than <MILLISECONDS>
                clearTimeout(timeout);

                // Make a new timeout set to go off in 1000ms (1 second)
                timeout = setTimeout( async function () {
                    //@ts-expect-error
                    let searchFind = await fetch("https://brainly.com/users/search/"+input.value).then(data => data.text());
                    let DOMparse = new DOMParser();
                    let searchPage = DOMparse.parseFromString(searchFind, 'text/html');
                   
                  
                    let username = searchPage.querySelectorAll(".user-nick")[0]
                    
                    if (username){
                        //@ts-expect-error
                        if (String(username.children[0].innerText).toLowerCase === String(input.value).toLowerCase){
                            input.classList.add("sg-textarea--valid")
                            //@ts-expect-error
                            let profileLink = searchPage.querySelectorAll(".user-nick")[0].children[0].href
                            document.querySelector(".confirm-add-user").addEventListener("click", async function(){
                               
                                let regexString = new RegExp(`https:\/\/brainly\.com\/profile\/.*-.*`)
                                if (regexString.test(profileLink)) {
                                    this.querySelector(".spinner-container").classList.add("show")

                                    let user = await fetch(profileLink).then(data => data.text());
                                    let parser = new DOMParser();
                                    let profilePage = parser.parseFromString(user, 'text/html');
                                    //@ts-ignore
                                    let avatar = profilePage.querySelector("#main-left > div.personal_info > div.header > div.avatar > a > img").src
                                    //@ts-ignore
                                    let username = profilePage.querySelector("#main-left > div.personal_info > div.header > div.info > div.info_top > span.ranking > h2 > a").innerText
                                    //@ts-ignore
                                    let id = profilePage.querySelector(".avatar").children[0].href.split("/")[4].split("-")[1]
                                    
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
                        
                                    await fetch(`${extension_server_url()}/users`, requestOptions)
                                    .then(response => response.text())
                                    .then(result => console.log(result))
                                    .catch(error => console.log('error', error));
                                    this.querySelector(".spinner-container").classList.remove("show")
                                    if (avatar === "https://brainly.com/img/"){
                                        avatar = "https://brainly.com/img/avatars/100-ON.png"
                                    }
                                    let modal = document.querySelector(".modal_mcomp_u")
                                    modal.querySelector(".users").insertAdjacentHTML("afterbegin",/*html*/`
                                    <div class="companionUserObject">
                                        <div class="user">
                                            <img src=${avatar} class="companionUserAvatar"></img> 
                                            <a href=${profileLink} class="username">${username}</a>  
                                        </div>
                                        <div class="changedb">
                                            <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue edit-user notAdded">
                                                <div class="spinner-container">
                                                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
                                                </div>
                                                <span class="sg-button__text"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-pencil"></use></svg></div></span>
                                            </button>
                                            <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-peach remove-user notAdded" >
                                                <div class="spinner-container">
                                                    <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
                                                </div>
                                                <span class="sg-button__text"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></span>
                                            </button>
                                        </div>
                                    </div>`)
                                    let buttons = document.querySelectorAll(".notAdded")
                                    for (let index = 0; index < buttons.length; index++) {
                                        const element = buttons[index];
                                        element.addEventListener("click",function(){
                                            alert("Please re-open the modal, we can't fetch data for this user yet.")
                                        })
                                        
                                    }
                                
                                } 
                        
                        
                        
                        
                        
                               
                                    
                            })

                            } else {
                            
                                
                                input.classList.add("sg-textarea--invalid")
                            }
                        } else {
                            input.classList.add("sg-textarea--invalid")
                        }

                        
                    
                    
                }, 500);
            });
            
        } else {
            document.querySelector(".userSpace").remove()
            document.querySelector(".confirm-add-user").remove()
            this.style.setProperty('height', '100%', 'important');
            appendAddUser = false
        }
        
        
    })
}
