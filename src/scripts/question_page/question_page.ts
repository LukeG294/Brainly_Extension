import {confirmButton} from "./question_exports"

import { checkPermissionSet, checkUser} from "../common/permission_system"
//@ts-ignore

async function questionPage(){
  let perms = sessionStorage.userPerms
  if (perms.includes("9")){
    confirmButton()
  }
}
setTimeout(() => {
  checkUser("new", questionPage)
}, 100);
