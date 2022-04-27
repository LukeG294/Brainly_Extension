import {checkPermissionSet} from "./common/permission_system"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    localStorage.setItem("userPerms", permsArr.toString())
}, 10);
