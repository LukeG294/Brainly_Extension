import {checkPermissionSet} from "./PermissionSystem"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    localStorage.setItem("userPerms", permsArr.toString())
    if(localStorage.userPerms !== ""){
        localStorage.setItem("canUse", "true")
    }
    else{localStorage.setItem("canUse", "false")}
}, 0);
