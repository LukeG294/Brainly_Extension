import { mass_msg, mass_accdel, usr_mgmt, verification_queue, md_content, reportedCommentsDeleter } from "./homepage/Admin";
import AdminPanel from "./homepage/Admin"

let perms = localStorage.getItem('userPerms').split(",");
function newperms(){
    if (perms.includes("3") || perms.includes("4")){
        md_content()
        reportedCommentsDeleter()
    }
    if(perms.includes("4")){
        AdminPanel.MassMsg()
        AdminPanel.Accdel()
        usr_mgmt()
    }
    if(perms.includes("6") || perms.includes("4") || perms.includes("7")){
        verification_queue()
    }
    if (perms.includes("6")){
       
        document.querySelector(`a[href='/moderating_functions/index']`).parentElement.remove()
        document.querySelector(`a[href='/moderation/confirmed']`).parentElement.remove()
    }
}
if(localStorage.getItem("canUse") === "true"){
    newperms()
}