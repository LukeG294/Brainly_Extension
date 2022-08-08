import{ removeUser, editUser, checkPermissionSet, getPermissions, removeAnswer} from "./permissions/PermissionSystem"
import Extension from "../../locales/en/localization.json"
import {extension_server_url, parseProfileLink} from "../../configs/config"
import{ permissionChecks } from "../views/homepage/Exports"

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
       
        if (element.avatar === `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/img/`){
            element.avatar = `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/img/avatars/100-ON.png`
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
                let prevPerms = await getPermissions(userToGet.innerText, parseProfileLink(userToGet.href))
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
                <span class="sg-button__text">${Extension.common.addUser}</span>
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
                    let searchFind = await fetch(`https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/users/search/`+input.value).then(data => data.text());
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
                                    let id = parseProfileLink(profilePage.querySelector(".avatar").children[0].href)
                                    
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
                                    if (avatar === `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/img/`){
                                        avatar = `https://${Extension.marketConfigs.siteName}.${Extension.marketConfigs.siteEnding}/img/avatars/100-ON.png`
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
                                            alert(Extension.common.cannotFetchData)
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
