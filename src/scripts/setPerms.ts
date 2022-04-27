import {checkPermissionSet} from "./common/permission_system"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    localStorage.setItem("userPerms", permsArr.toString())
    if(permsArr[0] !== "null"){
        localStorage.setItem("canUse", "true")
    }
    else{localStorage.setItem("canUse", "false")}
}, 0);
