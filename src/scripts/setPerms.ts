import {checkPermissionSet} from "./common/permission_system"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    localStorage.setItem("userPerms", permsArr.toString())
    permsArr?localStorage.setItem("canUse", "true"):localStorage.setItem("canUse", "false")
}, 0);
