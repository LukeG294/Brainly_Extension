import {confirmButton} from "./question_exports"

import { checkUser} from "../common/permission_system"
//@ts-ignore

async function questionPage(){
  let perms = localStorage.userPerms
  if (perms.includes("9")){
    confirmButton()
  }
}

checkUser("new", questionPage)
