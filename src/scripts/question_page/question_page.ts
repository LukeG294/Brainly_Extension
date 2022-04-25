import {confirmButton} from "./question_exports"

import { checkPermissionSet, checkUser} from "../common/permission_system"
//@ts-ignore

async function questionPage(){
  let perms = await checkPermissionSet();
  if (perms.includes("9")){
    confirmButton()
  }
}

checkUser("new", questionPage)
