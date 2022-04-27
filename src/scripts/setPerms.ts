import {checkPermissionSet} from "./common/permission_system"
setTimeout(async () => {
    let permsArr = await checkPermissionSet();
    sessionStorage.setItem("userPerms", permsArr.toString())
}, 300);
