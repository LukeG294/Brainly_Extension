import User from "../../common/User"
import Extension from "../../../locales/en/localization.json"
import { main_control_permissions } from "configs/config";
import Form from "scripts/Items/Form";
let warn_area = /*html*/`
<div class="warnbox">
    <div class="heading">
    <h2 class="sg-headline sg-headline--xlarge sg-headline--extra-bold">Recent Warnings:</h2>
    </div>
    <div class="warnings">

    </div>
</div>
`
let perms_area = /*html*/`
    <div class="warnbox">
        <div class="heading">
        <h2 class="sg-headline sg-headline--xlarge sg-headline--extra-bold">Extension Options</h2>
        </div>
        <div class="warnings">

        </div>
    </div>
    `
  
function shorten_warnrsn(warning){
    if (warning.includes("plagiarism") || warning.includes("Is that yours?") || warning.includes("Be cool. Be original")){
        return "Plagiarism";
    }
    else if(warning.includes("unhelpful answers") || warning.includes("answering just to get the points isn’t cool.") || warning.includes("We love the rebel in you")){
        return "SPAM";
    }
    else if(warning.includes("it contained confusing information")){
        return "Wrong Information";
    }
    else if(warning.includes("repost the same question over again if that person does not get an answer")){
        return "Multiple Posting";
    }
    else if(warning.includes("not part of an academic assignment")){
        return "NASP";
    }
    else if(warning.includes("link to a website other than Brainly")){
        return "Link in Content";
    }
    else if(warning.includes("contents are not allowed")){
        return"#BT Default";
    }
    else if(warning.includes("cyberbullying")){
        return "Bullying";
    }
    else if(warning.includes("swear words or explicit content.") || warning.includes("swearwords")){
        return "Inappropriate Content";
    }
    else if(warning.includes("personal information")){
        return "Personal Information";
    }
    else if(warning.includes("not relevant to the question asked") || warning.includes("Please keep in mind that all comments must be on-topic")){
        return "Off-topic";
    }
    else if(warning.includes("Brainiac")){
        return "IDK Answer";
    }
    else if(warning.includes("Honor Code") || warning.includes("academic dishonesty")){
        return "Live Quiz/Exam";
    }
    else if(warning.includes("Community Guidelines") || warning.includes("Please review the terms and thanks for being a team player!")){
        return "Default";
    }
    else{
        return "Not Detected"
    }
}

export async function user_manager(id) {
    
    let menu = document.createElement("div")
    menu.id = "permission_menu"
    document.querySelectorAll(".personal_info")[0].appendChild(menu)
    
    
    function append_checks(key, value, checked){
       let each = document.createElement("div")
        menu.appendChild(each)
        each.className = "permission"
        each.innerHTML = `${
            Form.Checkbox({
                text: key,
                id: "perm-"+value,
            }).outerHTML
            }`
        if (checked==="true"){
            each.querySelectorAll(".sg-checkbox__input")[0].setAttribute("checked","")
        }
    }
    let main_perms = main_control_permissions()
    let data = await fetch(`https://lgextension.azurewebsites.net/get_user/`+id)
    if (data.status === 200){
       
      const json = await data.json();
      let database_perms = json.permissions.split(",")
      function set_checks(){
        if (!json.permissions || json.permissions === ''){
                //@ts-ignore
                for (const [key, value] of Object.entries(main_perms)) {
                    append_checks(key,value,String(database_perms.includes(value)));
                }
              } else {
                //@ts-ignore
                for (const [key, value] of Object.entries(main_perms)) {
                    append_checks(key,value,String(database_perms.includes(value)));
                    
                  }
        }
        
        }
     
        let edit_permissions = document.createElement("div")
        edit_permissions.innerHTML = `<div class="edit_menu">
        <a>Edit Permissions<a></div>`
        edit_permissions.addEventListener("click",function(){
            let hasFinished = edit_permissions.getAttribute("done")
            if (hasFinished === "true") {
                if (menu.style.display === "none") {
                    menu.style.display = "block"
                } else {
                    menu.style.display = "none"
                }
            } else {
                set_checks()
                menu.setAttribute("style","display:block")
            }
            edit_permissions.setAttribute("done","true")
        })
        document.querySelector(".pw").appendChild(edit_permissions)
    
    } else if (data.status === 400) {
        let add_permissions = document.createElement("div")
        add_permissions.innerHTML = `<div class="friends">
        <a href="/buddies_new/invite/84655478">Make Extension User</a> </div>`
        document.querySelector(".pw").appendChild(add_permissions)
    }

    
    
    
}
export async function show_recent_warnings(uid){
    let warns = await User.Warnings(uid);
    
    if(warns.length !==0){
        document.querySelector("#main-right").insertAdjacentHTML("beforeend", warn_area)
        
        
        for(let i=0; i<warns.length; i++){
            let warn = warns[i];
            let short_rsn = shorten_warnrsn(warn.reason);
            if(warn.isRevoked){
                short_rsn = `<div class = "revoked">${short_rsn}</div>`
            }
            document.querySelector(".warnbox .warnings").insertAdjacentHTML("beforeend", /*html*/`
            <div class="warning">
                <div class="reason sg-headline sg-headline--small sg-headline--extra-bold">${short_rsn}</div>
                <div class="time">${warn.date}</div>
                <div class="mod sg-headline sg-headline--small sg-headline--extra-bold">${warn.moderator}</div>
                <div class="content sg-text sg-text--gray sg-text--small">${warn.content}</div>
            </div>
            `);
        }
        if(warns.length > 3){
            document.querySelector(".warnbox").insertAdjacentHTML("beforeend", `
            <div class = "toggleview">
                <button class="sg-button sg-button--m sg-button--outline warnview"><span class="sg-button__text">${Extension.buttons.showAll}</span></button>
            </div>
            `)
            document.querySelector(".warnview").addEventListener("click", function(){
                document.querySelector(".warnings").classList.toggle("all");
                if(document.querySelector(".warnings").classList.contains("all")){
                    document.querySelector(".warnview > span").innerHTML = Extension.buttons.showLess
                }
                if(!document.querySelector(".warnings").classList.contains("all")){
                    document.querySelector(".warnview > span").innerHTML = Extension.buttons.showAll
                }
            })
        }
    }
    
}
