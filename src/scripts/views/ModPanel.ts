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
    if(perms.includes("5") || perms.includes("4")){
        verification_queue()
    }
}
if(localStorage.getItem("canUse") === "true"){
    newperms()
}