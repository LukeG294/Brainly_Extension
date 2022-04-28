import {checkPermissionSet} from "./common/permission_system"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    localStorage.setItem("userPerms", permsArr.toString())
    if(localStorage.userPerms !== ""){
        localStorage.setItem("canUse", "true")
    }
    else{localStorage.setItem("canUse", "false")}
}, 0);
